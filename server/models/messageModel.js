const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: schema.Types.ObjectId,
      ref: "Conversations",
      required: true,
    },
    senderId: {
      type: schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    text: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessageSchema);
