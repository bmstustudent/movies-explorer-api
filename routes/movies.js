const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { getMovies, addMovieFavorite, deleteMovieFavorite } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле country не должно быть пустым',
        'any.required': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Поле director не должно быть пустым',
        'any.required': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле duration должно быть числом',
        'any.required': 'Поле duration должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.empty': 'Поле year не должно быть пустым',
        'any.required': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Поле description не должно быть пустым',
        'any.required': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Поле image должно быть ссылкой');
      })
      .messages({
        'string.empty': 'Поле image не должно быть пустым',
        'any.required': 'Поле image должно быть заполнено',
      }),
    trailer: Joi.string().required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Поле trailer должно быть ссылкой');
      })
      .messages({
        'string.empty': 'Поле trailer не должно быть пустым',
        'any.required': 'Поле trailer должно быть заполнено',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message('Поле thumbnail должно быть ссылкой');
      })
      .messages({
        'string.empty': 'Поле thumbnail не должно быть пустым',
        'any.required': 'Поле thumbnail должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле nameRU не должно быть пустым',
        'any.required': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле nameEN не должно быть пустым',
        'any.required': 'Поле nameEN должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': 'Поле movieId должно быть числом',
        'any.required': 'Поле movieId должно быть заполнено',
      }),
  }),
}), addMovieFavorite);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex()
      .message('Некорректный id'),
  }),
}), deleteMovieFavorite);

module.exports = router;
