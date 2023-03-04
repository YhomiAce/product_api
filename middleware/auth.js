/* eslint-disable consistent-return */
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).send({
      success: false,
      status: 401,
      message: "Unauthorised"
    });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      status: 401,
      message: "Unauthorised"
    });
  }
};
