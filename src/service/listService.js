const { getBoard } = require("../repository/boardRepo");
const { createListRepo, lastOrderkey, getListByBoard } = require("../repository/listRepo");

async function createListService(boardId, listName, userId){
    console.log("At service" + boardId);
    
    //checking if board exist?
    const board = await getBoard(boardId, userId);
    console.log(board);
    
    if(!board){
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    } 
    const orderKey = await lastOrderkey(boardId);  
    console.log(orderKey);
       
    const list = await createListRepo(boardId,listName,orderKey);
    return list;
}


async function getListByBoardService(boardId, userId) {
    const board = await getBoard(boardId, userId);
    console.log(board);
    
    if(!board){
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    } 

    const lists = await getListByBoard(boardId);
    return lists
}
module.exports = {createListService, getListByBoardService}