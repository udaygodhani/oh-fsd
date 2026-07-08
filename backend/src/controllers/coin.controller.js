const Coin = require("../models/coin.model");

// Get all coins sorted by price ascending
const getAllCoins = async (req, res) => {
  try {
    const coins = await Coin.find().sort({ price: 1 }); // Ascending price
    res.status(200).json({
      success: true,
      count: coins.length,
      coins
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seed initial coins (for testing)
const seedCoins = async (req, res) => {
  try {
    await Coin.deleteMany({}); // Clear existing

    const initialCoins = [
      { symbol: "BTC", name: "Bitcoin", price: 68450, change: 2.45, icon: "₿" },
      { symbol: "ETH", name: "Ethereum", price: 3450, change: 1.82, icon: "◇" },
      { symbol: "SOL", name: "Solana", price: 148.75, change: 4.12, icon: "◉" },
      { symbol: "BNB", name: "Binance Coin", price: 582.30, change: 0.95, icon: "🟡" },
      { symbol: "XRP", name: "Ripple", price: 0.62, change: -0.45, icon: "✕" },
      { symbol: "ADA", name: "Cardano", price: 0.41, change: 3.2, icon: "🔷" },
      { symbol: "DOGE", name: "Dogecoin", price: 0.18, change: -1.5, icon: "🐶" },
      { symbol: "AVAX", name: "Avalanche", price: 28.45, change: 2.8, icon: "❄️" },
    ];

    await Coin.insertMany(initialCoins);
    res.status(201).json({ success: true, message: "Coins seeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllCoins, seedCoins };