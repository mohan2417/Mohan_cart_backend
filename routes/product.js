const express = require('express');
 // automatically impported
 // use express for backend 
 // router for routing so we should get it rom exppress
const { getProducts, getSingleProducts } = require('../controllers/proController');
const router = express.Router();
router.route('/product').get(getProducts);
router.route('/product/:id').get(getSingleProducts);

module.exports = router;