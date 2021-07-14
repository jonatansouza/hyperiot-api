const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const assetsRouter = require('./routes/assets');
const loginRouter = require('./routes/login');
const app = express();


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Hyperiot api',
      description: 'API to handle client / blockchain'
    },
    servers: ['http://localhost:3000']
  },
  apis: ['./docs/**/*.yaml']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/explorer', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors({
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200
}))
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/assets', assetsRouter);
app.use('/login', loginRouter);

module.exports = app;
