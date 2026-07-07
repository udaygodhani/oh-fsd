import React, { useState } from 'react';
import { FiGlobe, FiZap, FiAward, FiUsers, FiExternalLink, FiStar } from 'react-icons/fi';
import {FaWallet} from 'react-icons/fa'

const Web3 = () => {
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
    <div className="min-h-screen bg-[#0B081E] text-white p-6">
      <div className="max-w-7xl mx-auto">
          
      </div>
    </div>
  );
};

export default Web3;