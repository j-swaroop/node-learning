const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.validateId = (req, res, next, val) => {
//   const id = Number(val);
//   const foundIndex = tours.findIndex((item) => item.id === id);

//   if (foundIndex === -1) {
//     res.status(404).send({
//       status: 'failed',
//       message: 'Invalid Id',
//     });
//     return;
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.duration) {
//     res.status(400).json({
//       status: 'failed',
//       message: 'Either name or duration missing',
//     });
//     return;
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(301).send({
    status: 'success',
    // total: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  // const foundIndex = tours.findIndex((item) => item.id === id);

  // const tour = tours[foundIndex];
  res.status(200).send({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = async (req, res) => {
  // console.log(req.body);

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid Data',
    });
  }
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  // const foundIndex = tours.findIndex((item) => item.id === id);

  // const tour = tours[foundIndex];

  // tour.name = req.body.name;
  res.status(200).send({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);

  res.status(200).send({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
