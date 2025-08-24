const AccountModel = require('../models/account.model');

module.exports = {
    getAllAccounts: async (req, res) => {
        const account = await AccountModel.find();

        return res.status(200).json(account);
    },
}