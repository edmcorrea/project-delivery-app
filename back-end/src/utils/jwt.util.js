const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_KEY_PATH = path.resolve(__dirname, '../../jwt.evaluation.key');
const jwtSecret = fs.readFileSync(JWT_KEY_PATH, 'utf-8');

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, jwtSecret, jwtConfig);

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, jwtSecret);
    return data;
  } catch (_e) {
    const err = new Error('Expired or invalid token');
    err.statusCode = 401;
    throw err;
  }
};

module.exports = {
  createToken,
  validateToken,
};
