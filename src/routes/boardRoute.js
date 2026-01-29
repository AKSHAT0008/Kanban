const express = require('express');
const { createBoard, getBoardController, getAllBoardController, archiveBoard, renameBoard } = require('../controller/boardController');
const { isLoggedIn } = require('../validation/authValidator');

const Boardrouter = express.Router();

// POST create new board
Boardrouter.post('/boards/create',isLoggedIn ,createBoard);
Boardrouter.get('/boards/:id',isLoggedIn ,getBoardController);
Boardrouter.get('/boards',isLoggedIn ,getAllBoardController);
Boardrouter.patch('/boards/:id/archive',isLoggedIn,archiveBoard )
Boardrouter.patch('/boards/:id/rename',isLoggedIn,renameBoard)
module.exports = Boardrouter;  