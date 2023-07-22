require("./models/userModel");
require("./models/apartmentModel");
require("./models/reviewModel");
require("./models/reservationModel");
require("./models/notificationModel");
require("./models/conversationModel");
require("./models/messageModel");
const express = require("express");
const cors = require("cors");
// const multer = require("multer");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const apartmentRouter = require("./routes/apartmentRoute");
const reviewRouter = require("./routes/reviewRoute");
const notificationRoute = require("./routes/notificationRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
const stripe = require("stripe")(process.env.stripe_client_secret);
const server = express();
const socketio = require("socket.io");
// const { handleConnection } = require("./socket-io/socket");
//############################################################################

// Enable CORS and allow PATCH method for any origin
let port = process.env.PORT || 3030;
// let port = process.env.PORT || 8080;

//############################################################################
server.use(express.json());
server.use(morgan("common"));
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
//############################################################################
server.use(express.json());
server.use(morgan("common"));

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// ###__socket__functions__#############################
let users = [];
const addUser = (userId, socketId) => {
  const userExists = users.some((user) => user.userId === userId);
  if (!userExists) {
    users.push({ userId, socketId });
  } else {
    users.forEach((user) => {
      if (user.userId === userId) {
        user.socketId = socketId;
      }
    });
  }
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
//####__server_and_db_initialization__########################################

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected ");
    const expressServer = server.listen(port, () => {
      console.log(`server is listening at port: ${port}`);
    });
    // console.log("expressServer", expressServer);
    const io = socketio(expressServer, {
      cors: {
        origin: "*",
        // methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log("a user added.", socket.id, users);
      });

      socket.on("sendMessage", ({ sender, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
          sender,
          text,
        });
      });
      socket.on("sendNotification", ({ sender, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getNotification", {
          sender,
          text,
        });
      });
      socket.on("getOnlineUsers", () => {
        io.emit("sentOnlineUsers", users);
      });
      socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log("a user disconnected!", users);
      });
    });
  })
  .catch((error) => console.log(error));

//#####################################################__routes__##########################################################
server.use("/auth", authRoute);
server.use("/user", userRoute);
server.use("/apartments", apartmentRouter);
server.use("/reviews", reviewRouter);
server.use("/notifications", notificationRoute);
server.use("/conversations", conversationRoute);
server.use("/messages", messageRoute);

//######################### Create a PaymentIntent with the order amount and currency######################################

server.post("/create-payment-intent", async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const { amount, currency } = req.body;
  console.log(amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
//#######################################################################
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
