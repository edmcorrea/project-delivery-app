const saleService = require('../services/sale.service');

const createSale = async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      const err = new Error('Token is required');
      err.statusCode = 401;
      throw err;
    }
    const { statusCode, result } = await saleService.insertSale(authorization, { ...req.body });
    return res.status(statusCode).json(result);
};

module.exports = {
    createSale,
};
