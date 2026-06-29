const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

const getAllTours = (req, res) => {
  res.status(301).send({
    status: 'success',
    total: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);

  const foundIndex = tours.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res.status(404).send({
      status: 'failed',
      message: 'Invalid Id',
    });
    return;
  }

  const tour = tours[foundIndex];
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  const foundIndex = tours.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res.status(404).send({
      status: 'failed',
      message: 'Invalid Id',
    });
    return;
  }

  const tour = tours[foundIndex];

  tour.name = req.body.name;
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  const foundIndex = tours.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res.status(404).send({
      status: 'failed',
      message: 'Invalid Id',
    });
    return;
  }

  tours.splice(foundIndex, 1);
  res.status(200).send({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
