const express = require('express');
const { createList, getListByBoard } = require('../controller/listController');
const { isLoggedIn } = require('../validation/authValidator');

const listRouter = express.Router();

listRouter.post('/boards/:id/list',isLoggedIn ,createList);
listRouter.get('/boards/:id/list',isLoggedIn ,getListByBoard);

module.exports = listRouter