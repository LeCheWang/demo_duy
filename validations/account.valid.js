const Joi = require('joi');

const registerAccountSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(new RegExp(/^[a-zA-Z0-9@$!%*.?&]{6,16}$/))
    .required(),
  email: Joi.string().email().required(),
});

module.exports = {
  registerAccountValid: (body) => registerAccountSchema.validate(body),
};
