const Sequelize = require('sequelize');
const { User } = require('../database/models');
const jwtUtil = require('../utils/jwt.util');
const { checkPassword, creteHashPassword } = require('./validations/hashPassword');
const { validateUserData } = require('./validations/user.validation');

const getByEmail = async (email) => User.findOne({ where: { email } });

const getSellerNameById = async (id) => {
  const user = await User.findByPk(id);
  return user.name;
};

const validateTokenId = async (token) => {
  const { userId } = jwtUtil.validateToken(token);
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    const err = new Error('Expired or invalid token');
    err.statusCode = 401;
    throw err;
  }
  return user.id;
};

const validateAdminTokenId = async (token) => {
  const { userId } = jwtUtil.validateToken(token);
  const user = await User.findOne({ where: { id: userId } });
  if (!user || user.role !== 'administrator') {
    const err = new Error('Expired or invalid token');
    err.statusCode = 401;
    throw err;
  }
};

const setToken = (userId, userEmail) => {
  const tokenData = { userId, userEmail };
  const token = jwtUtil.createToken(tokenData);
  return token;
};

const login = async (email, password) => {
  const user = await getByEmail(email);
  if (!user || !checkPassword(user.password, password)) {
    const err = new Error('Invalid login');
    err.statusCode = 404;
    throw err;
  }

  const token = setToken(user.id, user.email);
  const result = { 
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
  return { statusCode: 200, result };
};

const checkExistentUser = async (email) => {
  const user = await getByEmail(email);
  if (user) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }
};

const insertUser = async (newUserData) => {
  const { name, email, password } = validateUserData(newUserData);
  await checkExistentUser(email);

  const hashedPassword = creteHashPassword(password);
  const createdUser = await User.create({ name, email, password: hashedPassword });
  const token = setToken(createdUser.id, createdUser.email);
  const result = {
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
    token,
  };
  return { statusCode: 201, result };
};

const insertUserByAdmin = async (newUserData, adminToken) => {
  await validateAdminTokenId(adminToken);
  const { name, email, password, role } = validateUserData(newUserData);
  await checkExistentUser(email);

  const hashedPassword = creteHashPassword(password);
  const createdUser = await User.create({ name, email, password: hashedPassword, role });
  const token = setToken(createdUser.id, createdUser.email);
  const result = {
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
    token,
  };
  return { statusCode: 201, result };
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password', 'role'] },
  });
  return { statusCode: 200, result: sellers };
};

const getAllSellersAndCustomers = async () => {
  const users = await User.findAll({ 
    where: { [Sequelize.Op.or]: [
      { role: 'customer' },
      { role: 'seller' },
    ] },
    attributes: { exclude: ['password'] },
  });
  return { statusCode: 200, result: users };
};

const removeUser = async (userId, token) => {
  await validateAdminTokenId(token);
  const user = await User.findByPk(userId);
  if (!user) {
    const err = new Error('User does not exist');
    err.statusCode = 404;
    throw err;
  }
  
  await User.destroy({ where: { id: userId } });
  return { statusCode: 204 };
};

module.exports = {
  login,
  insertUser,
  validateTokenId,
  getSellerNameById,
  getAllSellers,
  insertUserByAdmin,
  getAllSellersAndCustomers,
  removeUser,
};
