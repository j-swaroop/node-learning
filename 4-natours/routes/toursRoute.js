const express = require('express');

const toursController = require('../controllers/toursController');
const authController = require('../controllers/authController');

const reviewsRouter = require('../routes/reviewsRoute');

const router = express.Router();

// router.param('id', toursController.validateId);

// nested route using merge params
router.use('/:tourId/reviews', reviewsRouter);

router.route('/tour-stats').get(toursController.getTourStats);
router
  .route(`/monthly-plan/:year`)
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    toursController.getMonthlyPlan,
  );

router
  .route(`/tours-within/:distance/center/:latlng/unit/:unit`)
  .get(toursController.getToursWithIn);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    toursController.createTour,
  );

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.deleteTour,
  );

module.exports = router;
