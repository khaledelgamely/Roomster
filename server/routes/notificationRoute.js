const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");
const validator = require("./../middelwares/validators/notificationValidator");
const validationError = require("./../middelwares/validators/validationError");
const authMiddleware = require("./../middelwares/authenicatedMW");

router
  .route("/:id")
  .get(
    authMiddleware.verifyTokenAndAuthorization,
    validator.getAll,
    validationError,
    controller.getAll
  )
  .post(
    authMiddleware.verifyTokenAndAuthorization,
    validator.addNewNotification,
    validationError,
    controller.addNewNotification
  )
  .patch(
    authMiddleware.verifyTokenAndAuthorization,
    validator.makeAllSeen,
    validationError,
    controller.makeAllSeen
  );
module.exports = router;
