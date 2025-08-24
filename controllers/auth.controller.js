const bcryptjs = require('bcryptjs');
const AccountModel = require('../models/account.model');
const { registerAccountValid } = require('../validations/account.valid');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({ username });

    if (!account) {
      // return res.status(401).json({
      //   statusCode: 401,
      //   message: 'Sai tài khoản hoặc mật khẩu',
      // });
      throw new ErrorResponse(401, 'Sai tài khoản hoặc mật khẩu');
    }

    const checkPassword = bcryptjs.compareSync(password, account.password);

    if (!checkPassword) {
      // return res.status(401).json({
      //   statusCode: 401,
      //   message: 'Sai tài khoản hoặc mật khẩu',
      // });
      throw new ErrorResponse(401, 'Sai tài khoản hoặc mật khẩu');
    }

    return res.status(200).json(account);
  },
  register: async (req, res) => {
    const body = req.body;

    const { error, value } = registerAccountValid(body);

    if (error) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: error.message,
      // });
      throw new ErrorResponse(400, error.message);
    }

    const newAccount = await AccountModel.create(value);

    return res.status(201).json(newAccount);
  },
};
