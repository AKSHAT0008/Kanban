const loginUser = require("../service/authService");

async function login(req, res) {
    try {
      console.log("in login cont");
        const responce = req.body;
        const resp = await loginUser(responce);

        res.cookie("authToken", resp.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",   // allow frontend/backend on different ports
            maxAge: 7 * 24 * 60 * 60 * 1000
        }) // authToken is the name of the token

        
        res.status(200).json({
            message: "Successfully logged in",
            success: true,
            data: {
                email: resp.email,
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "failed to log-in",
            success: false,
            error: error.reason || error.message || "Something went wrong"
        })
    }

}
module.exports = { login }