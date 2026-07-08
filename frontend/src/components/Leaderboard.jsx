import React, { useState, useEffect } from "react";
import { FiAward, FiX } from "react-icons/fi";

const Leaderboard = () => {
  const initialCoins = [
    { id: 1, symbol: "BTC", name: "Bitcoin", price: 68450, change: 2.45, icon: "₿" },
    { id: 2, symbol: "ETH", name: "Ethereum", price: 3450, change: 1.82, icon: "◇" },
    { id: 3, symbol: "SOL", name: "Solana", price: 148.75, change: 4.12, icon: "◉" },
    { id: 4, symbol: "BNB", name: "Binance Coin", price: 582.30, change: 0.95, icon: "🟡" },
    { id: 5, symbol: "XRP", name: "Ripple", price: 0.62, change: -0.45, icon: "✕" },
    { id: 6, symbol: "ADA", name: "Cardano", price: 0.41, change: 3.2, icon: "🔷" },
    { id: 7, symbol: "DOGE", name: "Dogecoin", price: 0.18, change: -1.5, icon: "🐶" },
    { id: 8, symbol: "AVAX", name: "Avalanche", price: 28.45, change: 2.8, icon: "❄️" },
  ];

  const [coins, setCoins] = useState(initialCoins);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live Price Updates for All Coins
  useEffect(() => {
  const fetchCoins = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/coins'); // change port if needed
      const data = await res.json();
      setCoins(data.coins);
    } catch (err) {
      console.error(err);
    }
  };
  fetchCoins();
}, []);

  // Sort by Price - Ascending (Lowest to Highest)
  const sortedCoins = [...coins].sort((a, b) => a.price - b.price);

  return (
    <>
      <div className="bg-[#17112D] border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <FiAward className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Top Coins</h2>
              <p className="text-purple-400 text-sm">Live Leaderboard • All Coins</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
          >
            📊 Full Coin Price Board
          </button>
        </div>

        {/* All Coins in Leaderboard - Ascending Order */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
          {sortedCoins.map((coin, index) => (
            <div key={coin.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-[#231A43] transition-all">
              <div className="flex items-center gap-4">
                <span className="text-purple-400 font-bold w-6 text-lg">#{index + 1}</span>
                <div className="w-10 h-10 rounded-2xl bg-[#252040] flex items-center justify-center text-2xl border border-purple-500/30">
                  {coin.icon}
                </div>
                <div>
                  <div className="font-semibold text-white">{coin.name}</div>
                  <div className="text-xs text-gray-400 font-mono">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-lg text-white">
                  ${coin.price.toLocaleString()}
                </div>
                <div className={`text-sm flex items-center justify-end gap-1 ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Coin Price Board Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1633] w-full max-w-4xl rounded-3xl border border-purple-500/30 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">All Coins Price Board</h2>
                <p className="text-sm text-gray-400">Sorted by Price (Lowest → Highest) • Live Updates</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-3xl text-gray-400 hover:text-white">
                <FiX />
              </button>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedCoins.map((coin) => (
                  <div key={coin.id} className="bg-[#252040] p-5 rounded-2xl flex justify-between items-center hover:ring-1 hover:ring-purple-500 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#17112D] flex items-center justify-center text-3xl">
                        {coin.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{coin.name}</div>
                        <div className="text-sm text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-xl">${coin.price.toLocaleString()}</div>
                      <div className={`text-sm ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;