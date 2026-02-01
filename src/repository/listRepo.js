const { default: mongoose } = require("mongoose");
const List = require("../schema/listSchema");

async function createListRepo(boardId, listName, prevOrderKey) {
  console.log("At repo" + boardId);

  const list = new List({
    boardID: boardId,
    name: listName,
    orderKey: prevOrderKey + 1
  })
  await list.save();
  console.log("At repo" + boardId);
  return list;
}

async function lastOrderkey(boardId) {
  const result = await List.aggregate([
    { $match: { boardID: new mongoose.Types.ObjectId(boardId) } },
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

async function getListByBoard(boardID) {
   const responce = await List.find({
        isArchived: false,
        boardID
    }).sort({ orderKey: 1 })
    return responce;
}

module.exports = { createListRepo, lastOrderkey, getListByBoard }