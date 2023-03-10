const express = require('express');

const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/', userController.insertUser);
router.post('/admin', userController.insertUserByAdmin);
router.get('/', userController.getAllSellersAndCustomers);
router.get('/sellers', userController.getAllSellers);
router.delete('/:id', userController.removeUser);

module.exports = router;
