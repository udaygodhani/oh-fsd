const express = require('express');
const app = express();
const authRouter = require("./routes/auth.route")
const cookieParser = require("cookie-parser")
const Cors = require("cors");

// default middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(Cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    secure: false
}))
// health route
app.get("/",(req,res)=>{
    res.json({
        success: true,
        message: "Server is Running"
    })
})

// auth Router
app.use("/api/auth",authRouter)

module.exports = app;