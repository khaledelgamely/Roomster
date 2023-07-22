const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiverId: {
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

module.exports = mongoose.model("Notifications", NotificationSchema);
