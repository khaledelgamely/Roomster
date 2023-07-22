const mongoose = require("mongoose");
const User = mongoose.model("Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.login = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      let error = new Error("wrong email!");
      error.status = 401;
      next(error);
    } else {
      const hashedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== request.body.password) {
        let error = new Error("wrong password!");
        error.status = 401;
        next(error);
      } else {
        // console.log(user);
        const { password, ...others } = user._doc;
        const accessTokenn = jwt.sign(
          { ...others, _id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SEC_KEY,
          { expiresIn: "1d" }
        );
        // others.accessToken = accessTokenn;
        response.status(200).json({ accessToken: accessTokenn });
        // console.log("logged in");
      }
    }
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};

exports.signup = async (request, response, next) => {
  const newUser = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    fullName: request.body.fullName,
    email: request.body.email,
    password: CryptoJS.AES.encrypt(
      request.body.password,
      process.env.PASS_SEC
    ).toString(),
    address: request.body.address,
  });
  try {
    // new user
    const savedUser = await newUser.save();
    // console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    response.status(201).json(others);
  } catch (err) {
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
