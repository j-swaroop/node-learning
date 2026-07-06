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

const app = require('./app');

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

// unhandled rejection - occurs in asynchronous code 
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Shutting down the server');
  server.close(() => {
    process.exit(1);
  });
});
