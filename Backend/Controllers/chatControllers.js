const Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  //to acces chat from userID
  const { userId } = req.body; //requesting current logged In userID

  if (!userId) {
    console.log("userId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    //finding the chats with user if done
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage"); //fetching the latest messages and the users

  isChat = await User.populate(isChat, {
    //fetching the users name with whom chat is done
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    //if chat exist with userID
    res.send(isChat[0]);
  } else {
    //if not we create chat id
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  //to fetch chat for the required Id.
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password") //.populate is to fetch data from the chat model and get used in our frontend
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 }) //sort on the basis of message recieved
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  //so it requires a name for grp and email of users
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More Than 2 users are required to form a group");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      //try catch is to run query
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  //renaming group name
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  //remove user from group
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat not Found");
  } else {
    res.json(removed);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  //add to  group
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
