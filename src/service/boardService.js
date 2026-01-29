const { createBoardRepo, getBoard, getAllBoard, archiveBoard, renameBoard } = require("../repository/boardRepo");

async function createBoardService(userId, boardName){
    //just need to call repo layer
    const board = await createBoardRepo(userId,boardName);
    return board;
}

async function getBoardService(id, userId){
    //just need to call repo layer
    const board = await getBoard(id, userId);
    return board;
}


async function getAllBoardService(userId){
    //just need to call repo layer
    const board = await getAllBoard(userId);
    return board;
}

async function archiveBoardService(id, userId){
    //just need to call repo layer
    const board = await archiveBoard(id, userId);
    return board;
}
async function renameBoardService(id, userId, name){
    //just need to call repo layer
    const board = await renameBoard(id, userId, name);
    return board;
}


module.exports = {createBoardService, getAllBoardService, getBoardService, archiveBoardService, renameBoardService
    
};