const mongoose = require("mongoose");
const Apartment = mongoose.model("Apartments");
const Reservation = mongoose.model("Reservations");
const ApiFeature = require("../utils/ApiFeatureAggregate");
const {
  addRentToArr,
  checkIfRentAvailable,
  removeEndedRents,
  deleteCanceledRent,
} = require("../middelwares/rentMW");
const cloudinary = require("cloudinary").v2;
// configuration file
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
const CloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "apartments",
    allowedFormats: ["jpg", "png"],
  },
});
const multer = require("multer");
exports.upload = multer({ storage: storage });

exports.getAllApartments = (request, response, next) => {
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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        reviews: 0,
        "user.password": 0,
        "user.address": 0,
        "user.favourites": 0,
        "user.rentedApartments": 0,
        "user.isAdmin": 0,
      },
    },
  ];
  const apiFeature = new ApiFeature(Apartment, request.query, initialArray);
  const api = apiFeature.filter().search().sort().paginate().fields();
  Apartment.aggregate(api.aggregateArray)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

// b31rp2qoowoxtv8llsen
exports.addNewApartment = (request, response, next) => {
  new Apartment(request.body)
    .save()
    .then((apartDoc) => {
      if (!apartDoc) {
        let error = new Error("can't add this apartment check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(apartDoc);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getApartmentById = (request, response, next) => {
  Apartment.findById(request.params.id)
    .populate({
      path: "userId",
    })
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(doc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteApartment = (request, response, next) => {
  Apartment.deleteOne({ _id: request.params.id })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ message: " apartment is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateApartment = (request, response, next) => {
  Apartment.updateOne({ _id: request.params.id }, request.body)
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({ message: "appartment updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
exports.removeSingleImage = (request, response, next) => {
  // async await version
  // try {
  // const apartment1 = await Apartment.findOne(
  //   { images: { $elemMatch: { publicId: request.body.imageId } } },
  //   { images: 1, _id: 0 }
  // );

  // if (!apartment1) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // const apartment = await Apartment.findOne(
  //   { images: { $elemMatch: { publicId: request.body.imageId } } },
  //   { images: 1, _id: 0 }
  // );

  // if (!apartment) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // const deleteResult = await cloudinary.uploader.destroy(
  //   "apartments/" + request.body.imageId
  // );
  // console.log(deleteResult);

  // const updateResult = await Apartment.updateOne(
  //   { _id: request.params.id },
  //   { $pull: { images: { publicId: request.body.imageId } } }
  // );

  // if (updateResult.matchedCount === 0) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // } catch (error) {
  //   next(error);
  // }

  Apartment.findOne(
    {
      images: { $elemMatch: { publicId: request.body.imageId } },
    },
    { images: 1, _id: 0 }
  )
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      cloudinary.uploader
        .destroy("apartments/" + request.body.imageId)
        .then((result) => {
          console.log(result);

          if (result.result == "not found") {
            let error = new Error("image id is not correct");
            error.statusCode = 404;
            throw error;
          }

          Apartment.updateOne(
            { _id: request.params.id },
            {
              $pull: {
                images: { publicId: request.body.imageId },
              },
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

exports.addSingleImage = (request, response, next) => {
  const result = request.file;
  console.log(result);

  const publicId = request.file.path.replace(/^.*[\\\/]/, "").split(".")[0];

  //   response.status(200).json({ result, publicId });

  const image = { url: request.file.path, publicId: publicId };
  Apartment.updateOne({ _id: request.params.id }, { $push: { images: image } })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({
        message: "image added to apartment successfully",
        imageId: publicId,
      });
    })
    .catch((err) => next(err));
};

exports.addMultipleImages = (request, response, next) => {
  const images = [];
  for (const image of request.files) {
    const publicId = image.path.replace(/^.*[\\\/]/, "").split(".")[0];
    const fetchedImage = { url: image.path, publicId: publicId };
    images.push(fetchedImage);
  }
  Apartment.updateOne(
    { _id: request.params.id },
    { $push: { images: { $each: images } } }
  )
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "images added to apartment successfully" });
    })
    .catch((err) => next(err));
};

exports.rentApartment = (request, response, next) => {
  let rentedArray = [];
  Apartment.findById(request.params.id)
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(
        request.body.startDate,
        request.body.endDate,
        doc.reservationsArr
      );
      const isAvailableForRent = checkIfRentAvailable(
        request.body,
        doc.reservationsArr
      );
      console.log(isAvailableForRent);
      if (isAvailableForRent) {
        const newResevationInSchema = new Reservation({
          userId: request.body.userId,
          apartmentId: request.params.id,
          startDate: request.body.startDate,
          endDate: request.body.endDate,
          totalPrice: request.body.totalPrice,
        });
        rentedArray = doc.reservationsArr;
        return newResevationInSchema.save();
      }
    })
    .then((resultFromResevationSchema) => {
      if (!resultFromResevationSchema) {
        let error = new Error("reservation is overlapping on existed one");
        error.statusCode = 404;
        throw error;
      }
      const newRent = {
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        totalPrice: request.body.totalPrice,
        reservationId: resultFromResevationSchema._id,
      };
      // console.log(rentedArray);
      const newResevationArr = addRentToArr(newRent, rentedArray);
      const udpatedReservationsArr = removeEndedRents(newResevationArr);
      // console.log(udpatedReservationsArr);
      return Apartment.updateOne(
        { _id: request.params.id },
        { $set: { reservationsArr: udpatedReservationsArr } }
      );
    })
    .then((updatedApartmentDoc) => {
      if (updatedApartmentDoc.matchedCount == 0) {
        let error = new Error("cant update apartment reservations array ");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: "rented successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.cancelRent = (request, response, next) => {
  Reservation.findOneAndDelete({ _id: request.params.id })
    .then((reservation) => {
      if (!reservation) {
        let error = new Error("this resrevation doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      // console.log("rservation : ", reservation);
      return Apartment.findOne({ _id: reservation.apartmentId });
    })
    .then((apartment) => {
      if (!apartment) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      // console.log("rented array : ", apartment.reservationsArr);
      const newRentsArr = deleteCanceledRent(
        apartment.reservationsArr,
        request.params.id
      );
      // console.log("new rented array : ", newRentsArr);
      return Apartment.updateOne(
        { _id: apartment._id },
        { $set: { reservationsArr: newRentsArr } }
      );
    })
    .then((updatedApartment) => {
      if (updatedApartment.matchedCount == 0) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ message: " reservation is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
