const express = require('express');
const router = express.Router();

const { getAllAccounts } = require('../controllers/account.controller');

router.get('/', getAllAccounts);

module.exports = router;
