const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour Must have name.'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A Tour Must have price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.2,
  price: 500,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
