const router = require('express').Router();
const userRouter = require('./users.js');
const movieRouter = require('./movies.js');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
