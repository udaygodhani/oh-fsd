import React, { useState } from 'react';

const PricePrediction = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [prediction, setPrediction] = useState(null);

  const predict = () => {
    // Mock prediction (replace with real ML API call later)
    const mockPred = (Math.random() * 20 - 10).toFixed(2);
    setPrediction({
      coin,
      current: (Math.random() * 50000 + 20000).toFixed(2),
      predicted: (Math.random() * 60000 + 30000).toFixed(2),
      change: mockPred
    });
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Price Prediction</h1>
      <input
        type="text"
        value={coin}
        onChange={(e) => setCoin(e.target.value.toLowerCase())}
        className="w-full bg-[#1A1332] border border-purple-500/30 rounded-xl px-6 py-4 text-xl mb-6"
        placeholder="Enter coin (bitcoin, ethereum...)"
      />
      <button
        onClick={predict}
        className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition"
      >
        Predict Price
      </button>

      {prediction && (
        <div className="mt-10 bg-[#1A1332] p-8 rounded-3xl">
          <h3 className="text-2xl mb-6">Prediction for {prediction.coin.toUpperCase()}</h3>
          <p>Current: <span className="text-3xl">${prediction.current}</span></p>
          <p className="mt-4">Predicted (7d): <span className="text-4xl font-bold text-purple-400">${prediction.predicted}</span></p>
          <p className={`text-2xl mt-6 ${prediction.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {prediction.change > 0 ? '↑' : '↓'} {prediction.change}%
          </p>
        </div>
      )}
    </div>
  );
};

export default PricePrediction;