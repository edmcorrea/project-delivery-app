const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_KEY_PATH = path.resolve(__dirname, '../../jwt.evaluation.key');
const jwtSecret = fs.readFileSync(JWT_KEY_PATH, 'utf-8');

const jwtConfig = {
  expiresIn: '120d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, jwtSecret, jwtConfig);

const checkAuth = (authorization) => {
  if (!authorization) {
    const err = new Error('Token is required');
    err.statusCode = 401;
    throw err;
  }
};

const validateToken = (token) => {
  checkAuth(token);
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
