require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { Sale, SaleProduct, Product } = require('../database/models');
const { checkProducts } = require('./product.service');
const { validateTokenId, getSellerIdByName, getSellerNameById } = require('./user.service');
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

const getSallesByUserId = async (token) => {
  const userId = await validateTokenId(token);
  const sales = await Sale.findAll({ where: { userId } });
  return { statusCode: 200, result: sales };
};

const validateUserSale = async (token, saleData) => {
  const userId = await validateTokenId(token);
  if (userId !== saleData.userId) {
    const err = new Error('This sale does not belog to the current user');
    err.statusCode = 401;
    throw err;
  }
};

const formatSaleData = async (saleData) => {
  const sellerName = await getSellerNameById(saleData.sellerId);
  const formatedProducts = saleData.products.map((product) => ({ 
    id: product.id,
    name: product.name, 
    price: product.price,
    quantity: product.SaleProduct.quantity,
  }));

  const formatedSale = { 
    id: saleData.id,
    sellerName,
    totalPrice: saleData.totalPrice,
    saleDate: saleData.saleDate,
    status: saleData.status,
    products: formatedProducts,
  };
  return formatedSale;
};

const getSaleById = async (saleId, token) => {
  const sale = await Sale.findByPk(saleId, { include: { 
    model: Product, as: 'products', attributes: { exclude: ['urlImage'] },
  } });
  if (!sale) {
    const err = new Error('Sale not found');
    err.statusCode = 404;
    throw err;
  }
  await validateUserSale(token, sale);

  const formatedSale = await formatSaleData(sale);
  return { statusCode: 200, result: formatedSale };
};

module.exports = {
  insertSale,
  getSallesByUserId,
  getSaleById,
};
