const saleService = require('../services/sale.service');

const checkAuth = (authorization) => {
  if (!authorization) {
    const err = new Error('Token is required');
    err.statusCode = 401;
    throw err;
  }
};

const insertSale = async (req, res) => {
    const { authorization } = req.headers;
    checkAuth(authorization);

    const { statusCode, result } = await saleService.insertSale(authorization, { ...req.body });
    return res.status(statusCode).json(result);
};

const getSalesByUserId = async (req, res) => {
  const { authorization } = req.headers;
  checkAuth(authorization);

  const { statusCode, result } = await saleService.getSalesByUserId(authorization);
  return res.status(statusCode).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  checkAuth(authorization);

  const { statusCode, result } = await saleService.getSaleById(id, authorization);
  return res.status(statusCode).json(result);
};

module.exports = {
  insertSale,
  getSalesByUserId,
  getSaleById,
};
