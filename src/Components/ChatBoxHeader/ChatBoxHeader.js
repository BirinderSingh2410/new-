import React, { useState } from "react";
import styled from "styled-components";
import { ChatState } from "../Context/ChatProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getSenderName, getSenderFull } from "../../Config/ChatLogics";
import Profile from "../Profile/Profile";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GroupDetails from "../GroupDetails/GroupDetails";

const ChatBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 2em;
    font-weight: 600;
    margin-left: 2vw;
  }
  .visi-icon {
    width: 50px;
    border-radius: 7px;
    text-align: center;
    height: 30px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 3px;
    transition: 0.5s;
    background-size: 200% auto;
    box-shadow: 0px 0px 10px white inset;
    background-image: radial-gradient(
      circle,
      rgba(235, 235, 235, 1) 0%,
      rgba(181, 181, 181, 1) 100%
    );
    color: black;
    :hover {
      background-position: right center;
      background-color: #78d9e0;

      cursor: pointer;
    }
    margin-bottom: 2vh;
    color: black;
  }
`;
const BackIcon = styled.div`
  width: 30px;
  height: 35px;
  border-radius: 10px;
  border: 2px solid black;
  display: none;
  @media only screen and (max-width: 820px) {
    display: block;
  }
  :hover {
    cursor: pointer;
  }
`;
const ChatBoxHeader = ({ fetchagain, setFetchAgain }) => {
  const [showdetails, setShowDetails] = useState(false);
  const { selectedchat, user } = ChatState();
  const FullSenderDetails = getSenderFull(user, selectedchat.users);

  

  return (
    <ChatBox>
      <h2>
        {selectedchat.isGroupChat
          ? selectedchat.chatName.toUpperCase()
          : getSenderName(user, selectedchat.users)}
      </h2>
      <div className="visi-icon" onClick={() => setShowDetails(true)}>
        <VisibilityIcon />
      </div>
      {selectedchat.isGroupChat ? (
        <GroupDetails
          fetchAgain={fetchagain}
          setFetchAgain={setFetchAgain}
          show={showdetails}
          setShow={setShowDetails}
        />
      ) : (
        <Profile
          profile={showdetails}
          setProfile={setShowDetails}
          name={FullSenderDetails.name}
          email={FullSenderDetails.email}
          pic={FullSenderDetails.pic}
        />
      )}
    </ChatBox>
  );
};

export default ChatBoxHeader;
