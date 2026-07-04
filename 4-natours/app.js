const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

app.use(express.json());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/pubic`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Can't find Route ${req.originalUrl}`,
  // });
  const err = new Error(`Can't find Route ${req.originalUrl}`);
  err.status = 'failed';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.static || 'error';

  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
