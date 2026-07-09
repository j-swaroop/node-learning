const express = require('express');

const toursController = require('../controllers/toursController');
const authController = require('../controllers/authController');

const reviewsRouter = require('../routes/reviewsRoute');

const router = express.Router();

// router.param('id', toursController.validateId);

// nested route using merge params
router.use('/:tourId/reviews', reviewsRouter);

router.route('/tour-stats').get(toursController.getTourStats);
router.route(`/monthly-plan/:year`).get(toursController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.deleteTour,
  );

module.exports = router;
