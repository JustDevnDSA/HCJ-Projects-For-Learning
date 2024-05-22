// NODE SERVER WHICH WILL HANDLE SOCKET IO CONNECTION

const io = require("socket.io")({
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  //If any new user joins let other users in the server know
  socket.on("new-user-joined", (name) => {
    console.log("New user ", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  // If someone sends a message, broadcast it to the other people
  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });


  // If someone leaves the chat, let others
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

io.listen(8000);
