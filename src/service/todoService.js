const { getBoard } = require("../repository/boardRepo");
const { getListByBoard, getListById } = require("../repository/listRepo");
const { createTodoRepo, lastOrderkey, getTodosByList } = require("../repository/todoRepo");

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
    if(!list){
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

module.exports = { createTodoService, getTodosByListService }