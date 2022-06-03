import React, { useEffect, useState } from "react";
import AlertBox from "../AlertBox/AlertBox";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatLoading from "../ChatLoading/ChatLoading";
import { getSenderName } from "../../Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import CreateGroupPop from "../CreateGroupPopUp/CreateGroupPop";

const MyChatsBox = styled.div`
  width: 35%;
  background-color: 223456;
  margin-top: 2vh;
  border-radius: 10px;
  margin-left: 2.5%;
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
`;
const CreateGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2vh;
  h3 {
    font-size: 25px;
  }
  .create-grp {
    transition: 0.5s;
    background-size: 200% auto;
    background-image: radial-gradient(
      circle,
      rgba(235, 235, 235, 1) 0%,
      rgba(181, 181, 181, 1) 100%
    );
    color: black;
    :hover {
      background-position: right center;
      background-color: #78d9e0;
      box-shadow: 0px 0px 10px white inset;
    }
  }
`;
const UserChatsBox = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90%;
  margin-left: 2vw;
`;
const UserChat = styled.div`
  width: 90%;
  border-radius: 10px;
  height: 50px;
  background-color: white;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-top: 2vh;
  align-self: center;
  background-color: white;
  box-shadow: 2px 2px 14px 4px #e9e199 inset;
  color: black;
  h2 {
    margin-left: 2vw;
  }
  :hover {
    cursor: pointer;
    box-shadow: 2px 0px 14px 1px white inset;
    background-color: #e9e199;
  }
`;

const ScrollBar = styled.div`
  height: 80%;
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
    background: #e9e199;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #e9e199;
  }
`;

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [color, setColor] = useState("white");
  const [grouppopup, setGroupPopUp] = useState(false);
  const [name, setName] = useState("");


  const { user, setSelectedChat, setUser, selectedchat, chats, setChats } =
    ChatState();

    

  const fetchChats = async () => {
    try {
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      <AlertBox type="error" content="Error fetching the chat" />;
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <MyChatsBox>
      <CreateGroup>
        <h3>My Chats</h3>
        <Button
          className="create-grp"
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => setGroupPopUp(true)}
        >
          Create Group
        </Button>
      </CreateGroup>
      {grouppopup ? (
        <CreateGroupPop setGroupPopUp={setGroupPopUp} grouppopup={grouppopup} />
      ) : null}
      <hr />
      <UserChatsBox>
        {chats ? (
          <ScrollBar>
            {chats.map((i, index) => (
              <UserChat
                key={i._id}
                onClick={() => {
                  setSelectedChat(i);
                  setColor("#78d9e0");
                }}
                style={{ backgroundColor: { color } }}
              >
                <h2>
                  {i.isGroupChat
                    ? i.chatName
                    : getSenderName(loggedUser, i.users)}
                </h2>
              </UserChat>
            ))}
          </ScrollBar>
        ) : (
          <ChatLoading />
        )}
      </UserChatsBox>
    </MyChatsBox>
  );
};

export default MyChats;
