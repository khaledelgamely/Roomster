const mongoose = require("mongoose");
const User = mongoose.model("Users");
const ApiFeature = require("../utils/ApiFeature");
const Reservation = mongoose.model("Reservations");
const Apartments = mongoose.model("Apartments");
const ObjectId = require("mongoose").Types.ObjectId;
const CryptoJS = require("crypto-js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

module.exports.getAllUsers = (request, response, next) => {
  const apiFeature = new ApiFeature(
    User.find()
      .populate({
        path: "favourites",
        // select: { fullName: 1, email: 1, _id: 0 },
      })
      .populate({
        path: "rentedApartments",
        // select: { fullName: 1, email: 1, _id: 0 },
      }),
    request.query
  );
  apiFeature
    .search()
    .sort()
    .mongooseQuery.then((data) => {
      if (!data) {
        let error = new Error("there're no users to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ data: data, page: apiFeature.page });
    })
    .catch((error) => next(error));
};

module.exports.getSingleUser = (request, response, next) => {
  User.findOne({ _id: request.params.id }, { password: 0 })
    .find()
    .populate({
      path: "favourites",
      // select: { fullName: 1, email: 1, _id: 0 },
    })
    .populate({
      path: "rentedApartments",
      // select: { fullName: 1, email: 1, _id: 0 },
    })
    .then((data) => {
      if (!data) {
        let error = new Error("there're no user to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.updateSingleUser = (request, response, next) => {
  if (request.body.password) {
    request.body.password = CryptoJS.AES.encrypt(
      request.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  User.updateOne({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(data);
      response.status(200).json({ data: "edit User successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.updateSingleUser = (request, response, next) => {
  // if (request.body.password) {
  //   request.body.password = CryptoJS.AES.encrypt(
  //     request.body.password,
  //     process.env.PASS_SEC
  //   ).toString();
  // }
  User.updateOne({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(data);
      response.status(200).json({ data: "edit User successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.changeSingleUserPassword = (request, response, next) => {
  request.body.password = CryptoJS.AES.encrypt(
    request.body.password,
    process.env.PASS_SEC
  ).toString();

  User.updateOne({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(data);
      response
        .status(200)
        .json({ message: "password changed successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.deleteSingleUser = (request, response, next) => {
  User.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ data: "deleted  User successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.getFavourites = (request, response, next) => {
  const apiFeature = new ApiFeature(
    User.find({ _id: request.params.id }, { favourites: 1 }).populate({
      path: "favourites",
      // select: { fullName: 1, email: 1, _id: 0 },
    }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((data) => {
      if (!data) {
        let error = new Error("there're no user to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.addFavourite = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $addToSet: { favourites: request.body.apartmentId } }
  )
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite Added successfully..!", data });
    })
    .catch((error) => next(error));
};
module.exports.removeFavourite = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $pull: { favourites: request.body.apartmentId } }
  )
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite removed successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.clearFavourites = (request, response, next) => {
  User.updateOne({ _id: request.params.id }, { $set: { favourites: [] } })
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite cleared successfully..!", data });
    })
    .catch((error) => next(error));
};
////////////////////
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users",
    // format: async (req, file) => "png", // example of using async function to set// the file format dynamically based on the request and file properties
  },
});
/////////////////
exports.upload = multer({ storage: storage });
exports.addProfileImage = (request, response, next) => {
  const publicId = request.file.path.replace(/^.*[\\\/]/, "").split(".")[0];
  const image = { url: request.file.path, publicId: publicId };
  User.updateOne({ _id: request.params.id }, { $set: { image: image } })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "image added to user successfully" });
    })
    .catch((err) => next(err));
};

exports.deleteProfileImage = (request, response, next) => {
  User.findOne({
    _id: request.params.id,
  })
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      cloudinary.uploader
        .destroy("users/" + request.body.imageId)
        .then((result) => {
          console.log(result);
          if (result.result == "not found") {
            let error = new Error("image id is not correct");
            error.statusCode = 404;
            throw error;
          }
          User.updateOne(
            { _id: request.params.id },
            {
              $set: { "image.url": "", "image.publicId": "" },
            }
          )
            .then((doc) => {
              if (doc.matchedCount == 0) {
                let error = new Error("this apartment doesn't exist");
                error.statusCode = 404;
                throw error;
              }
              response
                .status(200)
                .json({ message: " image is deleted successfully" });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.updateProfileImage = (request, response, next) => {
  const publicId = request.file.path.replace(/^.*[\\\/]/, "").split(".")[0];
  const image = { url: request.file.path, publicId: publicId };

  User.findOne({
    _id: request.params.id,
  })
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      cloudinary.uploader
        .destroy("users/" + request.body.imageId)
        .then((result) => {
          console.log(result);
          if (result.result == "not found") {
            let error = new Error("image id is not correct");
            error.statusCode = 404;
            throw error;
          }
          User.updateOne(
            { _id: request.params.id },
            {
              $set: { image: image },
            }
          )
            .then((doc) => {
              if (doc.matchedCount == 0) {
                let error = new Error("this apartment doesn't exist");
                error.statusCode = 404;
                throw error;
              }
              response
                .status(200)
                .json({ message: " image is updated successfully", image:image });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.getUserReservations = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Reservation.find({ userId: request.params.id }).populate({
      path: "apartmentId",
      select: { apartmentSpecification: 0, reservationsArr: 0 },
    }),
    request.query
  );

  apiFeature
    .fields()
    .search()
    .filter()
    .sort()
    .paginate()
    .mongooseQuery.then((data) => {
      if (!data) {
        let error = new Error("there're no reservations to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));

  // Reservation.find({ userId: request.params.id })
  //   .populate({
  //     path: "apartmentId",
  //     select: { apartmentSpecification: 0, reservationsArr: 0 },
  //   })
  //   .then((data) => {
  //     if (!data) {
  //       let error = new Error("there're no reservations to show");
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     response.status(200).json(data);
  //   })
  //   .catch((error) => next(error));
};

module.exports.getUserApartments = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Apartments.find({ userId: request.params.id }).populate({
      path: "userId",
      select: {
        fullName: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        _id: 1,
        image: 1,
      },
    }),
    request.query
  );

  apiFeature
    .fields()
    .search()
    .filter()
    .sort()
    .paginate()
    .mongooseQuery.then((data) => {
      if (!data) {
        let error = new Error("there're no apartments to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));

  // Apartments.find({ userId: request.params.id })
  //   .then((data) => {
  //     if (!data) {
  //       let error = new Error("there're no apartments to show");
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     response.status(200).json(data);
  //   })
  //   .catch((error) => next(error));
};
module.exports.getAllReservations = (request, response, next) => {
  Reservation.find({})
    .then((data) => {
      if (!data) {
        let error = new Error("there're no reservations to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.getSingleReservations = (request, response, next) => {
  Reservation.find({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        let error = new Error("there're no reservations to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

const Apartment = mongoose.model("Apartments");
exports.getStats = async (request, response, next) => {
  console.log('getStats working');
  try {
    const usersCount = await User.countDocuments({});
    const apartmentsCount = await Apartment.countDocuments({ published: true });
    const reservationsCount = await Reservation.countDocuments({});
    const initialArray = [
      {
        $match: {
          published: true,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "apartmentId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRating: {
            $avg: "$reviews.rate",
          },
        },
      },
      {
        $addFields: {
          avgRating: {
            $ifNull: [{ $avg: "$reviews.rate" }, 0], // replace null with 0
          },
        },
      },
      {
        $project: {
          avgRating: 1,
        },
      },

      {
        $group: {
          _id: "$avgRating",
          count: { $sum: 1 },
        },
      },
      // {
      //   $group: {
      //     _id: {
      //       $cond: {
      //         if: { $gte: ["$avgRating", 4] }, // >= 4
      //         then: "4-5",
      //         else: {
      //           $cond: {
      //             if: { $gte: ["$avgRating", 3] }, // >= 3
      //             then: "3-4",
      //             else: {
      //               $cond: {
      //                 if: { $gte: ["$avgRating", 2] }, // >= 2
      //                 then: "2-3",
      //                 else: {
      //                   $cond: {
      //                     if: { $eq: ["$avgRating", 0] }, // = 0
      //                     then: "0",
      //                     else: "1-2",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //     count: { $sum: 1 },
      //   },
      // },
    ];
    const apartmentsRatingclassification = await Apartment.aggregate(
      initialArray
    );
    response.status(200).json({
      apartmentsRatingclassification,
      apartmentsCount,
      usersCount,
      reservationsCount,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
