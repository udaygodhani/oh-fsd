import React, { useState } from 'react';

const CryptoCalculator = () => {
  const [investment, setInvestment] = useState(1000);
  const [roi, setRoi] = useState(25); // % return
  const [duration, setDuration] = useState(30); // days

  const futureValue = (investment * (1 + roi / 100)).toFixed(2);
  const dailyReturn = (investment * (roi / 100) / duration).toFixed(2);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Crypto Calculator</h1>

      <div className="bg-[#1A1332] p-8 rounded-3xl space-y-8">
        <div>
          <label className="block text-gray-400 mb-3">Investment Amount (USD)</label>
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
          <p className="text-4xl font-bold text-center mt-4">${investment.toLocaleString()}</p>
        </div>

        <div>
          <label className="block text-gray-400 mb-3">Expected ROI (%)</label>
          <input
            type="range"
            min="5"
            max="200"
            value={roi}
            onChange={(e) => setRoi(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
          <p className="text-3xl font-bold text-center mt-3 text-green-400">{roi}%</p>
        </div>

        <div>
          <label className="block text-gray-400 mb-3">Duration (Days)</label>
          <input
            type="range"
            min="7"
            max="365"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
          <p className="text-2xl font-bold text-center mt-3">{duration} days</p>
        </div>

        <div className="pt-6 border-t border-purple-500/20 grid grid-cols-2 gap-6 text-center">
          <div className="bg-[#120A25] p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Future Value</p>
            <p className="text-4xl font-bold mt-2 text-purple-400">${futureValue}</p>
          </div>
          <div className="bg-[#120A25] p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Est. Daily Profit</p>
            <p className="text-4xl font-bold mt-2 text-green-400">+${dailyReturn}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        * This is a simplified calculator for educational purposes
      </p>
    </div>
  );
};

export default CryptoCalculator;