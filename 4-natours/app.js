const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routes/toursRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

console.log(process.env.NODE_ENV);
// Global Middlewares

// Set security HTTP headers
app.use(helmet());

// Development logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit Request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this Ip, please try again after an hour',
});

app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against NOSQL Query (EX: username: {$gt: ""}) Removes $
app.use(mongoSanitize());

// Data sanitization against xss (EX: username: <div id='data-id'>Test User</div>) Converts HTML into 
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/pubic`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Can't find Route ${req.originalUrl}`,
  // });
  // const err = new Error(`Can't find Route ${req.originalUrl}`);
  // err.status = 'failed';
  // err.statusCode = 404;
  next(new AppError(`Can't find Route ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
