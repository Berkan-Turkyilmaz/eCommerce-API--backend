import Joi from 'joi';

export const orderSchema = Joi.object({
  userId: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  ).required(),
  total: Joi.number().required(),
});

