import React from "react";
import { FiAward, FiTrendingUp } from "react-icons/fi";

const Leaderboard = () => {
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