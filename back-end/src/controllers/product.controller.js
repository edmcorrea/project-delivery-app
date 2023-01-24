const productService = require('../services/product.service');

const getAllProducts = async (req, res) => {
  const { statusCode, result } = await productService.getAllProducts();
  return res.status(statusCode).json(result);
};

module.exports = {
  getAllProducts,
};
