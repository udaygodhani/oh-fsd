import React from 'react';
import { FiPlay, FiUsers, FiDollarSign } from 'react-icons/fi';

const Gaming = () => {
  const games = [
    {
      name: "Axie Infinity",
      genre: "Play-to-Earn",
      players: "2.1M",
      reward: "AXS + SLP",
      imageColor: "from-orange-500 to-red-500"
    },
    {
      name: "Illuvium",
      genre: "AAA Metaverse",
      players: "428K",
      reward: "ILV",
      imageColor: "from-purple-500 to-indigo-500"
    },
    {
      name: "Gods Unchained",
      genre: "Card Trading",
      players: "312K",
      reward: "GODS",
      imageColor: "from-cyan-500 to-blue-500"
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3">Web3 Gaming</h2>
        <p className="text-gray-400 text-lg">Play • Earn • Own</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <div key={i} className="bg-[#1A1633] rounded-3xl p-8 border border-gray-700 hover:border-purple-500 transition-all group">
            <div className={`h-52 rounded-2xl bg-gradient-to-br ${game.imageColor} mb-8 flex items-center justify-center`}>
              <FiPlay className="text-6xl text-white/80 group-hover:scale-110 transition-transform" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
            <p className="text-purple-400 mb-6">{game.genre}</p>

            <div className="grid grid-cols-2 gap-6 text-sm mb-8">
              <div>
                <FiUsers className="text-cyan-400 mb-1" />
                <p className="text-gray-400">Players</p>
                <p className="font-mono text-lg">{game.players}</p>
              </div>
              <div>
                <FiDollarSign className="text-green-400 mb-1" />
                <p className="text-gray-400">Rewards</p>
                <p className="font-medium">{game.reward}</p>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-bold text-lg hover:brightness-110 transition-all">
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gaming;