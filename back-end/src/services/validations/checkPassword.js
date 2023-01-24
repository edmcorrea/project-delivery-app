const crypto = require('crypto');

module.exports = (encodedPassword, decodedPassword) => {
  const hashedPassword = crypto.createHash('md5').update(decodedPassword).digest('hex');
  return encodedPassword === hashedPassword;
};
