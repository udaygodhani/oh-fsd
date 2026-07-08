import React, { useState, useEffect } from "react";
import { FiAward, FiTrendingUp, FiX, FiSearch } from "react-icons/fi";

const Leaderboard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div>
                  <h3 className="text-white font-semibold group-hover:text-purple-400">{coin.name}</h3>
                  <p className="text-gray-400 text-sm">{coin.symbol}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;