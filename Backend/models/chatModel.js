//Schema for the Chat in Mongo
const mongoose = require("mongoose"); //importing mongoose Lib

const chatModel = mongoose.Schema(
  //Data schema
  {
    chatName: { type: String, trim: true }, //trim is for spaces
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      //latest message that came
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true, //time ,whenever new chat is added
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
