const express = require("express")
const app = express()
const CookieParser = require("cookie-parser")
const Cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(CookieParser())
app.use(Cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const coinRouter = require("./routes/coin.route");
const authRouter = require("./routes/auth.route");

// Add after authRouter
app.use("/api/coins", coinRouter);
app.use("/api/auth", authRouter);

module.exports = app;