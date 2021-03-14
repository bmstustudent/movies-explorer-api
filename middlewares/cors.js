const { whiteList, ACCESS_ERROR_MESSAGE } = require('../config');

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(ACCESS_ERROR_MESSAGE));
  },
};

module.exports = { corsOptions };
