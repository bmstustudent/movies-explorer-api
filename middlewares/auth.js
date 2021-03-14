const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized');
const { SECRET_STR, AUTH_ERROR_MESSAGE } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STR);
  } catch (err) {
    throw new UnauthorizedError(AUTH_ERROR_MESSAGE);
  }

  req.user = payload;
  next();
};
