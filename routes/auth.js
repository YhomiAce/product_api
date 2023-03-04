const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/AuthController");
const Auth = require("../middleware/auth");

const {
  validate,
  registerValidation,
  loginValidation
} = require("../helpers/validators");

// @route  api/auth/register
// @method POST
// @access Public
// @desc register user
router
  .route("/auth/register")
  .post(registerValidation(), validate, AuthController.register);

// @route  api/auth/login
// @method POST
// @access Public
// @desc login user
router
  .route("/auth/login")
  .post(loginValidation(), validate, AuthController.login);

// @route  api/auth/me
// @method Get
// @access Private
// @desc get loggedIn user
router.route("/auth/me").get(Auth, AuthController.getLoggedInUser);

module.exports = router;
