import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoHeatmap = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getColorIntensity = (change) => {
    const numChange = parseFloat(change) || 0;
    if (numChange > 10) return 'bg-green-600';
    if (numChange > 5) return 'bg-green-500';
    if (numChange > 0) return 'bg-green-400';
    if (numChange > -5) return 'bg-red-400';
    if (numChange > -10) return 'bg-red-500';
    return 'bg-red-600';
  };

  const fetchLiveData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
      );
      
      setCoins(response.data);
      if (loading) setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      if (loading) setLoading(false);
    }
  };

  // Initial fetch + live updates every 12 seconds
  useEffect(() => {
    fetchLiveData();
    
    const interval = setInterval(() => {
      fetchLiveData();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl">Loading live market data...</p>
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <p className="text-red-400 text-center text-xl">
        No coin data available.
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Crypto Heatmap</h1>
        <p className="text-green-400 text-sm">● Live • Updates every 12s</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {coins.map((coin) => {
          const change = parseFloat(coin.price_change_percentage_24h) || 0;
          const price = parseFloat(coin.current_price) || 0;

          return (
            <div
              key={coin.id}
              className={`p-5 rounded-2xl transition-all hover:scale-105 border border-white/10 ${getColorIntensity(change)}/10`}
            >
              <div className="flex items-center gap-3 mb-4 min-w-0">
                <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                  <img 
                    src={coin.image} 
                    className="w-full h-full object-cover" 
                    alt={coin.name}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg truncate" title={coin.symbol?.toUpperCase()}>{coin.symbol?.toUpperCase()}</h3>
                  <p className="text-sm text-gray-400 truncate" title={coin.name}>{coin.name}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-2xl font-mono font-bold">
                  ${price.toLocaleString()}
                </p>
                <p className={`text-lg font-medium mt-1 flex items-center gap-1 ${
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change >= 0 ? '↑' : '↓'} {change.toFixed(2)}%
                </p>
              </div>

              <div className="text-xs text-gray-500 mt-3">
                Vol: ${parseFloat(coin.total_volume || 0).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoHeatmap;