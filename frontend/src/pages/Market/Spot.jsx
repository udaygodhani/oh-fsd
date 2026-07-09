import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import TradingViewWidget from '../../components/graph/TradingViewWidget';
import { FiSearch, FiStar, FiTrendingUp, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { CoinContext } from '../../context/coins/CoinContextProvider';
import { UserContext } from '../../context/data/UserDataProvider';
import api from '../../api/api';
import { toast } from 'react-hot-toast';

const Spot = () => {
  const { allCryptoCoins } = useContext(CoinContext)
  const { user, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  const [quantity, setQuantity] = useState(1);

  const handleTrade = async (type) => {
    if (!user) {
      alert("Please login first to start trading.");
      return;
    }
    try {
      const activeCoinObj = allCryptoCoins.find(c => c.symbol === selectedCoin);
      if (!activeCoinObj) {
        toast.error("Invalid coin selection.");
        return;
      }
      
      const priceVal = parseFloat(String(activeCoinObj.price).replace(/,/g, ''));
      if (isNaN(priceVal) || priceVal <= 0) {
        toast.error("Invalid price detection.");
        return;
      }

      const parsedQty = parseFloat(quantity);
      if (isNaN(parsedQty) || parsedQty <= 0) {
        toast.error("Please enter a valid quantity greater than 0.");
        return;
      }

      const toastId = toast.loading(`Performing ${type.toUpperCase()} order...`);
      const endpoint = type === 'buy' ? '/api/trade/buy' : '/api/trade/sell';
      
      const res = await api.post(endpoint, {
        symbol: selectedCoin,
        name: activeCoinObj.name,
        quantity: parsedQty,
        price: priceVal
      });

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setUser(res.data.user);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Trade failed.");
    }
  };

  const filteredCoins = allCryptoCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (filteredCoins.length > 0) {
        setSelectedCoin(filteredCoins[0].symbol);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B081E] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Spot Market
            </h1>
            <p className="text-gray-400 mt-2">Trade cryptocurrencies instantly</p>
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coins..."
              className="w-full bg-[#1A1633] border border-gray-700 pl-11 py-3 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Market Sub-Navigation (Highly visible on all screens) */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4 overflow-x-auto lg:hidden">
          <NavLink
            to="/market/spot"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                isActive ? 'bg-purple-600 text-white' : 'bg-[#1F1A38] text-gray-400 hover:text-white'
              }`
            }
          >
            Spot
          </NavLink>
          <NavLink
            to="/market/future"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                isActive ? 'bg-purple-600 text-white' : 'bg-[#1F1A38] text-gray-400 hover:text-white'
              }`
            }
          >
            Futures
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Market List */}
          <div className="lg:col-span-5 bg-[#1A1633] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiTrendingUp /> All Coins
              </h2>
              <span className="text-sm text-gray-400">24h Volume</span>
            </div>

            <div className="space-y-3 py-6 px-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin.symbol)}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all hover:bg-[#252040] ${selectedCoin === coin.symbol ? 'bg-[#2A2450] ring-2 ring-purple-500' : 'bg-[#1F1A38]'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Added support for the CoinGecko image if it exists, otherwise fallback to initials */}
                    {coin.image ? (
                      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold">
                        {coin.symbol.slice(0, 3)}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-sm text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono font-bold">${coin.price}</p>
                    {/* 4. Fixed the bug here: changed allCryptoCoins.change to coin.change */}
                    <p className={`text-sm flex items-center justify-end gap-1 ${String(coin.change).startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {String(coin.change).startsWith('+') ? <FiArrowUp /> : <FiArrowDown />}
                      {coin.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-7 bg-[#1A1633] rounded-2xl p-6 border border-gray-800 relative flex flex-col min-w-0">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{selectedCoin}</h2>
                <div className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">+2.45% (24h)</div>
              </div>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl transition-colors">
                <FiStar /> Watchlist
              </button>
            </div>

            {/* TradingView Chart */}
            <div className="flex-1 min-h-[400px] bg-[#0F0B24] rounded-xl overflow-hidden mb-6">
              <TradingViewWidget symbol={selectedCoin} />
            </div>

            {/* Quantity Input */}
            <div className="bg-[#252040] p-4 rounded-xl mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-400 font-medium">Order Quantity ({selectedCoin.replace('USDT', '')})</span>
              <input
                type="number"
                min="0.0001"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-[#0F0B24] border border-purple-500/30 rounded-lg px-4 py-2 w-36 text-right font-mono text-white focus:outline-none focus:border-purple-500 font-bold"
              />
            </div>

            {/* Quick Trade Panel */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-[#252040] p-5 rounded-xl">
                <p className="text-sm text-gray-400 mb-2">Buy Price</p>
                {/* Dynamically showing selected coin price */}
                <p className="text-3xl font-mono font-bold text-green-400">
                  {allCryptoCoins.find(c => c.symbol === selectedCoin)?.price || '0.00'}
                </p>
                <button
                  onClick={() => handleTrade('buy')}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  BUY
                </button>
              </div>

              <div className="bg-[#252040] p-5 rounded-xl">
                <p className="text-sm text-gray-400 mb-2">Sell Price</p>
                {/* Dynamically showing selected coin price */}
                <p className="text-3xl font-mono font-bold text-red-400">
                  {allCryptoCoins.find(c => c.symbol === selectedCoin)?.price || '0.00'}
                </p>
                <button
                  onClick={() => handleTrade('sell')}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spot;