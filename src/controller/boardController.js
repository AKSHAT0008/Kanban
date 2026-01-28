const { createBoardService } = require("../service/boardService");
// console.log("controler");
async function createBoard(req, res) {
  // req.user = { _id: '6978a12b6924207089d98c82' };
  const boardName = req.body.boardName;
  const userID = req.user._id;
  // console.log("controler");
  
  // console.log(boardName);
  // console.log(req.body);
  
  
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
module.exports = {createBoard}