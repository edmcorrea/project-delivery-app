require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { Sale, SaleProduct } = require('../database/models');
const { checkProducts } = require('./product.service');
const { validateTokenId, getSellerIdByName } = require('./user.service');
const { validateSaleData } = require('./validations/sale.validation');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const managedInsert = async (saleDataToInsert, products) => {
  try {
    const id = await sequelize.transaction(async (transaction) => {
      const sale = await Sale.create(saleDataToInsert, { transaction });
      const saleProductList = products.map((product) => ({
        saleId: sale.id, productId: product.id, quantity: product.quantity,
      }));
      await SaleProduct.bulkCreate(saleProductList, { transaction });
      return sale.id;
    });
    return { statusCode: 201, result: { id } };
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

const insertSale = async (token, saleData) => {
  const validSaleData = validateSaleData(saleData);
  await checkProducts(validSaleData.products);

  const userId = await validateTokenId(token);
  const sellerId = await getSellerIdByName(validSaleData.sellerName);

  const saleDataToInsert = {
    userId,
    sellerId,
    totalPrice: validSaleData.totalPrice,
    deliveryAddress: validSaleData.deliveryAddress,
    deliveryNumber: validSaleData.deliveryNumber,
  };
  return managedInsert(saleDataToInsert, validSaleData.products);
};

module.exports = {
  insertSale,
};
