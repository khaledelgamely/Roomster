const { param, body } = require("express-validator");

module.exports.getAll = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
];
module.exports.addNewNotification = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("senderId").isMongoId().withMessage("id must be mongo ObjectId"),
  body("receiverId").isMongoId().withMessage("id must be mongo ObjectId"),
  body("text").isString().withMessage("text must be string"),
  body("seen").isEmpty().withMessage("cant set seen manualy"),
];

module.exports.makeAllSeen = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
];
