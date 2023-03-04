const Product = require("../models/Product");

exports.findAll = () => Product.find();

exports.findOne = options => Product.findOne({ ...options });

exports.create = product => Product.create({ ...product });

exports.delete = option => Product.deleteOne({ ...option });

exports.update = async (filter, data) => {
  const product = await Product.findOneAndUpdate(
    { ...filter },
    { $set: data },
    {
      new: true
    }
  ).exec();
  return product;
};
