const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
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

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
