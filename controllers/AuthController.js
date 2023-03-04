/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findOne({ email });
    if (user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "This Email is already in Use for this user entity"
      });
    }

    const userData = {
      ...req.body,
      password: bcrypt.hashSync(password, 10)
    };

    await UserService.create(userData);

    return res.status(201).send({
      success: true,
      message: "User Created Successfully"
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = JSON.parse(
      JSON.stringify(await UserService.findOne({ email }))
    );

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Invalid User Details"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        status: 400,
        message: "Invalid User Details"
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 36000
    });

    return res.status(201).send({
      success: true,
      message: "User Logged In Sucessfully",
      data: {
        token,
        user
      }
    });
  } catch (error) {
    return next(error);
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = JSON.parse(
      JSON.stringify(await UserService.findOne({ id: req.user.id }, "password"))
    );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No User Found"
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error"
    });
  }
};
