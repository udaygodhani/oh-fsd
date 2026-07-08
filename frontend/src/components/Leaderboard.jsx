import React, { useState, useContext, useEffect } from "react";
import { FiAward, FiTrendingUp, FiTrendingDown, FiX, FiSearch, FiUsers } from "react-icons/fi";
import { CoinContext } from "../context/coins/CoinContextProvider";

const Leaderboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState("coins");

    const { allCryptoCoins } = useContext(CoinContext);

    // Dynamic coins lists from context
    const coinsToDisplay = allCryptoCoins && allCryptoCoins.length > 0 ? allCryptoCoins : [];
    const sidebarCoins = coinsToDisplay.slice(0, 5).map((coin, index) => ({
        rank: index + 1,
        ...coin
    }));

    // Fetch coins from Backend (with fallback)
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/coins');
                const data = await res.json();
                if (data.success) {
                    setCoins(data.coins);
                }
            } catch (err) {
                console.error("Failed to fetch coins:", err);
                setCoins([
                    { id: 1, symbol: "BTC", name: "Bitcoin", price: 68450, change: 2.45, icon: "₿" },
                    { id: 2, symbol: "ETH", name: "Ethereum", price: 3450, change: 1.82, icon: "◇" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchCoins();
    }, []);

    // Filter for modal
    const filteredCoins = coinsToDisplay
        .filter(coin =>
            coin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const priceA = parseFloat(a.price?.toString().replace(/,/g, '')) || 0;
            const priceB = parseFloat(b.price?.toString().replace(/,/g, '')) || 0;
            return priceB - priceA;
        });

    const filteredUsers = [
        { rank: 1, name: "CryptoWhale42", avatar: "https://i.pravatar.cc/150?img=1", points: 12450, posts: 87 },
        { rank: 2, name: "BlockchainBuilder", avatar: "https://i.pravatar.cc/150?img=2", points: 9870, posts: 64 },
    ];

    return (
        <>
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

                {/* Sidebar Coins List */}
                {loading ? (
                    <p className="text-gray-400 text-center py-8">Loading coins...</p>
                ) : (
                    <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                        {sidebarCoins.map((coin, index) => (
                            <div
                                key={coin.symbol || index}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#231A43] transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-purple-400 font-bold w-8 text-xl">#{coin.rank}</div>
                                    {coin.image ? (
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-11 h-11 rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-11 h-11 flex items-center justify-center text-3xl bg-[#252040] rounded-2xl">
                                            {coin.icon || coin.symbol?.[0]}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition">
                                            {coin.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{coin.symbol}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-bold text-xl text-white">
                                        ${coin.price}
                                    </div>
                                    <div className={`text-sm flex items-center justify-end gap-1 ${String(coin.change || 0).startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                        {String(coin.change || 0).startsWith('+') ? <FiTrendingUp /> : <FiTrendingDown />}
                                        {coin.change}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Full Leaderboard Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="bg-[#140E29] border border-purple-500/30 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden relative z-10">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 z-20"
                        >
                            <FiX className="text-2xl" />
                        </button>

                        {/* Modal Header */}
                        <div className="p-8 pb-4 border-b border-purple-500/15">
                            <h2 className="text-white text-3xl font-extrabold flex items-center gap-3">
                                <FiAward className="text-yellow-400 text-3xl" /> Global Leaderboard
                            </h2>
                        </div>

                        {/* Tabs + Search */}
                        <div className="p-6 border-b border-purple-500/10 flex flex-col md:flex-row gap-4">

                            <button
                                onClick={() => { setActiveModalTab("coins"); setSearchQuery(""); }}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeModalTab === "coins" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                🪙 Coins
                            </button>


                            <div className="relative flex-1">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={activeModalTab === "coins" ? "Search coins..." : "Search users..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1F1A38] border border-gray-700 pl-11 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {activeModalTab === "coins" ? (
                                <table className="w-full">
                                    {/* Table content - simplified for brevity */}
                                    <thead>
                                        <tr className="text-left text-gray-400 border-b">
                                            <th className="pb-4">Rank</th>
                                            <th className="pb-4">Coin</th>
                                            <th className="pb-4 text-right">Price</th>
                                            <th className="pb-4 text-right">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCoins.map((coin, idx) => (
                                            <tr key={idx} className="border-b border-purple-500/10 hover:bg-[#231A43]">
                                                <td className="py-4">#{idx + 1}</td>
                                                <td className="py-4 flex items-center gap-3">
                                                    {coin.image && <img src={coin.image} alt="" className="w-8 h-8 rounded-full" />}
                                                    <div>
                                                        <div>{coin.name}</div>
                                                        <div className="text-xs text-gray-400">{coin.symbol}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right font-mono">${coin.price}</td>
                                                <td className={`py-4 text-right ${String(coin.change).startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                    {coin.change}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="space-y-4">
                                    {filteredUsers.map(user => (
                                        <div key={user.rank} className="flex justify-between p-4 bg-[#1F1A38] rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="text-purple-400 font-bold">#{user.rank}</div>
                                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <div className="font-semibold">{user.name}</div>
                                                    <div className="text-sm text-gray-400">{user.posts} posts</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-yellow-400">{user.points.toLocaleString()}</div>
                                                <div className="text-xs text-purple-400">POINTS</div>
                                            </div>
                                        </div>
                                    ))}
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