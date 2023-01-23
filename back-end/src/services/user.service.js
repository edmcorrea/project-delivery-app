const { User } = require('../database/models');
const jwtUtil = require('../utils/jwt.util');
const checkPassword = require('./validations/checkPassword');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
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
  return { statusCode: 200, result: { token } };
};

module.exports = {
  login,
};
