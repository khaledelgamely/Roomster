const { param, body } = require("express-validator");

module.exports.getConvoMessages = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  param("convId").isMongoId().withMessage("convid must be mongo ObjectId"),
  // body("conversationId")
  //   .isMongoId()
  //   .withMessage(" conversation id must be mongo ObjectId"),
];
module.exports.addNewMessage = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("senderId").isMongoId().withMessage("id must be mongo ObjectId"),
  body("conversationId").isMongoId().withMessage("id must be mongo ObjectId"),
  body("text").isString().withMessage("text must be string"),
  body("seen").isEmpty().withMessage("cant set seen manualy"),
];
