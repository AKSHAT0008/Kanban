const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    console.log(req);
    const token = req.cookies?.authToken;
    
    
    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth Token found"
        });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET); //if verified sends payload(data)
        if (!verified) {
            return res.status(401).json({
                success: false,
                data: {},
                error: "Not authenticated",
                message: "Auth Token Tamperd"
            });
        }

        //if reached here hence valid token
        req.user = {
            email: verified.email,
            // password: verified.password,
            _id: verified.id,
            role: verified.role
        };
        // console.log(user);
        
        // console.log(next);
        next()
        // calling next middle ware

    } catch (err) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Invalid or expired token",
            message: err.message || "Token verification failed"
        });
    }
}

module.exports = {isLoggedIn};