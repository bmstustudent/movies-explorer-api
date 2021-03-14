const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { NotFoundError } = require('../errors/not-found');
const { BadRequestError } = require('../errors/bad-request');
const { ConflictError } = require('../errors/conflict');
const {
  SECRET_STR, INCORRECT_ERROR_MESSAGE, USER_NOTFOUND_MESSAGE, USER_CONFLICT_ERROR_MESSAGE,
} = require('../config');

const getUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail(() => new NotFoundError(USER_NOTFOUND_MESSAGE))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(USER_CONFLICT_ERROR_MESSAGE);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => UserModel.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(INCORRECT_ERROR_MESSAGE);
      }
      throw err;
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError(USER_NOTFOUND_MESSAGE))
    .then((user) => {
      res.send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(INCORRECT_ERROR_MESSAGE);
      }
      throw err;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOTFOUND_MESSAGE));
        return;
      }
      const token = jwt.sign(
        { _id: user._id },
        SECRET_STR,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser, createUser, updateUser, login,
};
