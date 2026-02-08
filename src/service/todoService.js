const { getBoard } = require("../repository/boardRepo");
const { getListByBoard, getListById } = require("../repository/listRepo");
const { createTodoRepo, lastOrderkey, getTodosByList, getTodoById, moveTodo, archiveTodo } = require("../repository/todoRepo");

async function createTodoService(listID, todoName, description, userId) {
    // console.log("At service" + boardId);


    //checking if list exist?
    const list = await getListById(listID);
    console.log(list);


    if (!list) {
        throw new Error("List not found or not authorized");
    }

    //checking if board exist?
    const board = await getBoard(list.boardID, userId);
    console.log(board);

    if (!board) {
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }

    const orderKey = await lastOrderkey(listID);
    console.log(orderKey);

    const todo = await createTodoRepo(listID, todoName, description, orderKey);
    return todo;
}

async function getTodosByListService(listId, userId) {
    const list = await getListById(listId);
    console.log(list);

    //checking if list exist?
    if (!list) {
        const error = new Error("List not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }

    //checking if board exist?
    const board = await getBoard(list.boardID, userId);
    console.log(board);

    if (!board) {
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }

    const todos = await getTodosByList(listId);
    return todos
}

async function moveTodoService(todoID, userId, targetListId, targetOrderKey) {
    const todo = await getTodoById(todoID);
    // console.log(list);   
    //checking if todo exist?
    if (!todo) {
        const error = new Error("Todo not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }
    //checking if list of given Todo exist?
    const sourceList = await getListById(todo.listID);
    if (!sourceList) {
        const error = new Error("The list of Todo not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }
    //checking if board of given Todo exist?
    const sourceBoard = await getBoard(sourceList.boardID, userId);
    if (!sourceBoard) {
        const error = new Error("The board of Todo not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }


    const list = await getListById(targetListId);
    // console.log(list);

    //checking if list exist?
    if (!list) {
        const error = new Error("List not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }

    //checking if board exist?
    const board = await getBoard(list.boardID, userId);
    // console.log(board);

    if (!board) {
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }

    const maxOrderKey = await lastOrderkey(targetListId);
    const newOrderKey = Math.min(maxOrderKey + 1, targetOrderKey);

    const responce = await moveTodo(todoID, {
        listID: targetListId,
        orderKey: newOrderKey
    })
    return responce;
}

async function archiveTodoService(todoId, userId) {
    // 1. Fetch todo
    const todo = await getTodoById(todoId);
    if (!todo) {
        throwNotFound("Todo not found");
    }

    // 2. Fetch list
    const list = await getListById(todo.listID);
    if (!list) {
        throwNotFound("List not found");
    }

    // 3. Fetch board (authorization)
    const board = await getBoard(list.boardID, userId);
    if (!board) {
        throwNotFound("Board not found or not authorized");
    }
    const responce = await archiveTodo(id);
    return responce;
}

module.exports = { createTodoService, getTodosByListService, moveTodoService, archiveTodoService }