const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const userRouter = require('./users');
const movieRouter = require('./movies');
const notFoundRouter = require('./not-found');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле Email не валидно')
      .messages({
        'any.required': 'Поле Email должно быть заполнено',
        'string.empty': 'Поле Email не должно быть пустым',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле Password должно быть заполнено',
        'string.empty': 'Поле Password не должно быть пустым',
        'string.min': 'Минимальная длина пароля 8 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Name должно быть заполнено',
        'string.empty': 'Поле Name не должно быть пустым',
        'string.min': 'Минимальная длина имени 8 символов',
        'string.max': 'Максимальная длина имени 30 символов',
      }),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле Email не валидно')
      .messages({
        'any.required': 'Поле Email должно быть заполнено',
        'string.empty': 'Поле Email не должно быть пустым',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле Password должно быть заполнено',
        'string.empty': 'Поле Password не должно быть пустым',
        'string.min': 'Минимальная длина пароля 8 символов',
      }),
  }),
}), login);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use(notFoundRouter);

module.exports = router;
