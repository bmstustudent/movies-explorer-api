require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-err');
const { devUrl } = require('./utils/config');
const { limiter } = require('./utils/rate-limiter');
const { SERVER_ERROR_MESSAGE } = require('./utils/utils');

const app = express();
const { PORT = 3000, MONGO_URL = devUrl } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, mongooseConnectOptions);

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200,
};

app.get('/products/:id', cors(corsOptions), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for only example.com.' });
});

// подключаем лимитер запросов
app.use(limiter);

// подключаем логгер запросов
app.use(requestLogger);

// подключаем краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

// обработчики ошибок
app.all('*', () => {
  throw new NotFoundError(SERVER_ERROR_MESSAGE);
});

app.use(errorLogger);
app.use(errors());

// здесь централизованно обрабатываем ошибки
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
