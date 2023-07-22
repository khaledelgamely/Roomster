const { param, body } = require("express-validator");

module.exports.getAll = [
  param("userId").isMongoId().withMessage("id must be mongo ObjectId"),
];
module.exports.openConversation = [
  body("members").isArray().withMessage("rules is not array"),
  body("members.*").isMongoId().withMessage("id must be mongo ObjectId"),
];

module.exports.makeConvoMessagesSeen = [
  param("userId").isMongoId().withMessage("id must be mongo ObjectId"),
  body("conversationId")
    .notEmpty()
    .withMessage("conversationId cant be blank")
    .isMongoId()
    .withMessage("conversationId must be mongo ObjectId"),
];
module.exports.getUnseenConversations = [
  param("userId").isMongoId().withMessage("id must be mongo ObjectId"),
];
