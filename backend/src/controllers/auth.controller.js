const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model.js");
const sendEmail = require("../services/sendemail.service.js");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User with this email already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const html = `<div>
        <h1 style="font-family: sans-serif; color: rgb(100, 34, 161); font-size: x-large; text-align: center;">Welcome,
            ${name}</h1>
        <h3 style="font-family: sans-serif;">Verify Your Email:</h3>
        <p style="font-family: sans-serif;">Use: <span
                style="padding: 5px 15px; border: 3px solid blueviolet; background-color: rgb(100, 34, 161); color: rgb(218, 179, 255); border-radius: 10px;">${otp}</span>
            as your verification code.</p>
        <p>thanks from, ${process.env.GMAIL_ID}</p>
    </div>`
        user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            otp: otp,
            otpExpired: Date.now() + 15 * 60 * 1000
        })
        const response = await sendEmail({ toemail: email, html: html, subject: "Verify Your Email." })

        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Problem to send otp on your Email."
            })
        }
        return res.status(201).json({
            success: true,
            message: 'Verify Your Email.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials."
            })
        }
        const token = jwt.sign({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }, process.env.JWT_SECRET, { expiresIn: "10d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = req.user;
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({
            success: true,
            message: `${user.name} Loggedout Successfully.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success: true,
            message: 'User Fetched Successfully.',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const user = await userModel.findOne({ email });
        if (!otp) {
            return res.status(401).json({
                success: false,
                message: "Otp is Required."
            })
        }
        if (otp.length !== 6) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Valid Otp."
            })
        }
        if (user.otpExpired < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Otp is Expired."
            })
        }
        if (!user.otp) {
            return res.status(401).json({
                success: false,
                message: "You Are Already Verified."
            })
        }
        user.otp = "";
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Please do Login First.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Can't find your account."
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const html = `<div>
        <h1 style="font-family: sans-serif; color: rgb(100, 34, 161); font-size: x-large; text-align: center;">Welcome,
            ${user.name}</h1>
        <h3 style="font-family: sans-serif;">Verify Your Email:</h3>
        <p style="font-family: sans-serif;">Use: <span
                style="padding: 5px 15px; border: 3px solid blueviolet; background-color: rgb(100, 34, 161); color: rgb(218, 179, 255); border-radius: 10px;">${otp}</span>
            as your verification code.</p>
        <p>thanks from, ${process.env.GMAIL_ID}</p>
    </div>`
        user.otp = otp;
        user.otpExpired = Date.now() + 15 * 60 * 1000;
        user.isVerified = false;
        await user.save();
        const response = await sendEmail({ toemail: user.email, html, subject: "Verify your Email." })
        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Problem to send otp on your Email."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Otp Send to Your Email."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}
module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    verifyEmail,
    resendOtp
}