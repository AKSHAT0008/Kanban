const { createTodoService, getTodosByListService, moveTodoService } = require("../service/todoService");

async function createTodoController(req, res) {
  try {
    const todoTitle = req.body.title;
    const description = req.body.description;
    const listID = req.params.listId;
    // const boardId = req.params.boardId;
    const userId = req.user._id;
    //create board service (call service layer)
    // console.log(req);

    const todo = await createTodoService(listID, todoTitle, description, userId);
    res.status(201).json({
      success: true,
      message: "todo created successfully",
      data: todo

    });
  }
  catch (error) {
    console.error("Creation Error: ", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}
async function getTodosByList(req, res) {
  try {
    const listID = req.params.listId;
    const userId = req.user._id;
    console.log("At controller " + listID);
    //create board service (call service layer)
    const todos = await getTodosByListService(listID, userId);
    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos

    });
  }
  catch (error) {
    console.error("Fetching Error: ", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}

async function moveTodoController(req, res) {
  try {
    const todoID = req.params.todoId;
    const targetListId = req.body.targetListId;
    const targetOrderKey = req.body.targetOrderKey;
    const userId = req.user._id;

    const responce = await moveTodoService(todoID, userId, targetListId, targetOrderKey)
    res.status(200).json({
      success: true,
      message: "Todo moved successfully",
      data: responce
    });
  } catch (error) {
    console.error("Fetching Error: ", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { createTodoController, getTodosByList, moveTodoController }