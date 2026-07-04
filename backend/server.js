require("dotenv").config({quiet: true});
const server = require("./src/app");
const connectDB = require("./src/config/Database/DB")
const port = process.env.PORT;

// connect mongodb database
connectDB()

server.listen(port,()=>console.log(`Server is Running on PORT: ${port}`))