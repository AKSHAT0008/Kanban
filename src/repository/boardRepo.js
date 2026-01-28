const Board = require("../schema/boardSchema");

async function createBoardRepo(userId,boardName){
    const board = new Board({
        ownerId: userId,
        name:boardName,
    })
    await board.save();
    return board;
}
module.exports = {createBoardRepo} 