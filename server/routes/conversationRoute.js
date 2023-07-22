const express = require("express");
const router = express.Router();
const controller = require("../controllers/conversationController");
const validator = require("./../middelwares/validators/conversationValidator");
const validationError = require("./../middelwares/validators/validationError");
const authMiddleware = require("./../middelwares/authenicatedMW");

router
  .route("/:userId")
  .get(
    authMiddleware.verifyTokenAndAuthorization,
    validator.getAll,
    validationError,
    controller.getAll
  )
  .post(
    authMiddleware.verifyTokenAndAuthorization,
    validator.openConversation,
    validationError,
    controller.openConversation
  )
  .patch(
    authMiddleware.verifyTokenAndAuthorization,
    validator.makeConvoMessagesSeen,
    validationError,
    controller.makeConvoMessagesSeen
  );
router
  .route("/:userId/unseenConversations")
  .get(
    authMiddleware.verifyTokenAndAuthorization,
    validator.getUnseenConversations,
    validationError,
    controller.getUnseenConversations
  );
module.exports = router;
