import React, { useState } from "react";
import { FiAward, FiTrendingUp, FiTrendingDown, FiX, FiSearch, FiUsers } from "react-icons/fi";

const Leaderboard = ({ users = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState("coins");
    const [searchQuery, setSearchQuery] = useState("");

    // Crypto Coins Data (Sorted by Market Cap / Volume - Ascending Rank)
    const coins = [
        {
            rank: 1,
            name: "Bitcoin",
            symbol: "BTC",
            price: "68,450",
            change: "+2.45",
            icon: "₿"
        },
        {
            rank: 2,
            name: "Ethereum",
            symbol: "ETH",
            price: "3,450",
            change: "+1.82",
            icon: "⟠"
        },
        {
            rank: 3,
            name: "Solana",
            symbol: "SOL",
            price: "148.75",
            change: "+4.12",
            icon: "◎"
        },
        {
            rank: 4,
            name: "Binance Coin",
            symbol: "BNB",
            price: "582.30",
            change: "+0.95",
            icon: "🟡"
        },
        {
            rank: 5,
            name: "Ripple",
            symbol: "XRP",
            price: "0.62",
            change: "-0.45",
            icon: "✕"
        },
    ];

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
        <>
            <div className="bg-[#17112D] border border-purple-500/20 rounded-3xl p-6">
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
                                    {coin.change.startsWith('+') ? <FiTrendingUp /> : <FiTrendingDown />}
                                    {coin.change}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Details Button */}
                <div className="mt-6 pt-4 border-t border-purple-500/10">
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setSearchQuery("");
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-2xl font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/15 hover:shadow-purple-500/30 flex items-center justify-center gap-2"
                    >
                        <FiAward className="text-lg" /> View Detailed Leaderboard
                    </button>
                </div>
            </div>

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
                                                        key={coin.rank}
                                                        className="border-b border-purple-500/5 hover:bg-[#231A43]/50 transition-colors duration-200 text-white font-medium"
                                                    >
                                                        <td className="py-4 pl-4 font-bold text-purple-400 text-lg">#{coin.rank}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-9 h-9 flex items-center justify-center text-xl bg-[#1F1638] rounded-xl border border-purple-500/10">
                                                                    {coin.icon}
                                                                </span>
                                                                <div>
                                                                    <span className="block font-bold">{coin.name}</span>
                                                                    <span className="text-gray-400 text-xs font-mono uppercase">{coin.symbol}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-right font-mono font-bold">${coin.price}</td>
                                                        <td className={`py-4 text-right font-semibold font-mono ${
                                                            coin.change.startsWith("+") ? "text-green-400" : "text-red-400"
                                                        }`}>
                                                            <span className="inline-flex items-center gap-1 justify-end">
                                                                {coin.change.startsWith("+") ? <FiTrendingUp /> : <FiTrendingDown />}
                                                                {coin.change}%
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right text-gray-300 font-mono hidden sm:table-cell">{coin.marketCap}</td>
                                                        <td className="py-4 text-right text-gray-300 font-mono pr-4 hidden md:table-cell">{coin.volume24h}</td>
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
};

export default Leaderboard;