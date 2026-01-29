const { createBoardService, getBoardService, getAllBoardService, archiveBoardService, renameBoardService } = require("../service/boardService");

async function createBoard(req, res) {
  const boardName = req.body.boardName;
  const userID = req.user._id;
  try {
    //create board service (call service layer)
    const board = await createBoardService(userID,boardName);
    res.status(200).json({
      success: true,
      message: "Board created successfully",
      data: board

    });
  } 
  catch (error) {
    console.error("Creation Error: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function getBoardController(req, res) {
  const boardId = req.params.id;
  const userID = req.user._id;
  try {
    //create board service (call service layer)
    const board = await getBoardService(boardId, userID);
    res.status(200).json({
      success: true,
      message: "Board fetched successfully",
      data: board

    });
  } 
  catch (error) {
    console.error("Fetching Error: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function getAllBoardController(req, res) {
  const userID = req.user._id;
  try {
    const board = await getAllBoardService(userID);
    res.status(200).json({
      success: true,
      message: "All boards fetched successfully",
      data: board

    });
  } 
  catch (error) {
    console.error("Fetching Error: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function archiveBoard(req, res) {
  const userID = req.user._id;
  const boardId = req.params.id
  try {
    const board = await archiveBoardService(boardId, userID);
    res.status(200).json({
      success: true,
      message: "Board deleted successfully",
      data: board
    });
  } 
  catch (error) {
    console.error("Fetching Error: ", error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}
async function renameBoard(req, res) {
  const userID = req.user._id;
  const boardId = req.params.id
  const name = req.body.name

  if (!name || name.trim() === "") {
  return res.status(400).json({ message: "Board name is required" });
}
  try {
    const board = await renameBoardService(boardId, userID, name);
    res.status(200).json({
      success: true,
      message: "Name updated",
      data: board

    });
  } 
  catch (error) {
    console.error("Fetching Error: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {createBoard, getAllBoardController, getBoardController, archiveBoard, renameBoard}