/* eslint-disable indent */
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const {
  REQUIRED_MESSAGE,
  VALIDATION_MESSAGE,
  EMPTY_FIELD_MESSAGE,
  INCORRECT_LENGTH_MESSAGE,
  INVALID_ID,
} = require('../utils/utils');

const validateObjId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message(INVALID_ID);
      }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(/^(https?:\/\/)([\da-z.-]{1,})(\.)([a-z]{2,6})(\/?)([\da-z-.\W]*)/)).required(),
    trailer: Joi.string().required().pattern(new RegExp(/^(https?:\/\/)([\da-z.-]{1,})(\.)([a-z]{2,6})(\/?)([\da-z-.\W]*)/)).required(),
    thumbnail: Joi.string().required().pattern(new RegExp(/^(https?:\/\/)([\da-z.-]{1,})(\.)([a-z]{2,6})(\/?)([\da-z-.\W]*)/)).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': INCORRECT_LENGTH_MESSAGE('Минимальная', 'name', '2'),
        'string.max': INCORRECT_LENGTH_MESSAGE('Максимальная', 'name', '30'),
        'any.required': REQUIRED_MESSAGE('name'),
        'string.empty': EMPTY_FIELD_MESSAGE('name'),
      }),
    email: Joi.string().required().email()
      .message(VALIDATION_MESSAGE('email', 'email'))
      .messages({
        'any.required': REQUIRED_MESSAGE('email'),
        'string.empty': EMPTY_FIELD_MESSAGE('email'),
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': INCORRECT_LENGTH_MESSAGE('Минимальная', 'password', '8'),
        'any.required': REQUIRED_MESSAGE('password'),
        'string.empty': EMPTY_FIELD_MESSAGE('password'),
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALIDATION_MESSAGE('email', 'email'))
      .messages({
        'any.required': REQUIRED_MESSAGE('email'),
        'string.empty': EMPTY_FIELD_MESSAGE('email'),
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': INCORRECT_LENGTH_MESSAGE('Минимальная', 'password', '8'),
        'any.required': REQUIRED_MESSAGE('password'),
        'string.empty': EMPTY_FIELD_MESSAGE('password'),
      }),
  }),
});

module.exports = {
  validateObjId,
  validateMovieBody,
  validateUserBody,
  validateAuthentication,
};
