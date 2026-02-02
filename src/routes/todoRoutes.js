const express = require('express');
const { createTodoController, getTodosByList } = require('../controller/todoController');
const { isLoggedIn } = require('../validation/authValidator');

const todoRouter = express.Router();

todoRouter.post('/lists/:listId/todo',isLoggedIn, createTodoController);
todoRouter.get('/lists/:listId/todo',isLoggedIn, getTodosByList);
module.exports = {todoRouter}