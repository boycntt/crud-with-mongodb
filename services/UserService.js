const UserModel = require("../models/User");

exports.createUser = async (user) => {
  return await UserModel.create(user);
};

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, newUser) => {
  return await UserModel.findByIdAndUpdate(id, newUser, { new: true });
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
