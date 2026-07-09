import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/data/UserDataProvider';
import { CoinContext } from '../../context/coins/CoinContextProvider';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../api/api';
import { toast } from 'react-hot-toast';
import { FiUser, FiMail, FiCheckCircle, FiXCircle, FiTrendingUp, FiTrendingDown, FiFolder, FiDollarSign, FiClock, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { allCryptoCoins } = useContext(CoinContext);
  const navigate = useNavigate();

  // History State
  const [history, setHistory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Redirect guest users to login
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      alert("Please login first to view your profile.");
      navigate('/login');
    }
  }, [navigate]);

  // Sync user context on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/auth/getuser');
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.error("Failed to sync user profile state:", err);
      }
    };
    fetchUser();
  }, [setUser]);

  // Connect to Socket.io for Real-time Updates
  useEffect(() => {
    if (!user) return;

    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
    const socket = io(baseURL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Connected to real-time server via Socket.io');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    // Listen for walletUpdated
    socket.on('walletUpdated', (data) => {
      setUser(prev => {
        if (!prev) return prev;
        const updated = { ...prev, walletBalance: data.walletBalance };
        sessionStorage.setItem('user', JSON.stringify(updated));
        return updated;
      });
    });

    // Listen for portfolioUpdated
    socket.on('portfolioUpdated', (data) => {
      setUser(prev => {
        if (!prev) return prev;
        const updated = { ...prev, portfolio: data.portfolio };
        sessionStorage.setItem('user', JSON.stringify(updated));
        return updated;
      });
    });

    // Listen for historyUpdated
    socket.on('historyUpdated', (data) => {
      setHistory(prev => {
        // Prevent duplicate updates
        if (prev.some(item => item._id === data._id)) return prev;
        const updated = [data, ...prev];
        if (updated.length > 5) {
          updated.pop();
        }
        return updated;
      });
      setTotalCount(c => c + 1);
    });

    // Listen for tradeExecuted
    socket.on('tradeExecuted', (data) => {
      if (data.type === 'buy') {
        toast.success(data.message || `Successfully bought ${data.quantity} ${data.symbol}!`);
      } else {
        toast.success(data.message || `Successfully sold ${data.quantity} ${data.symbol}!`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user, setUser]);

  // Fetch paginated history
  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const res = await api.get(`/api/trade/history?page=${page}&limit=5`);
        if (res.data.success) {
          setHistory(res.data.history);
          setTotalCount(res.data.count);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch trade history:", err);
        toast.error("Could not load trade history.");
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [user, page]);

  // CSV download function
  const handleDownloadCSV = () => {
    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
    // Open in new window/tab to trigger standard file download attaching JWT credentials cookie
    window.open(`${baseURL}/api/trade/history/download`, '_blank');
  };

  // Helper: get live price of symbol from CoinContext
  const getLivePrice = (symbol) => {
    const matched = allCryptoCoins.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
    if (matched) {
      // Remove commas from price representation e.g. "68,245.32" -> 68245.32
      const cleaned = String(matched.price).replace(/,/g, '');
      return parseFloat(cleaned) || 0;
    }
    return null;
  };

  // Sell all coins in portfolio
  const handleSellAll = async () => {
    if (!user || !user.portfolio || user.portfolio.length === 0) {
      toast.error("No active holdings to liquidate.");
      return;
    }
    
    const confirm = window.confirm("Are you sure you want to liquidate all assets in your portfolio?");
    if (!confirm) return;

    const toastId = toast.loading("Liquidating all holdings...");
    try {
      let successCount = 0;
      for (const asset of user.portfolio) {
        const livePrice = getLivePrice(asset.symbol) || asset.avgPrice;
        const res = await api.post('/api/trade/sell', {
          symbol: asset.symbol,
          quantity: asset.quantity,
          price: livePrice
        });
        if (res.data.success) {
          successCount++;
        }
      }
      toast.success(`Successfully liquidated ${successCount} asset(s).`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to liquidate all assets.", { id: toastId });
    }
  };

  return (
    <div className="bg-[#0B061B] min-h-screen text-white flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 pt-28 pb-16 space-y-10">
        
        {/* Header Title */}
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Trader Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Manage your simulation wallet, portfolio, and transaction logs</p>
        </div>

        {user ? (
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: User Profile Details & Wallet Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Details Card */}
              <div className="bg-[#151026] border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-600/10 blur-3xl rounded-full"></div>
                
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiUser className="text-purple-400" /> User Profile
                </h3>

                <div className="flex flex-col items-center justify-center pb-6 border-b border-purple-500/10 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-600/20 mb-3">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                  </div>
                  <h4 className="text-xl font-semibold">{user.name}</h4>
                  <span className="text-purple-400 text-xs mt-1 uppercase tracking-wider font-semibold">Simulation Account</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-[#1F1A38]/40 p-3.5 rounded-xl border border-purple-500/10">
                    <span className="text-gray-400 text-sm">Email</span>
                    <span className="text-white text-sm font-medium truncate max-w-[180px]">{user.email}</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#1F1A38]/40 p-3.5 rounded-xl border border-purple-500/10">
                    <span className="text-gray-400 text-sm">Status</span>
                    <span className={`text-sm font-semibold flex items-center gap-1 ${user.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                      {user.isVerified ? <FiCheckCircle /> : <FiXCircle />}
                      {user.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wallet Summary Card */}
              <div className="bg-gradient-to-br from-[#1E123B] to-[#120A25] border border-purple-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-cyan-500/10 blur-3xl rounded-full"></div>
                
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FiDollarSign className="text-cyan-400" /> Simulation Wallet
                </h3>

                <p className="text-gray-400 text-xs uppercase tracking-wider">Available Balance</p>
                <h2 className="text-4xl font-extrabold text-white mt-1 font-mono">
                  ${(user.walletBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>

                <div className="mt-6 pt-5 border-t border-purple-500/20">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * Balance resets to $1,000,000 upon initial registration. This is a paper trading platform for practice.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Portfolio holdings & Transaction logs */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Portfolio Holdings Section */}
              <div className="bg-[#151026] border border-purple-500/20 rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiFolder className="text-purple-400" /> Active Holdings (Portfolio)
                  </h3>
                  {user.portfolio && user.portfolio.length > 0 && (
                    <button
                      onClick={handleSellAll}
                      className="bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                    >
                      Sell All Holdings
                    </button>
                  )}
                </div>

                {(!user.portfolio || user.portfolio.length === 0) ? (
                  <div className="text-center py-10 bg-[#1F1A38]/20 rounded-2xl border border-dashed border-purple-500/10">
                    <p className="text-gray-400">No active assets in your portfolio yet.</p>
                    <Link to="/market/spot" className="text-purple-400 hover:text-purple-300 font-medium inline-block mt-3">
                      Start trading Spot markets &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-purple-500/10 text-gray-400 text-xs uppercase font-semibold">
                          <th className="pb-3 pr-4">Asset</th>
                          <th className="pb-3 px-4">Qty</th>
                          <th className="pb-3 px-4">Avg Buy</th>
                          <th className="pb-3 px-4">Live Price</th>
                          <th className="pb-3 px-4">Current Value</th>
                          <th className="pb-3 pl-4 text-right">P&L ($ / %)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-500/10 text-sm">
                        {user.portfolio.map((asset) => {
                          const livePrice = getLivePrice(asset.symbol);
                          const currentPrice = livePrice !== null ? livePrice : asset.avgPrice;
                          const avgCost = asset.avgPrice;
                          const quantity = asset.quantity;

                          const costValue = avgCost * quantity;
                          const currentValue = currentPrice * quantity;

                          const plAmount = currentValue - costValue;
                          const plPercent = costValue > 0 ? (plAmount / costValue) * 100 : 0;
                          
                          const isProfit = plAmount >= 0;

                          return (
                            <tr key={asset.symbol} className="hover:bg-purple-500/5 transition-colors">
                              <td className="py-4 pr-4">
                                <div className="font-semibold">{asset.symbol}</div>
                                <div className="text-gray-400 text-xs">{asset.name}</div>
                              </td>
                              <td className="py-4 px-4 font-mono font-medium">{quantity}</td>
                              <td className="py-4 px-4 font-mono text-gray-300">${avgCost.toLocaleString()}</td>
                              <td className="py-4 px-4 font-mono text-cyan-400">
                                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-4 px-4 font-mono font-semibold">
                                ${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </td>
                              <td className={`py-4 pl-4 text-right font-mono font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                                <div className="flex items-center justify-end gap-1">
                                  {isProfit ? <FiTrendingUp /> : <FiTrendingDown />}
                                  ${plAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-xs">{isProfit ? '+' : ''}{plPercent.toFixed(2)}%</div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Transaction History Section */}
              <div className="bg-[#151026] border border-purple-500/20 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiClock className="text-purple-400" /> Transaction Logs
                  </h3>
                  {totalCount > 0 && (
                    <button
                      onClick={handleDownloadCSV}
                      className="flex items-center gap-2 bg-[#1A1332] hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 px-4 py-2 rounded-xl text-sm font-semibold transition"
                    >
                      <FiDownload /> Export CSV
                    </button>
                  )}
                </div>

                {loadingHistory ? (
                  <p className="text-center text-gray-400 py-6">Loading transaction logs...</p>
                ) : history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No trades executed on this account yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-purple-500/10 text-gray-400 text-xs uppercase font-semibold">
                            <th className="pb-3 pr-4">Date</th>
                            <th className="pb-3 px-4">Action</th>
                            <th className="pb-3 px-4">Asset</th>
                            <th className="pb-3 px-4">Qty</th>
                            <th className="pb-3 px-4">Price</th>
                            <th className="pb-3 px-4">Total</th>
                            <th className="pb-3 pl-4 text-right">Balance After</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-500/10 text-sm">
                          {history.map((log) => {
                            const isBuy = log.type === "buy";
                            return (
                              <tr key={log._id} className="hover:bg-purple-500/5 transition-colors">
                                <td className="py-3.5 pr-4 text-xs text-gray-400 whitespace-nowrap">
                                  {new Date(log.createdAt).toLocaleString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                                    isBuy ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                  }`}>
                                    {log.type}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-semibold">{log.symbol}</td>
                                <td className="py-3.5 px-4 font-mono">{log.quantity}</td>
                                <td className="py-3.5 px-4 font-mono text-gray-300">${log.price.toLocaleString()}</td>
                                <td className="py-3.5 px-4 font-mono font-semibold">${log.totalAmount.toLocaleString()}</td>
                                <td className="py-3.5 pl-4 text-right font-mono text-gray-400">${log.balanceAfter.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
                        <span className="text-xs text-gray-400">
                          Page {page} of {totalPages} ({totalCount} total transactions)
                        </span>

                        <div className="flex gap-2">
                          <button
                            disabled={page <= 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="p-2 rounded-lg bg-[#1C1638] hover:bg-[#2A2350] border border-purple-500/15 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <FiChevronLeft />
                          </button>
                          <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="p-2 rounded-lg bg-[#1C1638] hover:bg-[#2A2350] border border-purple-500/15 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <FiChevronRight />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-[#151026] border border-purple-500/20 rounded-3xl max-w-lg mx-auto">
            <FiXCircle className="text-red-400 text-6xl mx-auto mb-4" />
            <p className="text-xl text-gray-400">Please sign in to access your Trading Dashboard.</p>
            <Link to="/login" className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3.5 rounded-xl font-semibold hover:scale-105 duration-300">
              Go to Login
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
