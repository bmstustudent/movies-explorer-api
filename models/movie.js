const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  country: {
    type: String,
    require: [true, 'country: это обязательное поле'],
  },
  director: {
    type: String,
    require: [true, 'director: это обязательное поле'],
  },
  duration: {
    type: Number,
    require: [true, 'duration: это обязательное поле'],
  },
  year: {
    type: String,
    require: [true, 'year: это обязательное поле'],
  },
  description: {
    type: String,
    require: [true, 'description: это обязательное поле'],
  },
  image: {
    type: String,
    require: [true, 'image: это обязательное поле'],
    validator: [isURL, 'image: поле на является ссылкой'],
  },
  trailer: {
    type: String,
    require: [true, 'trailer: это обязательное поле'],
    validator: [isURL, 'trailer: поле не является ссылкой'],
  },
  thumbnail: {
    type: String,
    require: [true, 'thumbnail: это обязательное поле'],
    validator: [isURL, 'thumbnail: поле не является ссылкой'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'user',
    select: false,
  },
  nameRU: {
    type: String,
    require: [true, 'nameRU: это обязательное поле'],
  },
  nameEN: {
    type: String,
    require: [true, 'nameEN: это обязательное поле'],
  },
  movieId: {
    type: Number,
    require: [true, 'movieID: это обязательное поле'],
  },
});

const MovieModel = mongoose.model('movie', MovieSchema);
module.exports = MovieModel;
