const router = require('express').Router();
const { validateObjId, validateMovieBody } = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies.js');

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateObjId, deleteMovie);

module.exports = router;
