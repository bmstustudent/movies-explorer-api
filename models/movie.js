const mongoose = require('mongoose');
const validator = require('validator'); // модуль для валидации

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { //  год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  trailer: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (urlToImage) => validator.isURL(urlToImage),
      message: (props) => `${props.value} некорректная ссылка на трейлер фильма`,
    },
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (urlToImage) => validator.isURL(urlToImage),
      message: (props) => `${props.value} некорректная ссылка на постер к фильму`,
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (urlToImage) => validator.isURL(urlToImage),
      message: (props) => `${props.value} некорректная ссылка на изображение постера`,
    },
  },
  owner: { // _id пользователя, который сохранил статью
    type: mongoose.Schema.Types.ObjectId, // сюда запишется ссылка на создателя карточки
    required: true,
    ref: 'user',
  },
  nameRU: { // название фильма на русском
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
