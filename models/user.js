const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { UnauthorizedError } = require('../errors/unauthorized');
const { AUTH_INCORRECT_ERROR_MESSAGE } = require('../config');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email: это обязательное поле'],
    unique: true,
    validate: [isEmail, 'email: адрес не является валидным'],
  },
  password: {
    type: String,
    required: [true, 'password: это обязательное поле'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'name: минимальная длина поля 2 символа'],
    maxlength: [30, 'name: максимальная длина поля 30 символов'],
    required: [true, 'name: это обязательное поле'],
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(AUTH_INCORRECT_ERROR_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(AUTH_INCORRECT_ERROR_MESSAGE);
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
