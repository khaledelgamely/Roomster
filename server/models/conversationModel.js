const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [schema.Types.ObjectId],
      ref: "Users",
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversations", ConversationSchema);
