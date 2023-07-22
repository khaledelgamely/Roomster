const express = require("express");
const validationError = require("./../middelwares/validators/validationError");
const authMiddleware = require("./../middelwares/authenicatedMW");
const validator = require("./../middelwares/validators/reviewValidator");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.verifyTokenAndAuthorization,
    reviewController.addNewReview,
    validator.addSingleReview,
    validationError
  );

router
  .route("/:id")
  .patch(
    authMiddleware.verifyTokenAndAuthorization,
    reviewController.updateReview,
    validator.updateSingleReview,
    validationError
  )
  .delete(
    authMiddleware.verifyTokenAndAuthorization,
    reviewController.deleteReview,
    validator.deleteSpecificReview,
    validationError
  );
router.get(
  "/all",
  reviewController.getAllReviews,
  validator.getAllReviews,
  validationError
);

router.get(
  "/apartment/:id",
  reviewController.getApartmentReviews,
  validator.getApartmentReviews,
  validationError
);
module.exports = router;
