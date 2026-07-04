const jwt = require("jsonwebtoken");
const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(500).json({
                success: false,
                message: "Your Session was Expired Please Login Again."
            })
        }
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error."
        })
    }
}

module.exports = userAuthMiddleware;