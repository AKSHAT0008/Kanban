const Board = require("../schema/boardSchema");

async function createBoardRepo(userId, boardName) {
    const board = new Board({
        ownerId: userId,
        name: boardName,
    })
    await board.save();
    return board;
}


async function getBoard(id, userId) {
    const responce = await Board.findOne({
        _id: id,
        ownerId: userId,
        isArchived: false
    })
    return responce;
}

async function getAllBoard(userId) {
    const responce = await Board.find({
        isArchived: false,
        ownerId: userId
    })
    return responce;
}
async function archiveBoard(id, userId) {
    const responce = await Board.updateOne({
        _id: id,
        ownerId: userId,
        isArchived: false
    },
        { $set: { isArchived: true } })
    if (responce.matchedCount === 0) {
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }
    return responce;
}
async function renameBoard(id, userId, name) {
    const responce = await Board.updateOne({
        _id: id,
        ownerId: userId,
        isArchived: false
    },
        { $set: { name: name } })
    if (responce.matchedCount === 0) {
        const error = new Error("Board not found or not authorized");
        error.statusCode = 404; // default
        throw error;
    }
    return responce;
}
module.exports = { createBoardRepo, getBoard, getAllBoard, archiveBoard, renameBoard } 