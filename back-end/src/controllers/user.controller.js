const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, result } = await userService.login(email, password);
  return res.status(statusCode).json(result);
};

const insertUser = async (req, res) => {
  const { statusCode, result } = await userService.insertUser({ ...req.body });
  return res.status(statusCode).json(result);
};

const insertUserByAdmin = async (req, res) => {
  const { authorization } = req.headers;
  const { statusCode, result } = await userService
    .insertUserByAdmin({ ...req.body }, authorization);
  return res.status(statusCode).json(result);
};

const getAllSellers = async (_req, res) => {
  const { statusCode, result } = await userService.getAllSellers();
  return res.status(statusCode).json(result);
};

const getAllSellersAndCustomers = async (_req, res) => {
  const { statusCode, result } = await userService.getAllSellersAndCustomers();
  return res.status(statusCode).json(result);
};

const removeUser = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { statusCode } = await userService.removeUser(id, authorization);
  return res.status(statusCode).end();
};

module.exports = {
  login,
  insertUser,
  getAllSellers,
  insertUserByAdmin,
  getAllSellersAndCustomers,
  removeUser,
};
