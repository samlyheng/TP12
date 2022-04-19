const Prices = require("../models/prices");

const findById = async (id) => {
  const result = await Prices.findById(id);
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
  // to do
  return await Prices.find();

}

const create = async (newPrice) => {
  // to do
  const createdPrice = await Prices.create(newPrice);
  return createdPrice;
}

const update = async (req,res) => {
  // to do
  const { id, product, price, source } = req.body;
  
  // Prices.updateOne({ _id: id }, { prices: product, prices: prices, source: source })
  // return true

  try {
    const doc = await Prices.findById(id);
    //update data
    doc.product = product;
    doc.price = price;
    doc.source = source;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

const remove = async (req,res) => {

  // to do
   const { id } = req.params;

  try {
    const deleting = await Prices.deleteOne({ _id: id });
    console.log("deleting", deleting);
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

module.exports = {
  update,
  remove,
  findAll,
  create,findById
}