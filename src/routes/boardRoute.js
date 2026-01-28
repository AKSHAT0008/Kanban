const express = require('express');
const { createBoard } = require('../controller/boardController');
const { isLoggedIn } = require('../validation/authValidator');

const Boardrouter = express.Router();

// GET all boards
// Boardrouter.get('/', );

// GET single board by ID
// Boardrouter.get('/:id', (req, res) => {
//     res.json({ message: `Get board ${req.params.id}` });
// });

// POST create new board
Boardrouter.post('/create-board',isLoggedIn ,createBoard);

// PUT update board
// Boardrouter.put('/:id', (req, res) => {
//     res.json({ message: `Update board ${req.params.id}` });
// });

module.exports = Boardrouter;  