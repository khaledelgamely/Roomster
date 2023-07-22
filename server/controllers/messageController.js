const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Message = mongoose.model("Messages");

exports.getConvoMessages = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Message.find({ conversationId: request.params.convId })
      .sort({ _id: -1 })
      .populate({
        path: "senderId",
        select: { password: 0 },
      }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no Messages  to show");
        error.statusCode = 404;
        throw error;
      }

      response.status(200).json({ data: docs, page: apiFeature.page });
    })
    .catch((err) => next(err));
};

exports.addNewMessage = (request, response, next) => {
  new Message(request.body)
    .save()
    .then((notificationDoc) => {
      if (!notificationDoc) {
        let error = new Error("can't add this Message check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(notificationDoc);
    })
    .catch((err) => {
      next(err);
    });
};
