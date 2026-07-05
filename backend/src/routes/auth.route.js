const express = require("express");
const { loginUser, registerUser, logoutUser, getUser, verifyEmail, resendOtp } = require("../controllers/auth.controller");
const userAuthMiddleware = require("../middlewares/auth.middlewares");

const authRouter = express.Router();

/**
 * @EndPoint := /api/auth/register
 * @RequiredFields := name, email, password
 * @Method := POST
 */
authRouter.post("/register", registerUser);

/**
 * @EndPoint := /api/auth/login
 * @RequiredFields := email, password
 * @Method := POST
 */
authRouter.post("/login", loginUser);

/**
 * @EndPoint := /api/auth/logout
 * @Method := GET
 */
authRouter.get("/logout", userAuthMiddleware, logoutUser);

/**
 * @EndPoint := /api/auth/getuser
 * @Method := GET
 */
authRouter.get("/getuser", userAuthMiddleware, getUser);

/**
 * @EndPoint := /api/auth/verifyemail
 * @Method := POST
 * @RequiredFields := email, otp
 */
authRouter.post("/verifyemail", verifyEmail);

/**
 * @EndPoint := /api/auth/resendOtp
 * @Method := POST
 * @RequiredFields := email
 */
authRouter.post("/resendOtp", resendOtp);

module.exports = authRouter;