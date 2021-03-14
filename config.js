const {
  NODE_ENV, JWT_SECRET, PORT, DATABASE,
} = process.env;

const whiteList = [
  'http://localhost:3000',
  'https://movies.maksis.name',
  'http://movies.maksis.name',
];

const SECRET_STR = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'some-secret-key';
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : 3000;
const MONGODB = NODE_ENV === 'production' && DATABASE ? DATABASE : 'mongodb://localhost:27017/bitfilmsdb';

const INCORRECT_ERROR_MESSAGE = 'Ошибка валидации данных';
const NOTFOUND_ID_MESSAGE = 'Объект с таким id не найден';
const MOVIE_OWNER_ERROR_MESSAGE = 'Запрещено убирать у других пользователей фильмы из избранного.';
const MOVIE_CONFLICT_ERROR_MESSAGE = 'Такой фильм уже добавлен в избранное';
const USER_NOTFOUND_MESSAGE = 'Такой пользователь не найден';
const USER_CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const AUTH_INCORRECT_ERROR_MESSAGE = 'Неправильные почта или пароль';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const PAGE_NOTFOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const ACCESS_ERROR_MESSAGE = 'Доступ до ресурса Вам запрещен';

module.exports = {
  whiteList,
  SECRET_STR,
  SERVER_PORT,
  MONGODB,
  INCORRECT_ERROR_MESSAGE,
  NOTFOUND_ID_MESSAGE,
  MOVIE_OWNER_ERROR_MESSAGE,
  MOVIE_CONFLICT_ERROR_MESSAGE,
  USER_NOTFOUND_MESSAGE,
  USER_CONFLICT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  AUTH_INCORRECT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  PAGE_NOTFOUND_MESSAGE,
  ACCESS_ERROR_MESSAGE,
};
