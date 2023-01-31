const Joi = require('joi');

const productsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleSchema = Joi.object({
  sellerId: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().precision(2).min(0).required(),
  deliveryAddress: Joi.string().max(100).required(),
  deliveryNumber: Joi.string().max(50).required(),
  products: Joi.array().min(1).items(productsSchema).required(),
});

const validateSaleData = (newSale) => {
  const { error, value } = saleSchema.validate(newSale);
  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  return value;
};

module.exports = {
  validateSaleData,
};
