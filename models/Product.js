const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"]
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
      default: 1
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"]
    },
    image: {
      type: String
    },
    description: {
      type: String,
      required: [true, "Product description is required"]
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
