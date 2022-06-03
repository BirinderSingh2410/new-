import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatState } from "../Context/ChatProvider";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader";
import ChatBoxMessage from "../ChatBoxMessage/ChatBoxMessage";

const ChatBox = styled.div``;
const NoUserSelected = styled.h1`
  font-size: 1.8em;
  font-weight: 300;
  text-align: -webkit-center;
  margin-top: 30%;
`;

const ChatBoxContent = ({ fetchagain, setFetchAgain }) => {
  const { user, selectedchat, setSelectedChat } = ChatState();

  return (
    <div>
      {selectedchat ? (
        <div>
          <ChatBoxHeader
            fetchagain={fetchagain}
            setFetchAgain={setFetchAgain}
          />
          <ChatBoxMessage
            fetchAgain={fetchagain}
            setFetchAgain={setFetchAgain}
          />
        </div>
      ) : (
        <NoUserSelected>Click the User to start the Chat</NoUserSelected>
      )}
    </div>
  );
};

export default ChatBoxContent;
