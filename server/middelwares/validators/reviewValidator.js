const { param, body, query } = require("express-validator");
exports.getApartmentReviews = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  query("page").isNumeric().withMessage("page is not number").optional(),
  query("limit").isNumeric().withMessage("limit is not number").optional(),
];

exports.getAllReviews = [
  query("page").isNumeric().withMessage("page is not number").optional(),
  query("limit").isNumeric().withMessage("limit is not number").optional(),
];
exports.deleteSpecificReview = param("id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");
exports.updateSingleReview = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("userId")
    .notEmpty()
    .withMessage("userId cant be blank")
    .isMongoId()
    .withMessage("userId must be mongo ObjectId"),

  body("apartmentId")
    .notEmpty()
    .withMessage("apartmentId cant be blank")
    .isMongoId()
    .withMessage("apartmentId must be mongo ObjectId")
    .optional(),
  body("rate")
    .notEmpty()
    .withMessage("apartmentId cant be blank")
    .isNumeric()
    .withMessage("rate must be number")
    .optional(),
  body("description")
    .notEmpty()
    .withMessage("description cant be blank")
    .isString()
    .withMessage("description must be String")
    .optional(),
];

exports.addSingleReview = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("userId")
    .notEmpty()
    .withMessage("userId cant be blank")
    .isMongoId()
    .withMessage("userId must be mongo ObjectId"),
  body("apartmentId")
    .notEmpty()
    .withMessage("apartmentId cant be blank")
    .isMongoId()
    .withMessage("apartmentId must be mongo ObjectId"),
  body("rate")
    .notEmpty()
    .withMessage("apartmentId cant be blank")
    .isNumeric()
    .withMessage("rate must be number"),
  body("description")
    .notEmpty()
    .withMessage("description cant be blank")
    .isString()
    .withMessage("description must be String"),
];
