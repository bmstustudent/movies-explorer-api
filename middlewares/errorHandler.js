const { SERVER_ERROR_MESSAGE } = require('../config');

const errorHandler = ((err, req, res, next) => {
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? SERVER_ERROR_MESSAGE : message,
    });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
});

module.exports = errorHandler;
