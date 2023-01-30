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
  console.log('managerInsert');
  try {
    const id = await sequelize.transaction(async (transaction) => {
      const sale = await Sale.create(saleDataToInsert, { transaction });
      const saleProductList = products.map((product) => ({
        saleId: sale.id, productId: product.id, quantity: product.quantity,
      }));
      await SaleProduct.bulkCreate(saleProductList, { transaction });
      return sale.id;
    });
    console.log('id', id);
    return { statusCode: 201, result: { id } };
  } catch (err) {
    console.log('n entrei');
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

const getSalesByUserOrSellerId = async (token) => {
  const personId = await validateTokenId(token);
  const sales = await Sale.findAll({ where: { [Sequelize.Op.or]: [
    { userId: personId },
    { sellerId: personId }, 
  ] } });
  return { statusCode: 200, result: sales };
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

const checkIfSaleExist = (sale) => {
  if (!sale) {
    const err = new Error('Sale not found');
    err.statusCode = 404;
    throw err;
  }
};

const getSaleById = async (saleId, token) => {
  const sale = await Sale.findByPk(saleId, { include: { 
    model: Product, as: 'products', attributes: { exclude: ['urlImage'] },
  } });
  checkIfSaleExist(sale);

  await validateTokenId(token);

  const formatedSale = await formatSaleData(sale);
  return { statusCode: 200, result: formatedSale };
};

const setNewStatusBySeller = (currStatus) => {
  if (currStatus === 'Pendente') return 'Preparando';
  if (currStatus === 'Preparando') return 'Em Trânsito';

  const err = new Error('Unauthorized operation');
  err.statusCode = 401;
  throw err;
};

const setNewStatus = (currSale, personId) => {
  if (personId === currSale.sellerId) {
    return setNewStatusBySeller(currSale.status);
  }
  if (personId === currSale.userId && currSale.status === 'Em Trânsito') return 'Entregue';

  const err = new Error('Unauthorized operation');
  err.statusCode = 401;
  throw err;
};

const updateSaleStatus = async (saleId, token) => {
  const personId = await validateTokenId(token);
  const currSale = await Sale.findByPk(saleId);
  checkIfSaleExist(currSale);

  const newStatus = setNewStatus(currSale, personId);
  await Sale.update(
    { status: newStatus },
    { where: { id: saleId } },
  );

  const updatedSale = await Sale.findByPk(saleId, { attributes: ['id', 'status'] });
  return { statusCode: 200, result: updatedSale };
};

module.exports = {
  insertSale,
  getSalesByUserOrSellerId,
  getSaleById,
  updateSaleStatus,
};
