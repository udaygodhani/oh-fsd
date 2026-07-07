import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoConverter = () => {
  const [coins, setCoins] = useState([]);
  const [fromCoin, setFromCoin] = useState('bitcoin');
  const [toCoin, setToCoin] = useState('ethereum');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50')
      .then(res => setCoins(res.data))
      .catch(err => console.error(err));
  }, []);

  const convert = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin},${toCoin}&vs_currencies=usd`
      );
      const fromPrice = res.data[fromCoin].usd;
      const toPrice = res.data[toCoin].usd;
      const converted = (amount * fromPrice / toPrice).toFixed(6);
      setResult({ amount: converted, from: fromCoin, to: toCoin });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Currency Converter</h1>

      <div className="bg-[#1A1332] p-8 rounded-3xl border border-purple-500/20">
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#120A25] border border-purple-500/30 rounded-xl px-5 py-4 text-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-400">From</label>
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
                className="w-full bg-[#120A25] border border-purple-500/30 rounded-xl px-5 py-4"
              >
                {coins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.symbol.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-400">To</label>
              <select
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
                className="w-full bg-[#120A25] border border-purple-500/30 rounded-xl px-5 py-4"
              >
                {coins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.symbol.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition"
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>

          {result && (
            <div className="mt-6 p-6 bg-[#0F0820] rounded-2xl text-center">
              <p className="text-5xl font-bold text-purple-400">
                {parseFloat(result.amount).toLocaleString()}
              </p>
              <p className="text-xl mt-2">
                {result.from.toUpperCase()} = {result.to.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;