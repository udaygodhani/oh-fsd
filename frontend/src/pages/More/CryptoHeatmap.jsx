import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoHeatmap = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
        );
        setCoins(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const getColor = (change) => {
    return change >= 0 ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto Heatmap</h1>
      {loading ? (
        <p className="text-center">Loading heatmap...</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${getColor(coin.price_change_percentage_24h)}/10 border border-white/10`}
            >
              <img src={coin.image} alt={coin.name} className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold">{coin.symbol.toUpperCase()}</p>
              <p className="text-sm">${coin.current_price.toLocaleString()}</p>
              <p className={`text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoHeatmap;