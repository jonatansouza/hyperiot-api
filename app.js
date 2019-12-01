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
const usersRouter = require('./routes/users');
const cloudRouter = require('./routes/cloud');
const assetsRouter = require('./routes/assets');
const participantsRouter = require('./routes/participants');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}))
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cloud', cloudRouter);
app.use('/assets', assetsRouter);
app.use('/participants', participantsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
