const router = require('express').Router();
const { NotFoundError } = require('../errors/not-found');
const { PAGE_NOTFOUND_MESSAGE } = require('../config');

const notFound = () => {
  throw new NotFoundError(PAGE_NOTFOUND_MESSAGE);
};

router.get('*', notFound);

module.exports = router;
