import React from 'react'
import { Outlet } from 'react-router-dom'

const Web3Layout = () => {
    return (
        <div className="min-h-screen bg-[#0B081E] text-white p-6">
            <div className="max-w-7xl mx-auto">
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
                    {['explore', 'defi', 'nft', 'gaming'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-2xl font-medium transition-all capitalize ${activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'hover:bg-[#1F1A38] text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Web3Layout
