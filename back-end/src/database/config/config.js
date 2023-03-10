require('dotenv').config();

const environment = process.env.NODEENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.MYSQLHOST ,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
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

// host: process.env.HOSTNAME || process.env.MYSQLHOST || 'localhost',
// port: process.env.MYSQLPORT || '3306',
// database: process.env.MYSQLDBNAME || process.env.MYSQLDATABASE,
//   // database: 
//   // `${process.env.MYSQLDBNAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
// username: process.env.MYSQLUSER || 'root',
// password: process.env.MYSQLPASSWORD || 'password',
// dialect: 'mysql',
// dialectOptions: {
//   timezone: 'Z',
// },
// logging: false,
