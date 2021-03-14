const ModelMovie = require('../models/movie');
const { BadRequestError } = require('../errors/bad-request');
const { NotFoundError } = require('../errors/not-found');
const { ForbiddenError } = require('../errors/forbidden');
const { ConflictError } = require('../errors/conflict');
const {
  INCORRECT_ERROR_MESSAGE, NOTFOUND_ID_MESSAGE,
  MOVIE_OWNER_ERROR_MESSAGE, MOVIE_CONFLICT_ERROR_MESSAGE,
} = require('../config');

const getMovies = (req, res, next) => {
  ModelMovie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovieFavorite = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  return ModelMovie.findOne({ movieId, owner: req.user._id })
    .then((movieFavorite) => {
      if (movieFavorite) {
        throw new ConflictError(MOVIE_CONFLICT_ERROR_MESSAGE);
      }
      return ModelMovie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
      });
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(INCORRECT_ERROR_MESSAGE);
      }
      throw err;
    })
    .catch(next);
};

const deleteMovieFavorite = (req, res, next) => {
  const { movieId } = req.params;
  ModelMovie.findById(movieId).select('+owner')
    .orFail(() => new NotFoundError(NOTFOUND_ID_MESSAGE))
    .then((movie) => {
      if (JSON.stringify(req.user._id) !== JSON.stringify(movie.owner)) {
        throw new ForbiddenError(MOVIE_OWNER_ERROR_MESSAGE);
      }
      return ModelMovie.findByIdAndDelete(movieId)
        .then((deletedMovie) => {
          res.send(deletedMovie);
        });
    })
    .catch(next);
};

module.exports = { getMovies, addMovieFavorite, deleteMovieFavorite };
