const saleService = require('../services/sale.service');

const insertSale = async (req, res) => {
    const { authorization } = req.headers;
    const { statusCode, result } = await saleService.insertSale(authorization, { ...req.body });
    return res.status(statusCode).json(result);
};

const getSalesByUserId = async (req, res) => {
  const { authorization } = req.headers;
  const { statusCode, result } = await saleService.getSalesByUserOrSellerId(authorization);
  return res.status(statusCode).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { statusCode, result } = await saleService.getSaleById(id, authorization);
  return res.status(statusCode).json(result);
};

const updateSaleStatus = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { statusCode, result } = await saleService.updateSaleStatus(id, authorization);
  return res.status(statusCode).json(result);
};

module.exports = {
  insertSale,
  getSalesByUserId,
  getSaleById,
  updateSaleStatus,
};
