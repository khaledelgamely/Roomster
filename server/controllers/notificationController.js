const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Notification = mongoose.model("Notifications");
const Users = mongoose.model("Users");

exports.getAll = (request, response, next) => {
  let documents = "";
  const apiFeature = new ApiFeature(
    Notification.find({ receiverId: request.params.id })
      .sort({ _id: -1 })
      .populate({
        path: "senderId",
        select: { password: 0 },
      }),
    // .populate({
    //   path: "receiverId",
    //   select: { password: 0 },
    // })
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no notifications  to show");
        error.statusCode = 404;
        throw error;
      }
      documents = docs;
      return Notification.countDocuments({
        receiverId: request.params.id,
        seen: false,
      });
    })
    .then((count) => {
      response.status(200).json({
        data: documents,
        page: apiFeature.page,
        noOfUnseen: count,
      });
    })
    .catch((err) => next(err));
};

exports.addNewNotification = (request, response, next) => {
  new Notification(request.body)
    .save()
    .then((notificationDoc) => {
      if (!notificationDoc) {
        let error = new Error("can't add this notification check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(notificationDoc);
    })
    .catch((err) => {
      next(err);
    });
};
exports.makeAllSeen = (request, response, next) => {
  Notification.updateMany(
    { receiverId: request.params.id, seen: false },
    { $set: { seen: true } }
  )
    .then((doc) => {
      if (doc.matchedCount == 0) {
        response.status(201).json({ message: "all ur notifications are seen" });
      }
      response
        .status(201)
        .json({ message: "notifications updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
