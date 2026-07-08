const express = require("express");
const router = express.Router();
const { getAllCoins, seedCoins } = require("../controllers/coin.controller");

router.get("/", getAllCoins);
router.post("/seed", seedCoins);

module.exports = router;