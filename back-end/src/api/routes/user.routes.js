const express = require('express');

const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/', userController.insertUser);
router.get('/sellers', userController.getAllSellers);

module.exports = router;
