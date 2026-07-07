import React from 'react';
import { FaDownload, FaStar, FaUsers } from 'react-icons/fa';

const AppPromotion = () => {
  return (
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">Crypto Grow Mobile App</h1>
      <p className="text-2xl text-gray-400 mb-12">Trade anywhere. Anytime.</p>

      <div className="bg-gradient-to-br from-purple-900/50 to-violet-900/30 p-12 rounded-3xl mb-16">
        <img 
          src="/project-logo.png" 
          alt="App Logo" 
          className="w-32 h-32 mx-auto mb-8"
        />
        
        <div className="flex justify-center gap-8 text-4xl mb-10">
          <div className="flex items-center gap-3"><FaStar className="text-yellow-400"/> 4.9</div>
          <div className="flex items-center gap-3"><FaUsers /> 50K+</div>
        </div>

        <div className="flex justify-center gap-6">
          <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-lg hover:scale-105 transition">
            <FaDownload /> Download on App Store
          </button>
          <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-lg hover:scale-105 transition">
            <FaDownload /> Get on Google Play
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {[
          { title: "Real-time Charts", desc: "Advanced TradingView integration" },
          { title: "Instant Alerts", desc: "Price & portfolio notifications" },
          { title: "Secure Wallet", desc: "Multi-chain support" }
        ].map((feature, i) => (
          <div key={i} className="bg-[#1A1332] p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPromotion;