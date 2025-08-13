const ProductModel = require('../models/product.model');
const { PER_PAGE } = require('../constants/common');
const { createProductValid } = require('../validations/product.valid');

module.exports = {
  creaeteProduct: async (req, res) => {
    const body = req.body;

    const { error, value } = createProductValid(body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }

    const product = await ProductModel.create(value);

    return res.status(201).json(product);
  },
  getProducts: async (req, res) => {
    const {
      name,
      fromPrice,
      toPrice,
      category_id,
      sort_name = 1,
      sort_price = 1,
      page = 1,
    } = req.query;

    const bodyQuery = {};

    if (name) {
      bodyQuery.$or = [
        {
          name: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      ];
    }

    if (fromPrice && toPrice) {
      bodyQuery.$and = [
        {
          price: {
            $gte: Number(fromPrice),
          },
        },
        {
          price: {
            $lte: +toPrice,
          },
        },
      ];
    }

    if (category_id) {
      bodyQuery.category_id = category_id;
    }

    const products = await ProductModel.find(bodyQuery)
      .sort({
        price: +sort_price,
        name: +sort_name,
      })
      .populate('category_id')
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);

    const count = await ProductModel.countDocuments(bodyQuery);

    return res.status(200).json({
      page: page,
      total_page: Math.ceil(count / PER_PAGE),
      data: products,
    });
  },
};
