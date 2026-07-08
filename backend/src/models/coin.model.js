const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  symbol: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  change: { 
    type: Number, 
    default: 0 
  },
  icon: { 
    type: String, 
    default: "🪙" 
  },
  rank: { 
    type: Number 
  },
}, { timestamps: true });

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;