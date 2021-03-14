const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле Email не валидно')
      .messages({
        'any.required': 'Поле Email должно быть заполнено',
        'string.empty': 'Поле Email не должно быть пустым',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Name должно быть заполнено',
        'string.empty': 'Поле Name не должно быть пустым',
        'string.min': 'Минимальная длина имени 8 символов',
        'string.max': 'Максимальная длина имени 30 символов',
      }),
  }),
}), updateUser);

module.exports = router;
