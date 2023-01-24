const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return { statusCode: 200, result: products };
};

module.exports = {
  getAllProducts,
};
