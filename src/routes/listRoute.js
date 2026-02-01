const express = require('express');
const { createList } = require('../controller/listController');
const { isLoggedIn } = require('../validation/authValidator');

const listRouter = express.Router();

listRouter.post('/boards/:id/list',isLoggedIn ,createList);

module.exports = listRouter