const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  role: {
    type: String,
    required: [true, 'Role is required field'],
    enum: ['user', 'guide', 'lead-guide', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
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
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified('password')) return;

  //   Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //   Deleting the password
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimeStamp < changedTimeStamp;
  }

  // Password is not changed
  return false;
};

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
