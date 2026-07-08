import React, { useState, useEffect ,useState } from "react";
import { FiAward, FiX, FiTrendingDown, FiX, FiSearch, FiUsers } from "react-icons/fi";

const Leaderboard = ({ users = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState("coins");
    const [searchQuery, setSearchQuery] = useState("");

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

    const detailedCoins = [
        { rank: 1, name: "Bitcoin", symbol: "BTC", price: "68,450.00", change: "+2.45", marketCap: "$1.35T", volume24h: "$28.4B", icon: "₿" },
        { rank: 2, name: "Ethereum", symbol: "ETH", price: "3,450.25", change: "+1.82", marketCap: "$415.2B", volume24h: "$15.1B", icon: "⟠" },
        { rank: 3, name: "Solana", symbol: "SOL", price: "148.75", change: "+4.12", marketCap: "$68.9B", volume24h: "$3.8B", icon: "◎" },
        { rank: 4, name: "Binance Coin", symbol: "BNB", price: "582.30", change: "+0.95", marketCap: "$85.1B", volume24h: "$1.2B", icon: "🟡" },
        { rank: 5, name: "Ripple", symbol: "XRP", price: "0.62", change: "-0.45", marketCap: "$34.2B", volume24h: "$850M", icon: "✕" },
        { rank: 6, name: "Cardano", symbol: "ADA", price: "0.48", change: "-1.20", marketCap: "$17.1B", volume24h: "$420M", icon: "₳" },
        { rank: 7, name: "Dogecoin", symbol: "DOGE", price: "0.14", change: "+8.54", marketCap: "$20.3B", volume24h: "$1.8B", icon: "Ð" },
        { rank: 8, name: "Shiba Inu", symbol: "SHIB", price: "0.000022", change: "+11.20", marketCap: "$13.1B", volume24h: "$950M", icon: "🐕" },
        { rank: 9, name: "Avalanche", symbol: "AVAX", price: "32.40", change: "-2.15", marketCap: "$12.8B", volume24h: "$310M", icon: "🔺" },
        { rank: 10, name: "Chainlink", symbol: "LINK", price: "15.10", change: "+3.60", marketCap: "$8.9B", volume24h: "$280M", icon: "🔗" }
    ];

    const fallbackUsers = [
        { rank: 1, name: "John Carter", avatar: "https://i.pravatar.cc/150?img=11", posts: 124, points: 1580 },
        { rank: 2, name: "Emily", avatar: "https://i.pravatar.cc/150?img=32", posts: 110, points: 1435 },
        { rank: 3, name: "Alex", avatar: "https://i.pravatar.cc/150?img=41", posts: 95, points: 1310 },
        { rank: 4, name: "Sophia", avatar: "https://i.pravatar.cc/150?img=47", posts: 90, points: 1250 }
    ];

    const displayUsers = users.length > 0
        ? users.map((u, i) => ({ rank: i + 1, ...u }))
        : fallbackUsers;

    // Filter detailed coins
    const filteredCoins = detailedCoins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter users
    const filteredUsers = displayUsers.filter(
        (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#17112D] border border-purple-500/20 rounded-3xl p-6  top-24">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <FiAward className="text-white text-2xl" />
                </div>

                <div>
                    <h2 className="text-white text-2xl font-bold">Top Coins</h2>
                    <p className="text-purple-400 text-sm">Live Leaderboard</p>
                </div>
            </div>

            {/* Coins List - Ascending Order */}
            <div className="space-y-4">

                {coins.map((coin) => (
                    <div
                        key={coin.rank}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#231A43] transition-all duration-300 group"
                    >
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                            <div className="text-2xl w-8 text-center text-purple-400 font-bold">
                                #{coin.rank}
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center text-3xl bg-[#1F1638] rounded-2xl">
                                {coin.icon}
                            </div>

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
                                coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                                <FiTrendingUp />
                                {coin.change}%
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            
        </div>
    );
};

export default Leaderboard;