const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB Connected Successfully');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const createData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Created Successfully');
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted Successfully');
  } catch (e) {
    console.log(e);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  createData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
