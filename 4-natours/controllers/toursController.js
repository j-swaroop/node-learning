const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.validateId = (req, res, next, val) => {
  const id = Number(val);
  const foundIndex = tours.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res.status(404).send({
      status: 'failed',
      message: 'Invalid Id',
    });
    return;
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration) {
    res.status(400).json({
      status: 'failed',
      message: 'Either name or duration missing',
    });
    return;
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(301).send({
    status: 'success',
    total: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const foundIndex = tours.findIndex((item) => item.id === id);

  const tour = tours[foundIndex];
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const foundIndex = tours.findIndex((item) => item.id === id);

  const tour = tours[foundIndex];

  tour.name = req.body.name;
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const foundIndex = tours.findIndex((item) => item.id === id);

  tours.splice(foundIndex, 1);
  res.status(200).send({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
