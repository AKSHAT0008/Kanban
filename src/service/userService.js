const { createUser, findUser } = require("../repository/userRepo");

async function registerUser(userDetails) {
    //check if user already exist by checking only primary keys like email and mob num
    //if so throw error
    //else create a user by passing details to repo
    const user = await findUser({
        email: userDetails.email,

    });

    if (user) throw {
        reason: "Email already in use",
        statusCode: 400
    }

    const newUser = await createUser({
        email: userDetails.email,
        lastName: userDetails.lastName,
        firstName: userDetails.firstName,
        password: userDetails.password,
    })

    if (!newUser) throw {
        reason: "server issue",
        statusCode: 500
    }

    return newUser

}

module.exports = {
    registerUser
}