<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { FiAward, FiTrendingUp, FiTrendingDown, FiX, FiSearch, FiUsers } from "react-icons/fi";
import { CoinContext } from "../context/coins/CoinContextProvider";
=======
import React, { useState, useEffect } from "react";
import { FiAward, FiTrendingUp, FiX, FiSearch } from "react-icons/fi";
>>>>>>> 0f7592004b898d59f3dc89de3b7837c01466b8b5

const Leaderboard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

<<<<<<< HEAD
    const { allCryptoCoins } = useContext(CoinContext);

    // Dynamic coins lists
    const coinsToDisplay = allCryptoCoins && allCryptoCoins.length > 0 ? allCryptoCoins : [];
    
    const sidebarCoins = coinsToDisplay.slice(0, 5).map((coin, index) => ({
        rank: index + 1,
        ...coin
    }));

    const detailedCoins = coinsToDisplay.map((coin, index) => ({
        rank: index + 1,
        ...coin
    }));
=======
  // Fetch coins from Backend MongoDB
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/coins'); // Change port if your backend uses different one
        const data = await res.json();
        
        if (data.success) {
          setCoins(data.coins);
        }
      } catch (err) {
        console.error("Failed to fetch coins:", err);
        // Fallback to local data if backend fails
        setCoins([
          { id: 1, symbol: "BTC", name: "Bitcoin", price: 68450, change: 2.45, icon: "₿" },
          { id: 2, symbol: "ETH", name: "Ethereum", price: 3450, change: 1.82, icon: "◇" },
          { id: 3, symbol: "SOL", name: "Solana", price: 148.75, change: 4.12, icon: "◉" },
          { id: 4, symbol: "BNB", name: "Binance Coin", price: 582.30, change: 0.95, icon: "🟡" },
          { id: 5, symbol: "XRP", name: "Ripple", price: 0.62, change: -0.45, icon: "✕" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);
>>>>>>> 0f7592004b898d59f3dc89de3b7837c01466b8b5

  // Live Price Updates (Simulation)
  useEffect(() => {
    if (coins.length === 0) return;

    const interval = setInterval(() => {
      setCoins(prev => prev.map(coin => {
        const volatility = coin.price < 10 ? 0.015 : coin.price > 1000 ? 0.0012 : 0.0025;
        const fluctuation = (Math.random() - 0.5) * (coin.price * volatility);
        const newPrice = Math.max(0.1, parseFloat((coin.price + fluctuation).toFixed(coin.price < 10 ? 2 : 0)));
        
        const newChange = parseFloat(((newPrice - coin.price) / coin.price * 100).toFixed(2));

        return { ...coin, price: newPrice, change: newChange };
      }));
    }, 7000);

    return () => clearInterval(interval);
  }, [coins.length]);

  // Filter & Sort (Ascending Price)
  const filteredAndSortedCoins = [...coins]
    .filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.price - b.price);

  return (
    <div className="bg-[#17112D] border border-purple-500/20 rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <FiAward className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">Top Coins</h2>
            <p className="text-purple-400 text-sm">Live Leaderboard</p>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm font-medium"
        >
          📊 Full Board
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search coins..."
          className="w-full bg-[#1F1A38] border border-gray-700 pl-11 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Coins List */}
      {loading ? (
        <p className="text-gray-400 text-center py-8">Loading coins...</p>
      ) : (
        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredAndSortedCoins.map((coin, index) => (
            <div
              key={coin.id || coin.symbol}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#231A43] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-purple-400 font-bold w-8 text-xl">#{index + 1}</div>
                <div className="w-11 h-11 flex items-center justify-center text-3xl bg-[#252040] rounded-2xl">
                  {coin.icon}
                </div>
<<<<<<< HEAD

                {/* Coins List - Ascending Order */}
                <div className="space-y-4">
                    {sidebarCoins.map((coin) => (
                        <div
                            key={coin.symbol}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#231A43]/50 transition-all duration-300 group"
                        >
                            {/* Left Side */}
                            <div className="flex items-center gap-4">
                                <div className="text-2xl w-8 text-center text-purple-400 font-bold">
                                    #{coin.rank}
                                </div>

                                {coin.image ? (
                                    <img src={coin.image} alt={coin.name} className="w-11 h-11 rounded-2xl object-cover bg-[#1F1638]" />
                                ) : (
                                    <div className="w-11 h-11 flex items-center justify-center text-xl bg-[#1F1638] rounded-2xl font-bold text-white">
                                        {coin.symbol.slice(0, 3)}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition">
                                        {coin.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{coin.symbol}</p>
                                </div>
                            </div>

                            {/* Right Side - Price & Change */}
                            <div className="text-right">
                                <div className="font-mono font-bold text-lg text-white">
                                    ${coin.price}
                                </div>
                                <div className={`text-sm font-medium flex items-center justify-end gap-1 ${
                                    String(coin.change).startsWith('+') ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {String(coin.change).startsWith('+') ? <FiTrendingUp /> : <FiTrendingDown />}
                                    {coin.change}%
                                </div>
                            </div>
                        </div>
                    ))}
=======
                <div>
                  <h3 className="text-white font-semibold group-hover:text-purple-400">{coin.name}</h3>
                  <p className="text-gray-400 text-sm">{coin.symbol}</p>
>>>>>>> 0f7592004b898d59f3dc89de3b7837c01466b8b5
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xl text-white">
                  ${coin.price.toLocaleString()}
                </div>
                <div className={`text-sm flex items-center justify-end gap-1 ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change)}%
                </div>
              </div>
            </div>
<<<<<<< HEAD

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#060410]/85 backdrop-blur-md transition-opacity duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="bg-[#140E29] border border-purple-500/30 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-10 animate-fade-in-up">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer z-20"
                            aria-label="Close modal"
                        >
                            <FiX className="text-2xl" />
                        </button>

                        {/* Modal Header */}
                        <div className="p-8 pb-4 border-b border-purple-500/15">
                            <h2 className="text-white text-3xl font-extrabold flex items-center gap-3">
                                <FiAward className="text-yellow-400 text-3xl" /> Global Leaderboard
                            </h2>
                            <p className="text-purple-400 mt-2 text-base">
                                Compare top performing assets and active community contributors.
                            </p>
                        </div>

                        {/* Modal Filters & Search */}
                        <div className="p-8 py-4 bg-[#1B1336]/40 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-purple-500/10">
                            {/* Tab Switcher */}
                            <div className="flex bg-[#0B081E] p-1.5 rounded-2xl border border-purple-500/15 w-full md:w-auto">
                                <button
                                    onClick={() => {
                                        setActiveModalTab("coins");
                                        setSearchQuery("");
                                    }}
                                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                                        activeModalTab === "coins"
                                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    🪙 Coins
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveModalTab("users");
                                        setSearchQuery("");
                                    }}
                                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                                        activeModalTab === "users"
                                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <FiUsers className="text-base" /> Community Users
                                </button>
                            </div>

                            {/* Search bar */}
                            <div className="relative w-full md:w-80">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    placeholder={activeModalTab === "coins" ? "Search coins..." : "Search users..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#0B081E] border border-purple-500/20 focus:border-purple-500/50 outline-none pl-12 pr-4 py-2.5 rounded-2xl text-white placeholder-gray-500 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Modal List Area */}
                        <div className="flex-1 overflow-y-auto p-8 pt-6">
                            {activeModalTab === "coins" ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-purple-500/10 text-gray-400 text-sm font-semibold uppercase tracking-wider">
                                                <th className="pb-4 pl-4 w-20">Rank</th>
                                                <th className="pb-4">Name</th>
                                                <th className="pb-4 text-right">Price</th>
                                                <th className="pb-4 text-right">24h Change</th>
                                                <th className="pb-4 text-right hidden sm:table-cell">Market Cap</th>
                                                <th className="pb-4 text-right pr-4 hidden md:table-cell">24h Volume</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCoins.length > 0 ? (
                                                filteredCoins.map((coin) => (
                                                    <tr
                                                        key={coin.symbol}
                                                        className="border-b border-purple-500/5 hover:bg-[#231A43]/50 transition-colors duration-200 text-white font-medium"
                                                    >
                                                        <td className="py-4 pl-4 font-bold text-purple-400 text-lg">#{coin.rank}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center gap-3">
                                                                {coin.image ? (
                                                                    <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-xl object-cover bg-[#1F1638]" />
                                                                ) : (
                                                                    <span className="w-9 h-9 flex items-center justify-center text-xl bg-[#1F1638] rounded-xl border border-purple-500/10 font-bold text-white">
                                                                        {coin.symbol.slice(0, 3)}
                                                                    </span>
                                                                )}
                                                                <div>
                                                                    <span className="block font-bold">{coin.name}</span>
                                                                    <span className="text-gray-400 text-xs font-mono uppercase">{coin.symbol}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-right font-mono font-bold">${coin.price}</td>
                                                        <td className={`py-4 text-right font-semibold font-mono ${
                                                            String(coin.change).startsWith("+") ? "text-green-400" : "text-red-400"
                                                        }`}>
                                                            <span className="inline-flex items-center gap-1 justify-end">
                                                                {String(coin.change).startsWith("+") ? <FiTrendingUp /> : <FiTrendingDown />}
                                                                {coin.change}%
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right text-gray-300 font-mono hidden sm:table-cell">{coin.marketCap || "N/A"}</td>
                                                        <td className="py-4 text-right text-gray-300 font-mono pr-4 hidden md:table-cell">{coin.volume || "N/A"}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="py-12 text-center text-gray-400">
                                                        No coins found matching "{searchQuery}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredUsers.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {filteredUsers.map((user) => (
                                                <div
                                                    key={user.rank}
                                                    className="flex items-center justify-between p-5 bg-[#1F173D]/60 border border-purple-500/10 rounded-2xl hover:border-purple-500/30 transition-all duration-300"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-2xl font-extrabold text-purple-400 w-8 text-center">
                                                            #{user.rank}
                                                        </div>
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            className="w-12 h-12 rounded-full border-2 border-purple-500/20"
                                                        />
                                                        <div>
                                                            <h4 className="text-white font-bold text-lg">{user.name}</h4>
                                                            <p className="text-gray-400 text-xs">{user.posts} Posts created</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-yellow-400 font-extrabold text-lg font-mono">
                                                            {user.points.toLocaleString()}
                                                        </div>
                                                        <div className="text-purple-400 text-xs font-semibold uppercase tracking-wider">
                                                            Points
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-400 py-12">
                                            No contributors found matching "{searchQuery}"
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
=======
          ))}
        </div>
      )}
    </div>
  );
>>>>>>> 0f7592004b898d59f3dc89de3b7837c01466b8b5
};

export default Leaderboard;