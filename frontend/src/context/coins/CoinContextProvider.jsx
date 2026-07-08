import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const CoinContext = createContext()
const CoinContextProvider = (props) => {
  const initialMockCoins = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: '68,245.32', change: '+2.45', volume: '1.2B', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: '2,456.78', change: '-1.23', volume: '892M', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
    { symbol: 'SOLUSDT', name: 'Solana', price: '148.92', change: '+5.67', volume: '456M', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
    { symbol: 'BNBUSDT', name: 'BNB', price: '578.45', change: '+0.89', volume: '234M', image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png' },
    { symbol: 'XRPUSDT', name: 'Ripple', price: '0.528', change: '-3.21', volume: '678M', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
  ];

  const [allCryptoCoins, setallCryptoCoins] = useState(initialMockCoins);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
        );

        // 3. Format the CoinGecko API data to match your mock data structure
        const formattedApiData = response.data.map(apiCoin => ({
          // Append USDT to match TradingView symbols
          symbol: `${apiCoin.symbol.toUpperCase()}USDT`,
          name: apiCoin.name,
          // Format price with commas
          price: apiCoin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
          // Ensure change has a '+' or '-' sign
          change: apiCoin.price_change_percentage_24h > 0
            ? `+${apiCoin.price_change_percentage_24h.toFixed(2)}`
            : apiCoin.price_change_percentage_24h.toFixed(2),
          // Fallback volume
          volume: apiCoin.total_volume.toLocaleString(),
          image: apiCoin.image
        }));

        // Replace the mock data with the live API data
        setallCryptoCoins(formattedApiData);
      } catch (err) {
        console.error("Failed to fetch live coin data:", err);
      }
    };

    fetchCoins();
  }, []);
  return (
    <CoinContext.Provider value={{ initialMockCoins, allCryptoCoins }}>
      {props.children}
    </CoinContext.Provider>
  )
}

export default CoinContextProvider
