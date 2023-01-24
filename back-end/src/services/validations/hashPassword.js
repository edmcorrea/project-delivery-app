const crypto = require('crypto');

const creteHashPassword = (rawPassword) => {
  const hashedRawPassword = crypto.createHash('md5').update(rawPassword).digest('hex');
  return hashedRawPassword;
}

const checkPassword = (hashPassword, rawPassword) => {
  const hashedRawPassword = creteHashPassword(rawPassword);
  return hashedRawPassword === hashPassword;
};

module.exports = {
  creteHashPassword,
  checkPassword,
}