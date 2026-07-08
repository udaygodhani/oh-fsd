import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiGlobe } from 'react-icons/fi';

const Web3Layout = () => {
    const [activeTab, setActiveTab] = useState('Explore');
    const navigate = useNavigate();
    
    const tabs = [
        { name: "Explore", to: "/market/web3/explore" },
        { name: "Defi", to: "/market/web3/defi" },
        { name: "Nft", to: "/market/web3/nft" },
        { name: "Gaming", to: "/market/web3/gaming" },
    ]

    return (
        <div className="min-h-screen bg-[#0B081E] text-white p-6">
            <div className="max-w-7xl mx-auto mt-20">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-3xl mb-6">
                        <FiGlobe className="text-3xl" />
                        <h1 className="text-5xl font-bold">Web3 Universe</h1>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore decentralized applications, NFTs, DeFi, and the future of the internet
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-10 border-b border-gray-800 pb-1">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => { 
                                setActiveTab(tab.name); 
                                navigate(tab.to) 
                            }}
                            className={`px-8 py-3 rounded-2xl font-medium transition-all capitalize ${
                                activeTab === tab.name
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'hover:bg-[#1F1A38] text-gray-400'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Web3Layout