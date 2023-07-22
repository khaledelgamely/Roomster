// const addUser = (users, userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });

// };
const addUser = (users, userId, socketId) => {
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

const removeUser = (users, socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (users, userId) => {
  return users.find((user) => user.userId === userId);
};
//////////////////////

const handleConnection = (io, socket, users) => {
  console.log("a user connected.", socket.id, users);

  socket.on("addUser", (userId) => {
    addUser(users, userId, socket.id);
    io.emit("getUsers", users);
    console.log("a user added.", socket.id, users);
  });

  socket.on("sendMessage", ({ sender, receiverId, text }) => {
    const user = getUser(users, receiverId);
    io.to(user?.socketId).emit("getMessage", {
      sender,
      text,
    });
  });
  socket.on("sendNotification", ({ sender, receiverId, text }) => {
    const user = getUser(users, receiverId);
    io.to(user?.socketId).emit("getNotification", {
      sender,
      text,
    });
  });
  socket.on("getOnlineUsers", () => {
    io.emit("sentOnlineUsers", users);
  });
  socket.on("disconnect", () => {
    removeUser(users, socket.id);
    io.emit("getUsers", users);
    console.log("a user disconnected!", users);
  });
};

module.exports = {
  handleConnection,
};
