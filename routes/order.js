const express = require('express');
const { createOrder,getOrders } = require('../controllers/orderController');
const router = express.Router();
router.route('/order').post(createOrder);
router.route('/order/:id').get(getOrders);

module.exports = router;