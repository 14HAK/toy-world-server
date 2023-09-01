const { getProducts, singleProduct, postProduct, getCartProduct, searchProduct, getMyToy } = require('../controller/controller');
const express = require('express');

const router = express.Router();

router.get('/products', getProducts);
router.get(`/products/:id`, singleProduct);
router.post('/cart', postProduct);
router.get('/cart', getCartProduct);
router.get('/search', searchProduct);
router.get('/my_toy', getMyToy);


module.exports = router;