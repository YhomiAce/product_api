const User = require("../models/User");

exports.find = () => User.find();

exports.findOne = (options, select = null) =>
  User.findOne({ ...options }).select(`-${select}`);

exports.create = user => User.create({ ...user });
