const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterBody = (body, ...allowedFields) => {
  const newBody = {};

  Object.keys(body).forEach((el) => {
    if (allowedFields.includes(el)) {
      newBody[el] = body[el];
    }
  });
  return newBody;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Check if user tries to update password and return error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not allowed to updated password. if you want to update password use /updatePassword',
        400,
      ),
    );
  }

  // 2. Filter the body by allowing only specific fields (EX: Role cant be updated)
  const filteredBody = filterBody(req.body, 'name', 'email');

  // 3. update the user and send response
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};
