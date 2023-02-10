require('dotenv').config();

// const environment = process.env.NODEENV || "test";

// const suffix = {
//   prod: "",
//   production: "",
//   dev: "-dev",
//   development: "-dev",
//   test: "-test",
// };

const options = {
  host: process.env.HOSTNAME || process.env.MYSQLHOST || 'localhost',
  port: process.env.MYSQLPORT || '3306',
  database: process.env.MYSQL_DB_NAME || process.env.MYSQLDATABASE,
    // database: 
    // `${process.env.MYSQLDBNAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
