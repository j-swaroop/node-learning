// const fs = require('fs');
// const Tour = require('../models/tourModel');

// // const tours = JSON.parse(
// //   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// // );

// // exports.validateId = (req, res, next, val) => {
// //   const id = Number(val);
// //   const foundIndex = tours.findIndex((item) => item.id === id);

// //   if (foundIndex === -1) {
// //     res.status(404).send({
// //       status: 'failed',
// //       message: 'Invalid Id',
// //     });
// //     return;
// //   }
// //   next();
// // };

// // exports.checkBody = (req, res, next) => {
// //   if (!req.body.name || !req.body.duration) {
// //     res.status(400).json({
// //       status: 'failed',
// //       message: 'Either name or duration missing',
// //     });
// //     return;
// //   }
// //   next();
// // };

// exports.getAllTours = async (req, res) => {
//   try {
//     // BUILD QUERY
//     const queryObject = { ...req.query };
//     const excludeFields = ['sort', 'page', 'limit', 'fields'];

//     excludeFields.forEach((el) => delete queryObject[el]);

//     // console.log(req.query, queryObject);

//     // ADVANCED FILTERING
//     let queryStr = JSON.stringify(queryObject);
//     queryStr = JSON.parse(
//       queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
//     );

//     console.log(queryStr);
//     let query = Tour.find(queryStr);

//     // SORTING
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' ');
//       query = query.sort(sortBy);
//     }

//     if (req.query.fields) {
//       const fieldsStr = req.query.fields.split(',').join(' ');
//       query = query.select(fieldsStr);
//     } else {
//       query = query.select('-__v');
//     }

//     // Pagination
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 100;
//     let skip = (page - 1) * limit;

//     query = query.skip(skip).limit(limit);

//     const tours = await query;

//     res.status(200).json({
//       status: 'success',
//       total: tours.length,
//       data: {
//         tours,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.getTour = async (req, res) => {
//   try {
//     const tour = await Tour.findById(req.params.id);
//     res.status(200).send({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.createTour = async (req, res) => {
//   // console.log(req.body);

//   try {
//     const newTour = await Tour.create(req.body);

//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   } catch (e) {
//     res.status(400).json({
//       status: 'failed',
//       message: e,
//     });
//   }
// };

// exports.updateTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.deleteTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndDelete(req.params.id);
//     res.status(200).send({
//       status: 'success',
//       data: {
//         tour: null,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.getStats = async (req, res) => {
//   try {
//     const status = await Tour.aggregate([
//       { $match: { ratingsAverage: { $gte: 4.5 } } },
//       {
//         $group: {
//           _id: { $toUpper: '$difficulty' },
//           numTours: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//       {
//         $sort: {
//           avgPrice: 1,
//         },
//       },
//     ]);

//     res.status(200).send({
//       status: 'success',
//       data: {
//         status,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = Number(req.params.year);
//     const plan = await Tour.aggregate([
//       {
//         $unwind: '$startDates',
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' },
//           numTourStarts: { $sum: 1 },
//           tours: { $push: '$name' },
//         },
//       },
//       {
//         $addFields: {
//           month: '$_id',
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//         },
//       },
//       {
//         $sort: {
//           numTourStarts: -1,
//         },
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       total: plan.length,
//       data: {
//         plan,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./factoryController');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

exports.getToursWithIn = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng',
      ),
      400,
    );
  }

  const tours = await Tour.find({
    startLocation: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});
