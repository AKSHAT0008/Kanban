const { createListService } = require("../service/listService");

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

module.exports = {createList};