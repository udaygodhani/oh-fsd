import React, { useState, useEffect, useContext } from 'react';
import { CoinContext } from '../../context/coins/CoinContextProvider';

const CryptoHeatmap = () => {
  const { allCryptoCoins } = useContext(CoinContext);

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

  // Handle loading state
  useEffect(() => {
    if (allCryptoCoins && allCryptoCoins.length > 0) {
      setLoading(false);
    }
  }, [allCryptoCoins]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl">Loading live market data...</p>
      </div>
    );
  }

  if (!allCryptoCoins || allCryptoCoins.length === 0) {
    return (
      <p className="text-red-400 text-center text-xl">
        No coin data available. Please check CoinContext.
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Crypto Heatmap</h1>
        <p className="text-green-400 text-sm">● Live • Updates every 12s</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 gap-4">
        {allCryptoCoins.map((coin, index) => {
          const change = parseFloat(coin.change) || 0;
          const price = parseFloat(coin.price) || 0;

          return (
            <div
              key={index} // Using index since your data may not have unique 'id'
              className={`p-5 rounded-2xl transition-all hover:scale-105 border border-white/10 ${getColorIntensity(change)}/10`}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* You can add a default icon or use symbol as fallback */}
                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                  <img src={coin.image} className='object-cover' alt="" />
                </div>

                <div>
                  <h3 className="font-bold text-lg">{coin.symbol}</h3>
                  <p className="text-sm text-gray-400 truncate">{coin.name}</p>
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
                Vol: ${parseFloat(coin.volume || 0).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoHeatmap;