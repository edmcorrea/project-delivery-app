const express = require('express');

const saleController = require('../../controllers/sale.controller');

const router = express.Router();

router.post('/', saleController.createSale);
router.get('/', saleController.getSallesByUserId);

module.exports = router;
