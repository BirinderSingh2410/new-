import React from "react";
import styled from "styled-components";
import { isSameSenderMargin, isSameUser } from "../../Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollBar = styled.div`
  height: 98%;
  margin-top: 2vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #223456;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #223456;
  }
`;
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollBar>
      {messages &&
        messages.map((i, index) => {
          return (
            <div key={i._id} style={{ display: "flex" }}>
              <span
                style={{
                  backgroundColor:
                    i.sender._id === user.data._id ? "white" : "#797979",
                  color:
                    i.sender._id === user.data._id ? "black" : "whitesmoke",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(
                    messages,
                    i,
                    index,
                    user.data._id
                  ),
                  marginTop: isSameUser(messages, i, index) ? "3" : "10",
                }}
              >
                {i.content}
              </span>
            </div>
          );
        })}
    </ScrollBar>
  );
};

export default ScrollableChat;
