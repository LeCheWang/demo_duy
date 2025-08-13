const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number()
    .min(1000)
    .message('min 1000')
    .max(10000)
    .message('max 10000')
    .required(),
  description: Joi.string(),
  category_id: Joi.string().required(),
});

module.exports = {
  createProductValid: (body) => createProductSchema.validate(body),
};
