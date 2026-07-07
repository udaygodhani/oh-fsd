import React, { useState } from 'react';
import TradingViewWidget from '../../components/graph/TradingViewWidget';
import { FiSearch, FiStar, FiTrendingUp, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const All = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  const [activeTab, setActiveTab] = useState('all'); // all, spot, futures, gainer, loser

  const allCoins = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: '68,245.32', change: '+2.45', volume: '2.8B', category: 'spot' },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: '2,456.78', change: '-1.23', volume: '1.4B', category: 'spot' },
    { symbol: 'SOLUSDT', name: 'Solana', price: '148.92', change: '+5.67', volume: '987M', category: 'futures' },
    { symbol: 'BNBUSDT', name: 'BNB', price: '578.45', change: '+0.89', volume: '456M', category: 'spot' },
    { symbol: 'XRPUSDT', name: 'Ripple', price: '0.528', change: '-3.21', volume: '1.1B', category: 'spot' },
    { symbol: 'ADAUSDT', name: 'Cardano', price: '0.412', change: '+8.91', volume: '678M', category: 'futures' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin', price: '0.178', change: '-4.56', volume: '892M', category: 'spot' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', price: '28.45', change: '+3.78', volume: '345M', category: 'futures' },
  ];

  const filteredCoins = allCoins.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'gainer') return matchesSearch && coin.change.startsWith('+');
    if (activeTab === 'loser') return matchesSearch && coin.change.startsWith('-');
    return matchesSearch;
  });

  const topGainers = [...allCoins].sort((a, b) => parseFloat(b.change) - parseFloat(a.change)).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B081E] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold">All Markets</h1>
            <p className="text-gray-400">Spot • Futures • Top Movers</p>
          </div>

          <div className="relative w-96">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search any cryptocurrency..."
              className="w-full bg-[#1A1633] border border-gray-700 pl-11 py-3 rounded-xl focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4 overflow-x-auto">
          {['all', 'spot', 'futures', 'gainer', 'loser'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-medium whitespace-nowrap transition-all capitalize ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#1F1A38] hover:bg-[#252040] text-gray-400'
              }`}
            >
              {tab === 'gainer' ? 'Top Gainers' : tab === 'loser' ? 'Top Losers' : tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Market Table */}
          <div className="lg:col-span-5 bg-[#1A1633] rounded-3xl p-6 border border-gray-700">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">Market Overview</h2>
              <span className="text-sm text-gray-400">24h Volume</span>
            </div>

            <div className="space-y-2 max-h-[650px] overflow-y-auto custom-scrollbar pr-2">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin.symbol)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:bg-[#252040] ${selectedCoin === coin.symbol ? 'bg-[#2A2450] ring-1 ring-purple-500' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm">
                      {coin.symbol.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-xs text-gray-500">{coin.symbol}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono font-bold">${coin.price}</p>
                    <p className={`text-sm flex items-center justify-end gap-1 ${coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.change.startsWith('+') ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
                      {coin.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart + Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1A1633] rounded-3xl p-6 border border-gray-700 h-[520px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedCoin}</h3>
                  <p className="text-gray-400">Live Chart</p>
                </div>
                <button className="text-purple-400 hover:text-white flex items-center gap-2">
                  <FiStar /> Add to Watchlist
                </button>
              </div>
              <div className="h-[420px] bg-[#0F0B24] rounded-2xl overflow-hidden">
                <TradingViewWidget symbol={selectedCoin} />
              </div>
            </div>

            {/* Top Movers */}
            <div className="bg-[#1A1633] rounded-3xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-5 flex items-center gap-2">
                <FiTrendingUp className="text-yellow-400" /> Top Movers Right Now
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {topGainers.map((coin, i) => (
                  <div key={i} className="bg-[#252040] p-4 rounded-2xl text-center">
                    <p className="font-mono text-lg font-bold">${coin.price}</p>
                    <p className="text-green-500 text-sm font-medium">{coin.change}% ▲</p>
                    <p className="text-xs text-gray-400 mt-1">{coin.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;