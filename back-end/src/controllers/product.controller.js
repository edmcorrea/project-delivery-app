const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const { statusCode, result } = await productService.getAllProducts();
  return res.status(statusCode).json(result);
};

module.exports = {
  getAllProducts,
};
