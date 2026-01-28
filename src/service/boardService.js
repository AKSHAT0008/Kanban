const { createBoardRepo } = require("../repository/boardRepo");

async function createBoardService(userId, boardName){
    //just need to call repo layer
    const board = await createBoardRepo(userId,boardName);
    return board;
}

module.exports = {createBoardService};