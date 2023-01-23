const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, result } = await userService.login(email, password);
  return res.status(statusCode).json(result);
};

module.exports = {
  login,
}
