const CategoryModel = require('../models/category.model');

module.exports = {
  createCategory: async (req, res) => {
    const body = req.body;
    const category = await CategoryModel.create(body);

    return res.status(201).json(category);
  },
  getCategories: async (req, res) => {
    const { name } = req.query;

    const bodyQuery = {};

    if (name) {
      bodyQuery.name = {
        $regex: `.*${name}.*`,
        $options: 'i',
      };
    }

    const categories = await CategoryModel.find(bodyQuery);
    return res.status(200).json(categories);
  },
  updateCategory: async (req, res) => {
    const { id } = req.params;
    //const id = req.params.id;

    const body = req.body;

    const category = await CategoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(category);
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json(category);
  },
};
