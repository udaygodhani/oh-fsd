import React from 'react';
import { FiPieChart, FiAward } from 'react-icons/fi';

const Defi = () => {
  const defiProtocols = [
    { name: "Aave", tvl: "$8.2B", apy: "4.8%", type: "Lending" },
    { name: "Uniswap", tvl: "$4.9B", apy: "12.4%", type: "DEX" },
    { name: "Compound", tvl: "$2.1B", apy: "3.2%", type: "Lending" },
    { name: "PancakeSwap", tvl: "$1.8B", apy: "18.7%", type: "DEX" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3">Decentralized Finance (DeFi)</h2>
        <p className="text-gray-400 text-lg">Earn yield, swap tokens, and lend assets without intermediaries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {defiProtocols.map((protocol, i) => (
          <div key={i} className="bg-[#1A1633] border border-gray-700 rounded-3xl p-6 hover:border-purple-500 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="text-3xl font-bold text-purple-400">{protocol.name}</div>
              <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full">{protocol.type}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Total Value Locked</p>
                <p className="text-2xl font-mono font-bold">{protocol.tvl}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Current APY</p>
                <p className="text-3xl font-bold text-green-400">{protocol.apy}</p>
              </div>
            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3.5 rounded-2xl font-semibold group-hover:scale-105 transition-transform">
              Start Earning →
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1633] rounded-3xl p-8 border border-gray-700 mt-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FiPieChart /> Popular DeFi Strategies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {["Yield Farming", "Liquidity Providing", "Staking"].map((strat, i) => (
            <div key={i} className="p-6 bg-[#252040] rounded-2xl">
              <FiAward className="mx-auto text-4xl mb-4 text-yellow-400" />
              <p className="font-semibold text-lg">{strat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Defi;