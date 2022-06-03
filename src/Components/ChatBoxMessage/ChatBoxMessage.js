import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, OutlinedInput } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";
import AlertBox from "../AlertBox/AlertBox";
import ScrollableChat from "../ScrollableChat/ScrollableChat";
import TypingGif from "../../asset/images/dots_2.gif";
import io from "socket.io-client";

const ChatBox = styled.div`
  width: 100%;
  background-color: #d1d1d1;
  height: 90%;
  border-radius: 10px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 2vh;
  height: 10%;
  .input {
    width: 80%;
  }
  .send-btn {
    color: antiquewhite;
    transition: 0.5s;
    background-size: 200% auto;
    background-image: radial-gradient(
      circle,
      rgba(61, 83, 125, 1) 0%,
      rgba(34, 52, 86, 1) 55%
    );
    :hover {
      background-position: right center;
      background-color: #78d9e0;
      box-shadow: 0px 0px 10px white inset;
    }
  }
`;
const MessagesBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
`;

const ChatTypingBox = styled.div`
  align-self: start;
`;
const ChatTyping = styled.img`
  width: 70px;
  height: 35px;
  margin-left: 2vw;
  border-radius: 45px;
`;

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatBoxMessage = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newmessage, setNewMessage] = useState();
  const [socketconnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedchat, notification, setNotification } = ChatState();

  useEffect(() => {
    //create connection with socket
    socket = io(ENDPOINT);
    socket.emit("setup", user.data);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //bell icon
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedchat;
  }, [selectedchat]);

  const fetchMessages = async () => {
    if (!selectedchat) return;
    setLoading(true);
    try {
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(
        "/api/message/" + selectedchat._id,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedchat._id); //creating room for the realtime chat with selectedchatID
    } catch (error) {
      <AlertBox type="error" content="Error While fetching the messages" />;
    }
  };

  const sendMessage = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && newmessage) {
      socket.emit("stop typing", selectedchat._id);
      try {
        const token = user.data.token;
        setNewMessage("");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newmessage,
            chatId: selectedchat._id,
          },
          config
        );

        socket.emit("new message", data); //sending data to the room
        setMessages([...messages, data]);
      } catch (error) {
        <AlertBox type="error" content="Error while sending message" />;
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketconnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedchat._id);
    }
    let lastTyping = new Date().getTime();
    var time = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTyping;

      if (timeDiff >= time && typing) {
        socket.emit("stop typing", selectedchat._id);
        setTyping(false);
      }
    }, time);
  };
  return (
    <ChatBox>
      {loading ? (
        <CircularProgress
          style={{ width: "50px", height: "50px", marginTop: "40%" }}
        />
      ) : (
        <MessagesBox>
          <ScrollableChat messages={messages} />
        </MessagesBox>
      )}
      {isTyping ? (
        <ChatTypingBox>
          <ChatTyping src={TypingGif} alt="chat typing gif" />
        </ChatTypingBox>
      ) : null}
      <InputBox>
        <OutlinedInput
          value={newmessage}
          onKeyDown={(e) => sendMessage(e)}
          onChange={(e) => typingHandler(e)}
          placeholder="Enter a Message"
          className="input"
        />
        <Button
          onClick={(e) => sendMessage(e)}
          className="send-btn"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </InputBox>
    </ChatBox>
  );
};

export default ChatBoxMessage;
