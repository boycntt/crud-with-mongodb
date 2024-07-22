const CustomerModel = require("../models/Customer");

exports.createCustomer = async (Customer) => {
  return await CustomerModel.create(Customer);
};

exports.getAllCustomers = async (fobj) => {
  return await CustomerModel.find(fobj);
};

exports.getCustomerById = async (id) => {
  return await CustomerModel.findById(id);
};

exports.updateCustomer = async (id, Customer) => {
  return await CustomerModel.findByIdAndUpdate(id, Customer);
};

exports.deleteCustomer = async (id) => {
  return await CustomerModel.findByIdAndDelete(id);
};
