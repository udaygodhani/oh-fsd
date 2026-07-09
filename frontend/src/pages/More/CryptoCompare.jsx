import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, CartesianGrid } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiActivity, FiDollarSign, FiSearch, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { CoinContext } from '../../context/coins/CoinContextProvider';

const PRESET_COLORS = ['#F7931A', '#627EEA', '#14F195', '#00E5FF', '#FF007F', '#A855F7', '#C2A633', '#E6007A', '#E84142', '#2A5ADA'];

const CryptoCompare = () => {
  const { allCryptoCoins } = useContext(CoinContext);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  
  // Normalized Chart Data & Volume Data
  const [chartData, setChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});

  // Fetch prices & volumes
  const fetchData = async () => {
    if (selectedCoins.length === 0) return;
    setLoading(true);
    try {
      // 1. Fetch current prices
      const coinIds = selectedCoins.map(c => c.id).join(',');
      const priceRes = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
      ).catch(() => null);

      let priceData = {};
      if (priceRes && priceRes.data) {
        priceData = priceRes.data;
      } else {
        // Mock fallback if rate limited
        selectedCoins.forEach(c => {
          const mockBase = c.id === 'bitcoin' ? 68000 : c.id === 'ethereum' ? 3500 : c.id === 'solana' ? 140 : 1.5;
          priceData[c.id] = {
            usd: mockBase + (Math.random() * mockBase * 0.05),
            usd_24h_change: (Math.random() * 8 - 4),
            usd_24h_vol: mockBase * 500000
          };
        });
      }
      setCurrentPrices(priceData);

      // 2. Fetch historical market charts
      const historyPromises = selectedCoins.map(c => 
        axios.get(`https://api.coingecko.com/api/v3/coins/${c.id}/market_chart?vs_currency=usd&days=${days}`)
          .then(res => ({ id: c.id, prices: res.data.prices, total_volumes: res.data.total_volumes }))
          .catch(() => {
            // Generate mock historical data if rate limited
            const prices = [];
            const total_volumes = [];
            const now = Date.now();
            const basePrice = priceData[c.id]?.usd || 100;
            const baseVol = priceData[c.id]?.usd_24h_vol || 1000000;

            for (let i = days; i >= 0; i--) {
              const dayMs = now - (i * 24 * 60 * 60 * 1000);
              const factor = 1 + ((Math.sin(i / 2) + Math.random() * 0.1) * 0.08);
              prices.push([dayMs, basePrice * factor]);
              total_volumes.push([dayMs, baseVol * (0.8 + Math.random() * 0.4)]);
            }
            return { id: c.id, prices, total_volumes };
          })
      );

      const historyResults = await Promise.all(historyPromises);

      // 3. Align historical prices & compute performance %
      const tempChartData = [];
      const tempVolumeData = [];

      // Determine date points from first coin
      const samplePoints = historyResults[0]?.prices || [];
      samplePoints.forEach((point, idx) => {
        const timestamp = point[0];
        const dateStr = new Date(timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric'
        });

        const performancePoint = { name: dateStr };
        const rawPricePoint = { name: dateStr };
        const volPoint = { name: dateStr };

        historyResults.forEach(res => {
          const coinPrices = res.prices;
          const coinVols = res.total_volumes;
          const coinObj = selectedCoins.find(sc => sc.id === res.id);
          if (!coinObj) return;

          // Align by index or fallback
          const priceVal = coinPrices[idx]?.[1] || coinPrices[coinPrices.length - 1]?.[1] || 0;
          const volVal = coinVols[idx]?.[1] || coinVols[coinVols.length - 1]?.[1] || 0;

          // Day 0 price for normalization
          const startPrice = coinPrices[0]?.[1] || 1;
          const perfPercent = ((priceVal - startPrice) / startPrice) * 100;

          performancePoint[coinObj.symbol] = parseFloat(perfPercent.toFixed(2));
          rawPricePoint[coinObj.symbol] = parseFloat(priceVal.toFixed(2));
          volPoint[coinObj.symbol] = parseFloat((volVal / 1e6).toFixed(2)); // in Millions
        });

        tempChartData.push(performancePoint);
        tempVolumeData.push(volPoint);
      });

      setChartData(tempChartData);
      setVolumeData(tempVolumeData);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load compare graph data.");
    } finally {
      setLoading(false);
    }
  };

  // Sync initial comparison targets from CoinContext once loaded
  useEffect(() => {
    if (allCryptoCoins && allCryptoCoins.length > 0 && selectedCoins.length === 0) {
      const coin1 = { ...allCryptoCoins[0], color: '#F7931A' };
      const coin2 = allCryptoCoins[1] 
        ? { ...allCryptoCoins[1], color: '#627EEA' }
        : { ...allCryptoCoins[0], color: '#627EEA' };
      setSelectedCoins([coin1, coin2]);
    }
  }, [allCryptoCoins, selectedCoins]);

  useEffect(() => {
    fetchData();
  }, [selectedCoins, days]);

  const handleAddCoin = (coin) => {
    if (selectedCoins.find(c => c.id === coin.id)) {
      toast.error(`${coin.name} is already selected.`);
      return;
    }
    if (selectedCoins.length >= 4) {
      toast.error("You can compare up to 4 coins at a time.");
      return;
    }
    const newColor = PRESET_COLORS[selectedCoins.length % PRESET_COLORS.length];
    setSelectedCoins([...selectedCoins, { ...coin, color: newColor }]);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleRemoveCoin = (coinId) => {
    if (selectedCoins.length <= 1) {
      toast.error("Please keep at least 1 coin to display comparative graph.");
      return;
    }
    setSelectedCoins(selectedCoins.filter(c => c.id !== coinId));
  };

  const dropdownFiltered = allCryptoCoins.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCoins.length === 0) {
    return (
      <div className="bg-[#0B061B] min-h-screen text-white p-6 md:p-10 flex items-center justify-center">
        <div className="text-gray-400 text-lg font-semibold animate-pulse">Initializing comparison parameters...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B061B] min-h-screen text-white p-6 md:p-10 space-y-10">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <FiActivity className="text-purple-400" /> Crypto Comparison
          </h1>
          <p className="text-gray-400 mt-2">Compare multi-token performance percentage, prices, and daily volumes</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex bg-[#151026] border border-purple-500/15 p-1 rounded-xl">
          {[7, 30, 90].map((t) => (
            <button
              key={t}
              onClick={() => setDays(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                days === t ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t} Days
            </button>
          ))}
        </div>
      </div>

      {/* Selector and Tokens Row */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Coin Selector Panel */}
        <div className="lg:col-span-4 bg-[#151026] border border-purple-500/20 rounded-3xl p-6 relative">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiPlus className="text-purple-400" /> Select Coins to Compare
          </h3>

          {/* Search Dropdown Input */}
          <div className="relative">
            <div className="flex items-center bg-[#0F0B24] border border-purple-500/20 rounded-xl px-4 py-3 mb-4 focus-within:border-purple-500 transition">
              <FiSearch className="text-gray-400 mr-2.5" />
              <input
                type="text"
                placeholder="Search coin..."
                value={searchQuery}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-white placeholder-gray-500 outline-none text-sm"
              />
            </div>

            {showDropdown && (
              <>
                <div onClick={() => setShowDropdown(false)} className="fixed inset-0 z-10" />
                <div className="absolute top-full left-0 right-0 max-h-56 overflow-y-auto bg-[#1A1332] border border-purple-500/30 rounded-xl p-2 shadow-2xl z-20 space-y-1 divide-y divide-purple-500/5">
                  {dropdownFiltered.length === 0 ? (
                    <div className="text-center text-xs text-gray-500 py-3">No matching coins found</div>
                  ) : (
                    dropdownFiltered.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => handleAddCoin(coin)}
                        className="w-full flex items-center justify-between hover:bg-purple-500/10 px-4 py-3 rounded-lg text-sm text-white font-medium text-left transition"
                      >
                        <span>{coin.name} <span className="text-xs text-gray-500 font-bold ml-1">{coin.symbol.replace('USDT', '')}</span></span>
                        <FiPlus className="text-purple-400" />
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          {/* Selected Coins Tags list */}
          <div className="space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Currently Comparing ({selectedCoins.length}/4)</p>
            <div className="flex flex-col gap-2.5">
              {selectedCoins.map((coin) => {
                const live = currentPrices[coin.id] || {};
                const change = live.usd_24h_change || 0;
                return (
                  <div
                    key={coin.id}
                    className="flex justify-between items-center bg-[#0F0B24] border border-purple-500/10 px-4 py-3 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: coin.color }}
                      />
                      <div>
                        <span className="font-semibold text-sm">{coin.name}</span>
                        <span className="text-xs text-gray-500 font-mono ml-1.5 uppercase font-bold">{coin.symbol.replace('USDT', '')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <div className="text-right">
                        <span className="text-sm font-mono font-semibold">${live.usd?.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                        <div className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                          {change.toFixed(2)}%
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveCoin(coin.id)}
                        className="p-1 rounded bg-purple-500/10 text-purple-400 hover:bg-red-500/20 hover:text-red-400 transition cursor-pointer"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side: Recharts Visualization */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Performance overlays line chart */}
          <div className="bg-[#151026] border border-purple-500/20 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FiActivity className="text-purple-400" /> Normalized Performance Comparison (%)
            </h3>

            {loading ? (
              <div className="h-80 flex items-center justify-center text-gray-400">Loading performance chart...</div>
            ) : (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ left: -10, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid stroke="#221B41" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#685E8C" fontSize={11} tickLine={false} />
                    <YAxis stroke="#685E8C" fontSize={11} unit="%" tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1A1332', borderColor: '#5C33FF', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    {selectedCoins.map((coin) => (
                      <Line
                        key={coin.id}
                        type="monotone"
                        dataKey={coin.symbol}
                        stroke={coin.color}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Volume bars comparison */}
          <div className="bg-[#151026] border border-purple-500/20 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-cyan-400" /> Trading Volume Comparison (in Millions USD)
            </h3>

            {loading ? (
              <div className="h-80 flex items-center justify-center text-gray-400">Loading volumes chart...</div>
            ) : (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ left: -10, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid stroke="#221B41" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#685E8C" fontSize={11} tickLine={false} />
                    <YAxis stroke="#685E8C" fontSize={11} tickLine={false} unit="M" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1A1332', borderColor: '#5C33FF', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      formatter={(value) => [`$${value.toLocaleString()}M`, 'Volume']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    {selectedCoins.map((coin) => (
                      <Bar
                        key={coin.id}
                        dataKey={coin.symbol}
                        fill={coin.color}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default CryptoCompare;