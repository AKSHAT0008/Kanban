const { createListService, getListByBoardService } = require("../service/listService");

async function createList(req, res) {
  const listName = req.body.listName;
  const boardID = req.params.id;
  const userId = req.user._id;
  console.log("At controller " + boardID);
  
  try {
    //create board service (call service layer)
    const list = await createListService(boardID,listName, userId);
    res.status(201).json({
      success: true,
      message: "List created successfully",
      data: list

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
async function getListByBoard(req, res) {
  const boardID = req.params.id;
  const userId = req.user._id;
  console.log("At controller " + boardID);
  
  try {
    //create board service (call service layer)
    const list = await getListByBoardService(boardID, userId);
    res.status(200).json({
      success: true,
      message: "Lists fetched successfully",
      data: list

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

module.exports = {createList, getListByBoard};