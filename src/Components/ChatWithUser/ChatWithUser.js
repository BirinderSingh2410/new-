import React from "react";
import styled from "styled-components";

const ChatWithUserBox = styled.div`
  width: 100%;
  border-radius: 5px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  box-shadow: 0px 0px 10px #78d9e0 inset;
  color: black;
  :hover {
    background-color: #78d9e0;
    box-shadow: 0px 0px 10px white inset;
    cursor: pointer;
  }
`;

const ChatWithUser = ({ name, color, groupname }) => {
  return (
    <ChatWithUserBox style={{ backgroundColor: color }}>
      <h1>{name}</h1>
    </ChatWithUserBox>
  );
};

export default ChatWithUser;
