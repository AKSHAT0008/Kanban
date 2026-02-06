const express = require('express');
const { createTodoController, getTodosByList, moveTodoController } = require('../controller/todoController');
const { isLoggedIn } = require('../validation/authValidator');

const todoRouter = express.Router();

todoRouter.post('/lists/:listId/todo',isLoggedIn, createTodoController);
todoRouter.get('/lists/:listId/todo',isLoggedIn, getTodosByList);
todoRouter.patch('/todos/:todoId/move', isLoggedIn,moveTodoController )
module.exports = {todoRouter}