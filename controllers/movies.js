/* eslint-disable indent */
const Movie = require('../models/movie');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequest = require('../errors/conflicting-request');
const BadRequest = require('../errors/bad-request');
const {
  BAD_REQUEST_ERROR_CODE,
  CAST_ERROR,
} = require('../utils/utils');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const movies = await Movie.find({ owner });
    res.send(movies);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      if (movie) {
        res.send({ data: movie });
      } else {
        throw new ConflictingRequest('Фильм с таким id уже существует');
      }
    })
    .catch((err) => next(err));
};


const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Произошла ошибка, не удалось найти фильмы');
      } else if (String(movie.owner[0]) !== String(req.user._id)) {
        throw new Forbidden('Невозможно удалить чужой фильм!');
      } else if (String(req.params.movieId) !== String(movie._id)) {
        throw new BadRequest('Неверный id фильма');
      }
      movie.remove()
        .then((deleted) => {
          res.status(200).send({ deleted });
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
