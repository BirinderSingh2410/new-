const express = require("express");
const chat = require("./chat.js");
const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const userRoutes = require("./Routes/userRoutes");
const { notFound, errorHandler } = require("./middelware/errorMiddleware");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
  //getting response from server
  res.send("hello server");
});

app.use("/api/user", userRoutes); //calling the router from userRoutes
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound); //when we hit to wrong url
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(5000, console.log(PORT));

const io = require("socket.io")(server, {
  pingTimeout: 600000, //this time is to stop the connection if no mssg is sent
  cors: {
    //for avoiding errors
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //build the io connection with "connection" as its name
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    //data from frontend and join the room and can access that particular user only
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    //creates a room with that particular user who joined thechat for realTime chat
    socket.join(room);
    console.log("User joined Room " + room);
  });

  socket.on("typing", (room) => {
    //typing symbol to the user chat with
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    //stop typing when user sent message
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    //to send message in that room
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved); //emitting message to that room id
    });
  });

  socket.off("setup", () => {
    //connection disconnected
    console.log("User disconnected");
    socket.leave(userData._id);
  });
});
