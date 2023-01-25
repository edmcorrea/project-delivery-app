const Sequelize = require('sequelize');
const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return { statusCode: 200, result: products };
};

const checkProducts = async (products) => {
  const productIds = products.map(({ id }) => id);
  const { count } = await Product.findAndCountAll({
    where: { id: { [Sequelize.Op.or]: productIds } },
  });

  if (count !== productIds.length) {
    const err = new Error('One or more product ids are invalid');
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getAllProducts,
  checkProducts,
};
