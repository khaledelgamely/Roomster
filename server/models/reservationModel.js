const mongoose = require("mongoose");
const schema = mongoose.Schema;

const model = new mongoose.Schema(
  {
    // _id: {
    //   type: schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    userId: {
      type: schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    apartmentId: {
      type: schema.Types.ObjectId,
      ref: "Apartments",
      required: true,
    },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
  },
  { timestamps: true }
);

mongoose.model("Reservations", model);
