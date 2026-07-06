const mongoose = require('mongoose');

// name, email, photo, password, passwordConfirm

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field'],
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    unique: true,
    trim: true,
    lowercase: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: 'Please enter a valid email',
    // },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password is a required field'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
