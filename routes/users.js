/* eslint-disable indent */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateProfile } = require('../controllers/users.js');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }), updateProfile);

module.exports = router;
