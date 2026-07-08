import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const Nft = () => {
  const collections = [
    { name: "Bored Ape Yacht Club", floor: "68.4 ETH", volume: "124K", change: "+12%" },
    { name: "CryptoPunks", floor: "45.2 ETH", volume: "89K", change: "-3%" },
    { name: "Azuki", floor: "12.8 ETH", volume: "45K", change: "+28%" },
    { name: "Doodles", floor: "8.9 ETH", volume: "32K", change: "+5%" },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">NFT Marketplace</h2>
        <p className="text-gray-400">Discover, collect, and trade unique digital assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((col, i) => (
          <div key={i} className="bg-[#1A1633] rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all group">
            <div className="h-56 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 relative">
              <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-xs font-mono">
                {col.floor}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl mb-1">{col.name}</h3>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-400">Volume</p>
                  <p className="font-mono">{col.volume}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${col.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {col.change} (24h)
                  </p>
                </div>
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                <FiShoppingCart /> View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nft;