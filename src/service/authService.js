const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const { findUser } = require('../repository/userRepo');
const { JWT_SECRET } = require('../config/serverConfig');

async function loginUser(userDetails) {
    console.log("in login service");
    
    try {
        const user = await findUser({
            email: userDetails.email
        })
        console.log(user);
        
        if (!user) throw new Error("we can't find this email please sign-up");
        const plainPwd = userDetails.password;
        const isMatch = await bcrypt.compare(plainPwd, user.password);
        if (!isMatch) throw new Error("Incorrect password");

        const payload = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d'
        })

        return { token, email: user.email }



    } catch (error) {
        console.log("Error at auth service layer: " + error.message);
        throw err;
    }
}
module.exports = loginUser  