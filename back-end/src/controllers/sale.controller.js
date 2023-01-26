const saleService = require('../services/sale.service');

const checkAuth = (authorization) => {
  if (!authorization) {
    const err = new Error('Token is required');
    err.statusCode = 401;
    throw err;
  }
};

const createSale = async (req, res) => {
    const { authorization } = req.headers;
    checkAuth(authorization);

    const { statusCode, result } = await saleService.insertSale(authorization, { ...req.body });
    return res.status(statusCode).json(result);
};

const getSallesByUserId = async (req, res) => {
  const { authorization } = req.headers;
  checkAuth(authorization);

  const { statusCode, result } = await saleService.getSallesByUserId(authorization);
  return res.status(statusCode).json(result);
};

const getSalleById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  checkAuth(authorization);

  const { statusCode, result } = await saleService.getSaleById(id, authorization);
  return res.status(statusCode).json(result);
};

module.exports = {
  createSale,
  getSallesByUserId,
  getSalleById,
};
