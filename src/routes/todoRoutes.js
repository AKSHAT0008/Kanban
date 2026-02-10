const express = require('express');
const { createTodoController, getTodosByList, moveTodoController, archiveTodo, reorderTodoController, normalizeTodoController } = require('../controller/todoController');
const { isLoggedIn } = require('../validation/authValidator');

const todoRouter = express.Router();

todoRouter.post('/lists/:listId/todo',isLoggedIn, createTodoController);
todoRouter.get('/lists/:listId/todo',isLoggedIn, getTodosByList);
todoRouter.patch('/lists/:listId/normalize-order',isLoggedIn, normalizeTodoController);
todoRouter.patch('/todos/:todoId/move', isLoggedIn,moveTodoController);
todoRouter.patch('/todos/:todoId/reorder', isLoggedIn,reorderTodoController);
todoRouter.patch('/todos/:todoId/archive', isLoggedIn,archiveTodo )
module.exports = {todoRouter}