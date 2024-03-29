require('dotenv').config();
const Sequelize = require('sequelize');
const { Sale, SaleProduct, Product } = require('../database/models');
const { checkProducts } = require('./product.service');
const { validateTokenId, getSellerNameById } = require('./user.service');
const { validateSaleData } = require('./validations/sale.validation');

const managedInsert = async (saleDataToInsert, products) => {
  const sale = await Sale.create(saleDataToInsert);
  
  const saleProductList = products.map((product) => ({
    saleId: sale.id, productId: product.id, quantity: product.quantity,
  }));
  await SaleProduct.bulkCreate(saleProductList);

  return { statusCode: 201, result: { id: sale.id } };
};

const insertSale = async (token, saleData) => {
  const validSaleData = validateSaleData(saleData);
  await checkProducts(validSaleData.products);

  const userId = await validateTokenId(token);
  const saleDataToInsert = {
    userId,
    sellerId: validSaleData.sellerId,
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
  await validateTokenId(token);

  const sale = await Sale.findByPk(saleId, { include: { 
    model: Product, as: 'products', attributes: { exclude: ['urlImage'] },
  } });
  checkIfSaleExist(sale);

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
