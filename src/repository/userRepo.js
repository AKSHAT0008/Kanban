const User = require("../schema/userSchema");

async function findUser(parameters){
    try {
        const response = await User.findOne({...parameters});
        return response;
    } catch (error) {
        console.log(error.message);
        
    }
}

async function createUser(userDetails){
    try {
        const newUser = await User.create(userDetails);
        return newUser;
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports = {
     createUser, findUser
}