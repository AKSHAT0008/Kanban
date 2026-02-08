const { default: mongoose } = require("mongoose");
const Todo = require("../schema/todoSchema");
const List = require("../schema/listSchema");

async function createTodoRepo(listID, todoTitle, description, prevOrderKey) {
  //   console.log("At repo" + boardId);

  const todo = new Todo({
    listID,
    todoTitle,
    description,
    orderKey: prevOrderKey + 1
  })
  await todo.save();
  //   console.log("At repo" + boardId);
  return todo;
}

async function lastOrderkey(listID) {
  const result = await Todo.aggregate([
    { $match: { listID: new mongoose.Types.ObjectId(listID) } },
    {
      $group: {
        _id: null,
        maxKey: { $max: "$orderKey" }
      }
    }
  ])
  console.log(result[0]?.maxKey);

  return result[0]?.maxKey ?? 0;
}

async function getTodosByList(listID) {
  const responce = await Todo.find({
    isArchived: false,
    listID
  }).sort({ orderKey: 1 })
  console.log("At repo" + responce);

  return responce;
}
// console.log(getTodosByList('697f087733fdd2b1c7955f33'))
async function moveTodo(todoID, updateFields) {
  const listID = updateFields.listID;
  const orderKey = updateFields.orderKey;
  const responce = Todo.updateOne(
    {
      _id: todoID
    },
    {
      $set: { listID, orderKey }
    }
  )
  return responce;
}
async function getTodoById(todoID) {
  const responce = await Todo.findOne(
    {
      _id: todoID,
      isArchived: false
    }
  )
  return responce;
}
async function archiveTodo(id) {
    const responce = await Todo.updateOne({
        _id: id,
        isArchived: false
    },
        { $set: { isArchived: true } })
    if (responce.matchedCount === 0) {
        const error = new Error("Todo not found or already archived");
        error.statusCode = 409; // default
        throw error;
    }
    return responce;
}
module.exports = { createTodoRepo, lastOrderkey, getTodosByList, moveTodo, getTodoById, archiveTodo }