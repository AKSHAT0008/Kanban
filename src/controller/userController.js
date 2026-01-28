const { registerUser } = require("../service/userService");


 
 
async function createUser(req, res){
    try {
        console.log("controller"); 
        const responce = await registerUser(req.body);
        console.log(req);
        
        return res.status(201).json({
            message: "Successfully registered",
            success: true,
            data: responce
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed to register",
            success: false,
            error: error.message
        })
    }
}

module.exports = createUser;