const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Conversation = mongoose.model("Conversations");
const Message = mongoose.model("Messages");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAll = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Conversation.find({ members: { $in: [request.params.userId] } }).populate({
      path: "members",
      select: { password: 0, rentedApartments: 0, favourites: 0 },
    }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no conversations  to show");
        error.statusCode = 404;
        throw error;
      }

      response.status(200).json({ data: docs, page: apiFeature.page });
    })
    .catch((err) => next(err));
};

exports.openConversation = (request, response, next) => {
  Conversation.findOne({
    members: { $all: [...request.body.members] },
  })
    .populate({
      path: "members",
      select: { password: 0, rentedApartments: 0, favourites: 0 },
    })
    .then((conversationDoc) => {
      if (!conversationDoc) {
        new Conversation(request.body)
          .save()
          .then((conversationDoc) => {
            if (!conversationDoc) {
              let error = new Error(
                "can't add this conversation check your data"
              );
              error.statusCode = 404;
              throw error;
            }
            // console.log("conversation created");
            // response.status(200).json(conversationDoc);
            return Conversation.findById(conversationDoc._id).populate({
              path: "members",
              select: { password: 0, rentedApartments: 0, favourites: 0 },
            });
          })
          .then((docs) => {
            if (!docs) {
              let error = new Error("there're no conversation  to show");
              error.statusCode = 404;
              throw error;
            }
            response.status(200).json(docs);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        console.log("conversation already exists");
        response.status(200).json(conversationDoc);
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.makeConvoMessagesSeen = (request, response, next) => {
  Message.updateMany(
    { conversationId: request.body.conversationId, seen: false },
    { $set: { seen: true } }
  )
    .then((doc) => {
      response.status(201).json({ message: "messages updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUnseenConversations = (request, response, next) => {
  let result = {};
  Conversation.find({ members: { $in: [request.params.userId] } }, { _id: 1 })
    .then((doc) => {
      if (!doc) {
        let error = new Error("can't get unseen conversations");
        error.statusCode = 404;
        throw error;
      }
      doc.forEach((id) => (result[id._id.toString()] = []));
      return Message.find({
        conversationId: { $in: [...doc] },
        senderId: { $ne: request.params.userId },
        seen: false,
      });
    })
    .then((doc) => {
      let senderIds = [];
      let conversationIds = [];
      if (!doc) {
        let error = new Error("can't get unseen conversations");
        error.statusCode = 404;
        throw error;
      }
      doc.forEach(
        (message) =>
          (result[message.conversationId] = message.senderId.toString())
      );
      for (let singleconversation in result) {
        if (result[singleconversation].length != 0) {
          senderIds.push(result[singleconversation]);
          conversationIds.push(singleconversation);
        }
      }
      response.status(201).json({ senderIds, conversationIds });
    })
    .catch((err) => {
      next(err);
    });
};
// exports.getUnseenConversations = async (request, response, next) => {
//   try {
//     const senderIds = await Message.distinct("senderId", { seen: false });
//     response.json(senderIds);
//   } catch (error) {
//     next(err);
//   }
// };
