const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(12).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(32).required(),
  role: Joi.string().max(20).valid('customer', 'seller', 'administrator'),
});

const validateUserData = (newUser) => {
  const { error, value } = userSchema.validate(newUser);
  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  return value;
};

module.exports = {
  validateUserData,
};
