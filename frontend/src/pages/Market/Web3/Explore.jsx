import React, { useState } from 'react'
import { FiGlobe, FiZap, FiAward, FiUsers, FiExternalLink, FiStar } from 'react-icons/fi';
import { FaWallet } from "react-icons/fa";

const Explore = () => {
    const [activeTab, setActiveTab] = useState('explore');
    
      const web3Projects = [
        {
          name: "Decentraland",
          symbol: "MANA",
          desc: "Virtual reality platform",
          price: "0.42",
          change: "+4.2%",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "The Sandbox",
          symbol: "SAND",
          desc: "User-generated metaverse",
          price: "0.38",
          change: "-1.8%",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Axie Infinity",
          symbol: "AXS",
          desc: "Play-to-Earn Gaming",
          price: "6.85",
          change: "+12.4%",
          color: "from-cyan-500 to-blue-500"
        },
        {
          name: "Render Network",
          symbol: "RNDR",
          desc: "GPU rendering on blockchain",
          price: "8.92",
          change: "+7.1%",
          color: "from-emerald-500 to-teal-500"
        },
      ];
    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
                <div className="bg-[#1A1633] rounded-3xl p-8 border border-gray-700">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <FiZap className="text-yellow-400" /> Trending Web3 Projects
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {web3Projects.map((project, index) => (
                            <div
                                key={index}
                                className="group bg-[#252040] hover:bg-[#2A2450] p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-purple-500/50 cursor-pointer"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-5 text-2xl font-bold`}>
                                    {project.symbol.slice(0, 2)}
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold">{project.name}</h3>
                                        <p className="text-purple-400 font-mono">{project.symbol}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-mono font-semibold">${project.price}</p>
                                        <p className={`text-sm ${project.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                            {project.change}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-400 mt-4 text-sm leading-relaxed">{project.desc}</p>

                                <div className="mt-6 flex justify-between items-center">
                                    <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2 text-sm font-medium">
                                        Trade <FiExternalLink />
                                    </button>
                                    <FiStar className="text-gray-500 group-hover:text-yellow-400 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                {/* Wallet Connect */}
                <div className="bg-gradient-to-br from-[#1A1633] to-[#252040] rounded-3xl p-8 border border-purple-500/30">
                    <div className="flex items-center gap-4 mb-6">
                        <FaWallet className="text-4xl text-purple-400" />
                        <div>
                            <h3 className="text-2xl font-bold">Connect Wallet</h3>
                            <p className="text-sm text-gray-400">Access your Web3 assets</p>
                        </div>
                    </div>
                    <button className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3">
                        <FaWallet /> Connect MetaMask / WalletConnect
                    </button>
                </div>

                {/* Stats */}
                <div className="bg-[#1A1633] rounded-3xl p-8 border border-gray-700">
                    <h3 className="text-xl font-semibold mb-6">Web3 Ecosystem</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FiUsers className="text-cyan-400" />
                                <span>Active Users</span>
                            </div>
                            <span className="font-mono font-bold text-2xl">2.4M</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FiAward className="text-yellow-400" />
                                <span>Total Volume (24h)</span>
                            </div>
                            <span className="font-mono font-bold text-2xl">$1.8B</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FiZap className="text-green-400" />
                                <span>DeFi TVL</span>
                            </div>
                            <span className="font-mono font-bold text-2xl">$92B</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-[#1A1633] rounded-3xl p-8 border border-gray-700">
                    <h3 className="text-xl font-semibold mb-5">Quick Access</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {['NFT Marketplace', 'Staking', 'Bridge', 'DAO Voting', 'Launchpad', 'Yield Farming'].map((item, i) => (
                            <div key={i} className="bg-[#252040] hover:bg-purple-600/20 p-4 rounded-2xl cursor-pointer transition-colors flex items-center gap-2">
                                <FiExternalLink /> {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore