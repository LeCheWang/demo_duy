const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth.controller');
const asyncMiddleware = require('../middlewares/async.middleware');

router.post(
  '/login',
  (req, res, next) => {
    console.log('hello');

    next();
  },
  asyncMiddleware(login),
);
router.post('/register', asyncMiddleware(register));

module.exports = router;
