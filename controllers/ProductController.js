const ProductService = require("../services/ProductService");
const UserService = require("../services/UserService");

// findAll products
exports.findAllProducts = async (req, res) => {
  try {
    const products = await ProductService.findAll();
    return res.status(200).json({
      success: true,
      data: {
        total: products.length,
        products
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err
    });
  }
};

// get a single product
exports.findOneProduct = async (req, res) => {
  try {
    const product = await ProductService.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({
        success: false,
        status: 404,
        message: "Product not available"
      });
    }
    return res.status(200).json({ success: true, data: { product } });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: `Server Error: ${err}` });
  }
};

// add a product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    if (!name || !price || !quantity || !description) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Product data can not be empty"
      });
    }
    if (!req.file) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Product image is required"
      });
    }
    const url = `${process.env.APP_URL}/${req.file.path}`;
    const productData = {
      ...req.body,
      image: url,
      creator: req.user.id
    };
    const product = await ProductService.create(productData);

    return res.status(201).json({
      success: true,
      data: {
        product
      }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: `Server Error: ${err}` });
  }
};

// update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = JSON.parse(
      JSON.stringify(
        await UserService.findOne({ _id: req.user.id }, "password")
      )
    );
    const product = await ProductService.findOne({ _id: id });
    if (!product) {
      return res.status(400).json({
        success: false,
        status: 404,
        message: "Product does not exist"
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "You are not authorized for this action"
      });
    }
    const productData = { ...req.body };
    if (req.file) {
      const url = `${process.env.APP_URL}/${req.file.path}`;
      productData.image = url;
    }

    const updatedProduct = await ProductService.update(
      { _id: id },
      productData
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: {
        product: updatedProduct
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: `Server Error: ${error}` });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = JSON.parse(
      JSON.stringify(
        await UserService.findOne({ _id: req.user.id }, "password")
      )
    );
    const product = await ProductService.findOne({ _id: id });
    if (!product) {
      return res.status(400).json({
        success: false,
        status: 404,
        message: "Product does not exist"
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "You are not authorized for this action"
      });
    }
    await ProductService.delete({ id });
    return res.status(200).json({
      success: true,
      message: "Product Deleted"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: `Server Error: ${error}` });
  }
};
