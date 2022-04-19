
const Products = require("../models/products")
var mongoose = require('mongoose');

const findById = async (id) => {
   const result = await Products.findById(id);
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
  return await Products.find();

  return await Products.aggregate([
    // {
    //   $lookup: {
    //     from: "items",
    //     localField: "_id",
    //     foreignField: "category",
    //     as: "items"
    //   }
    // },
  ])
}

const create = async (newProduct) => {
  const createdProduct = await Products.create(newProduct);
  return createdProduct;
}


const update = async (req,res) => {
  // to do

  const {id,title, imageUrl, desc} = req.body;
//console.log(id)
// Products.updateOne({_id: 'dfgdg'}, {title: title, imageUrl: imageUrl})
//Products.findByIdAndUpdate(id,{title: title, imageUrl: imageUrl, desc:})
  try {
    const doc = await Products.findById(id);
    //update data
    doc.title = title;
    doc.desc = desc;
    doc.imageUrl = imageUrl;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

const remove = async (res,req) => {
    const { id } = req.params;
console.log(id)
  try {
    const deleting = await Products.deleteOne({ _id: id });
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
  create
}