const express = require('express');

const saleController = require('../../controllers/sale.controller');

const router = express.Router();

router.post('/', saleController.insertSale);
router.get('/', saleController.getSalesByUserId);
router.get('/:id', saleController.getSaleById);

module.exports = router;
