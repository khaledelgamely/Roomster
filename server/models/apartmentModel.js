const mongoose = require("mongoose");
const schema = mongoose.Schema;

const location = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
    country: String,
    floorNo: Number,
    description: String,
  },
  { _id: false }
);

const reservationInfo = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    reservationId: { type: schema.Types.ObjectId, ref: "Reservations" },
  },
  { _id: false }
);

const image = new mongoose.Schema(
  {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);
const apartmentSpecification = new mongoose.Schema(
  {
    noOfBalcony: { type: Number, default: 0 },
    noOfRooms: { type: Number, default: 0 },
    noOfBeds: { type: Number, default: 0 },
    hasWifi: { type: Boolean, default: false },
    noOfKitchens: { type: Number, default: 0 },
    hasTv: { type: Boolean, default: false },
    hasWasher: { type: Boolean, default: false },
    hasFreeParking: { type: Boolean, default: false },
    hasPaidParking: { type: Boolean, default: false },
    hasAirConditioning: { type: Boolean, default: false },
    hasDedicatedWorkspace: { type: Boolean, default: false },
    hasPool: { type: Boolean, default: false },
    hasHotTub: { type: Boolean, default: false },
    hasPatio: { type: Boolean, default: false },
    hasBBQgrill: { type: Boolean, default: false },
    hasOutdoorDiningArea: { type: Boolean, default: false },
    hasFirePit: { type: Boolean, default: false },
    hasPoolTable: { type: Boolean, default: false },
    hasIndoorFirePlace: { type: Boolean, default: false },
    hasPiano: { type: Boolean, default: false },
    hasExerciseEquipment: { type: Boolean, default: false },
    hasLakeAccess: { type: Boolean, default: false },
    hasBeachAccess: { type: Boolean, default: false },
    hasSkiInSkiOut: { type: Boolean, default: false },
    hasOutdoorShower: { type: Boolean, default: false },
    hasSmokeAlarm: { type: Boolean, default: false },
    hasFirstAidKit: { type: Boolean, default: false },
    hasFireExtinguisher: { type: Boolean, default: false },
    hasCarbonMonoxideAlarm: { type: Boolean, default: false },
  },
  { _id: false }
);

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

    price: {
      type: Number,
      required: true,
    },
    published: { type: Boolean, default: false },
    title: String,
    description: String,
    apartmentSpecification: apartmentSpecification,
    type: String,
    location: location,
    reservationsArr: [reservationInfo],
    images: [image],
    cancelPolicy: [String],
    rules: [String],
  },
  { timestamps: true }
);

mongoose.model("Apartments", model);
