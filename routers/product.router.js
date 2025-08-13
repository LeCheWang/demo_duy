const express = require('express');
const router = express.Router();

const {
  creaeteProduct,
  getProducts,
} = require('../controllers/product.controller');

router.route('/').post(creaeteProduct).get(getProducts);

//..update delete

module.exports = router;
