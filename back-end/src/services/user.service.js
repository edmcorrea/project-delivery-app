const { User } = require('../database/models');
const jwtUtil = require('../utils/jwt.util');
const { checkPassword, creteHashPassword } = require('./validations/hashPassword');
const { validateUserData } = require('./validations/user.validation');

const getByEmail = async (email) => User.findOne({ where: { email } });

const login = async (email, password) => {
  const user = await getByEmail(email);
  if (!user || !checkPassword(user.password, password)) {
    const err = new Error('Invalid login');
    err.statusCode = 404;
    throw err;
  }

  const tokenData = {
    userId: user.id,
    userEmail: user.email,
  };
  const token = jwtUtil.createToken(tokenData);
  return { statusCode: 200, result: {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  } };
};

const insertUser = async (newUserData) => {
  const { name, email, password } = validateUserData(newUserData);

  const user = await getByEmail(email);
  if(user) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }

  const hasedPassword = creteHashPassword(password);
  const createdUser = await User.create({ name, email, password: hasedPassword });
  const tokenData = {
    userId: createdUser.id,
    userEmail: createdUser.email,
  };
  const token = jwtUtil.createToken(tokenData);
  return { statusCode: 201, result: {
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
    token,
  } };
}

module.exports = {
  login,
  insertUser,
};
