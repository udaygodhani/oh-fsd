import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoHeatmap = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
        setError("Failed to load live data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);

    return () => clearInterval(interval);
  }, []);

  const getColorIntensity = (change) => {
    if (change > 10) return 'bg-green-600';
    if (change > 5) return 'bg-green-500';
    if (change > 0) return 'bg-green-400';
    if (change > -5) return 'bg-red-400';
    if (change > -10) return 'bg-red-500';
    return 'bg-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl">Loading live market data...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Crypto Heatmap</h1>
        <p className="text-green-400 text-sm">● Live • Updates every 30s</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {coins.map((coin) => {
          const change = coin.price_change_percentage_24h || 0;
          return (
            <div
              key={coin.id}
              className={`p-5 rounded-2xl transition-all hover:scale-105 border border-white/10 ${getColorIntensity(change)}/10`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={coin.image} 
                  alt={coin.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{coin.symbol.toUpperCase()}</h3>
                  <p className="text-sm text-gray-400 truncate">{coin.name}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-2xl font-mono font-bold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className={`text-lg font-medium mt-1 flex items-center gap-1 ${
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change >= 0 ? '↑' : '↓'} {change.toFixed(2)}%
                </p>
              </div>

              <div className="text-xs text-gray-500 mt-3">
                Market Cap: ${(coin.market_cap / 1e9).toFixed(1)}B
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoHeatmap;