const mongoose = require("mongoose");
const schema = mongoose.Schema;

const address = new mongoose.Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false }
);

const image = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const model = new mongoose.Schema(
  {
    // _id: {
    //   type: schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: image,
      default: {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: address,
      required: true,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartments",
      },
    ],
    rentedApartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartments",
      },
    ],
    // userApartments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Apartments",
    //   },
    // ],
  },
  { timestamps: true }
);

mongoose.model("Users", model);
/*
{
  "firstName": "adminf",
  "lastName": "adminl",
  "fullName": "adminf adminl",
  "email": "admin@test.com",
  "password": "admin123",
  "address": {
      "country": "Egypt",
      "city": "Tanta"
  }
}
{
  "firstName": "ahmed",
  "lastName": "omar",
  "fullName": "ahmed omar",
  "email": "ahmed@test.com",
  "password": "ahmed123",
  "address": {
      "country": "Egypt",
      "city": "mansoura"
  }
}
{
  "firstName": "abdo",
  "lastName": "mousa",
  "fullName": "abdo mousa",
  "email": "abdo@test.com",
  "password": "abdo123",
  "address": {
      "country": "Egypt",
      "city": "Cairo"
  }
}
*/
