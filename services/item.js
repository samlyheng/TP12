const Items = require("../models/items");

const findById = async (id) => {
  const result = await Items.findById(id);
  try {
    return {
      success: true,
      data: result
    };
  } catch (err) {
    return {
      success: false,
      error: err || 'error'
    }
  }
}


const findAll = async () => {
  return await Items.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items"
      }
    },])
}

const create = async (newItem) => {
  // to do
  const createdItem = await Items.create(newItem);
  return createdItem;
}

const update = async (req,res) => {
  // to do

  const {id,name,desc, imageUrl} = req.body;
//console.log(id)
  try {
    const doc = await Items.findById(id);
    //update data
    doc.name = name;
    doc.desc = desc;
    doc.imageUrl = imageUrl;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

const remove = async (res,req) => {
  // to do
  const { id } = req.params;
console.log(id)
  try {
    const deleting = await Items.deleteOne({ _id: id });
    console.log("deleting", deleting);
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
}