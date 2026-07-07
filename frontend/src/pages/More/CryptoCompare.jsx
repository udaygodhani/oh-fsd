import React, { useState } from 'react';
import axios from 'axios';

const CryptoCompare = () => {
  const [coin1, setCoin1] = useState('bitcoin');
  const [coin2, setCoin2] = useState('ethereum');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const compare = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin1},${coin2}&vs_currencies=usd&include_24hr_change=true`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto Compare</h1>
      
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={coin1}
          onChange={(e) => setCoin1(e.target.value.toLowerCase())}
          className="flex-1 bg-[#1A1332] border border-purple-500/30 rounded-xl px-4 py-3 text-white"
          placeholder="Coin 1 (e.g. bitcoin)"
        />
        <input
          type="text"
          value={coin2}
          onChange={(e) => setCoin2(e.target.value.toLowerCase())}
          className="flex-1 bg-[#1A1332] border border-purple-500/30 rounded-xl px-4 py-3 text-white"
          placeholder="Coin 2 (e.g. ethereum)"
        />
        <button
          onClick={compare}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-8 rounded-xl font-medium"
        >
          Compare
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(data).map((coin) => (
            <div key={coin} className="bg-[#1A1332] p-6 rounded-2xl">
              <h3 className="text-xl capitalize font-semibold mb-4">{coin}</h3>
              <p className="text-3xl">${data[coin].usd}</p>
              <p className={`mt-2 ${data[coin].usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                24h: {data[coin].usd_24h_change?.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoCompare;