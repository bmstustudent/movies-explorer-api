/* eslint-disable indent */
const Movie = require('../models/movie');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const {
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_MESSAGE,
  INCORRECT_ID_MESSAGE,
  CAST_ERROR,
  VALIDATION_ERROR,
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

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
    } = req.body;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user.id,
    });
    res.send(newMovie);
  } catch (err) {
    if (err.name === CAST_ERROR || err.name === VALIDATION_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const { movieId } = req.params;
    const movieForConfirm = await Movie.findById(movieId).select('+owner');
    if (movieForConfirm === null) {
      throw new NotFoundError(INCORRECT_ID_MESSAGE('фильма'));
    } else if (currentUser !== movieForConfirm.owner.toString()) {
      throw new Forbidden(FORBIDDEN_MESSAGE);
    }
    const confirmedMovie = await Movie.findByIdAndRemove(movieId);
    res.send(confirmedMovie);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
