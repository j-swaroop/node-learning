const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./factoryController');

const filterBody = (body, ...allowedFields) => {
  const newBody = {};

  Object.keys(body).forEach((el) => {
    if (allowedFields.includes(el)) {
      newBody[el] = body[el];
    }
  });
  return newBody;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  (console.log(req.file), console.log(req.body));
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
  const filteredBody = filterBody(req.body, 'name', 'email', 'active');
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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: {
      user: null,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
