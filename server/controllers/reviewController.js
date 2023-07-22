const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Review = mongoose.model("Reviews");
const Users = mongoose.model("Users");

exports.getAllReviews = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Review.find({})
      .populate({
        path: "userId",
        // model: Users,
        // as: "user",
        // select: { fullName: 1, email: 1, _id: 0 },
      })
      .populate({ path: "apartmentId" }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no reviews  to show");
        error.statusCode = 404;
        throw error;
      }

      response.status(200).json({ data: docs, page: apiFeature.page });
    })
    .catch((err) => next(err));
};

exports.getApartmentReviews = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Review.find({ apartmentId: request.params.id })
      .populate({
        path: "userId",
      })
      .populate({ path: "apartmentId" }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      let totalReveiws = 0;
      if (!docs) {
        let error = new Error("there're no reviews  to show");
        error.statusCode = 404;
        throw error;
      }
      docs.forEach((review) => {
        totalReveiws += review.rate;
      });
      response.status(200).json({
        data: docs,
        page: apiFeature.page,
        totalRate: (totalReveiws / docs.length).toFixed(2),
      });
    })
    .catch((err) => next(err));
};
exports.addNewReview = (request, response, next) => {
  new Review(request.body)
    .save()
    .then((apartDoc) => {
      if (!apartDoc) {
        let error = new Error("can't add this review check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(apartDoc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateReview = (request, response, next) => {
  Review.updateOne({ _id: request.params.id }, request.body)
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" review id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({ message: "review updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteReview = (request, response, next) => {
  Review.deleteOne({ _id: request.params.id })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error("this review doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: " review is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
