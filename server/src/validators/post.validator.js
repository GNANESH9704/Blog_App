
const Joi = require('joi');
const createSchema = Joi.object({
  title: Joi.string().min(5).max(120).required(),
  imageURL: Joi.string().uri().optional().allow(''),
  content: Joi.string().min(50).required()
});
const updateSchema = Joi.object({
  title: Joi.string().min(5).max(120).optional(),
  imageURL: Joi.string().uri().optional().allow(''),
  content: Joi.string().min(50).optional()
});
module.exports = { createSchema, updateSchema };
