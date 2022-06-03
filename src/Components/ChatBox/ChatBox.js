import React from "react";
import styled from "styled-components";
import { ChatState } from "../Context/ChatProvider";
import ChatBoxContent from "../ChatBoxContent/ChatBoxContent";

const ChatContentBox = styled.div`
  display: flex;
  width: 59%;
  background-color: A1A0A0;
  border-radius: 10px;
  margin-top: 2vh;
  margin-left: 1%;
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
  color: black;
`;
const ChatInnerBox = styled.div`
  width: 95%;
  height: 98%;
  align-self: center;
`;

const ChatBox = ({ fetchagain, setFetchAgain }) => {
  const { user, chat, selectedchat } = ChatState();

  return (
    <ChatContentBox>
      <ChatInnerBox>
        <ChatBoxContent fetchagain={fetchagain} setFetchAgain={setFetchAgain} />
      </ChatInnerBox>
    </ChatContentBox>
  );
};

export default ChatBox;
