const express = require('express');
const { login } = require('../controller/authController');
const authRoute = express.Router()

authRoute.post('/login', login);
// authRoute.post('/logout', logout);
module.exports = authRoute;