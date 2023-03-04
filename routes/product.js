const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middleware/auth");
const upload = require("../helpers/upload");

// @desc get all products
// @routes GET /api/product
// @access public
router.route("/product").get(Auth, ProductController.findAllProducts);

// @desc get single product
// @routes GET /api/product/:id
// @access public
router.route("/product/:id").get(Auth, ProductController.findOneProduct);

// @desc add product
// @routes POST /api/product
// @param
/*
 name,price,quantity,image, description
*/
// @access public
router
  .route("/product/create")
  .post(Auth, upload.single("productImage"), ProductController.createProduct);

// @desc update products
// @routes PATCH /api/product/id
// @param
/*
 name,price,quantity,image, description
*/
// @access admin
router
  .route("/product/update/:id")
  .patch(Auth, upload.single("productImage"), ProductController.updateProduct);

// @desc delete product
// @desc DELETE /api/product/id
// @access admin
router
  .route("/product/delete/:id")
  .delete(Auth, ProductController.deleteProduct);

module.exports = router;
