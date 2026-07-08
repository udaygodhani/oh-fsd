const express = require("express")
const app = express()

const coinRouter = require("./routes/coin.route");

// Add after authRouter
app.use("/api/coins", coinRouter);

module.exports = app;