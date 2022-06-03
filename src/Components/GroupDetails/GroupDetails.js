import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { ChatState } from "../Context/ChatProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AlertBox from "../AlertBox/AlertBox";
import GroupUser from "../GroupUser/GroupUser";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import UserListItem from "../UserListItem/UserListItem";
import { CircularProgress } from "@mui/material";

const Icon = styled.div`
  width: fit-content;
  margin-left: 90%;
  .icon-btn {
    font-size: 40px;
    :hover {
      cursor: pointer;
    }
  }
`;
const GroupDetails = ({ show, setShow, setFetchAgain, fetchAgain }) => {
  const [groupchatname, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchresults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState();
  const [messages, setMessages] = useState([]);
  const [renameLoading, setRenameLoading] = useState();

  const { setSelectedChat, selectedchat, user } = ChatState();

  

  const deleteFromSelected = async (userId) => {
    
    if (selectedchat.groupAdmin !== user.data._id && userId._id !== user.data._id) {
      <AlertBox type="error" content="only admin can remove Someone" />;
      return;
    }
    try {
      setLoading(true);
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedchat._id,
          userId: userId._id,
        },
        config
      );

      userId._id === user.data._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      return <AlertBox type="error" content="Error fetching the Chat" />;
    }
  };
  function renameGroup() {
    if (!groupchatname) return;
    try {
      setRenameLoading(true);
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = axios.put(
        "/api/chat/rename",
        {
          chatId: selectedchat._id,
          chatName: groupchatname,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch {
      return (
        <AlertBox type="error" content="Something went wrong while Renaming" />
      );
      setRenameLoading(false);
    }
    setGroupChatName("");
  }

  const searchUser = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get("/api/user?search=" + search, config);

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      return <AlertBox type="error" content="Error While fetching the user" />;
    }
  };

  const addUser = async (userId) => {
    if (selectedchat.users.find((i) => i._id === userId._id)) {
      //if the user already exist
      return <AlertBox type="info" content="User already exist in the group" />;
    }
    if (selectedchat.groupAdmin !== user.data._id) {
      //if other than group admin adds the user
      return (
        <AlertBox type="error" content="only admin can add to the group" />
      );
    }
    try {
      setLoading(true);
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedchat._id,
          userId: userId._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      return <AlertBox type="error" content="Error fetching the Chat" />;
    }
  };

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
    } catch (error) {
      <AlertBox type="error" content="Error While fetching the messages" />;
    }
  };
  return (
    <Dialog open={show} fullWidth onClose={() => setShow(false)}>
      <DialogContent style={{ textAlign: "end" }}>
        <Icon onClick={() => setShow(false)}>
          <CloseIcon className="icon-btn" />
        </Icon>
      </DialogContent>
      <DialogTitle style={{ textAlign: "-webkit-center" }}>
        {selectedchat.chatName.toUpperCase()}
      </DialogTitle>
      <DialogContent style={{ display: "flex", flexWrap: "wrap" }}>
        {selectedchat.users.map((i) => {
          return (
            <GroupUser
              key={i._id}
              name={i.name}
              deleteUser={() => deleteFromSelected(i)}
            />
          );
        })}
      </DialogContent>
      <DialogContent
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <OutlinedInput
          style={{ width: "75%" }}
          placeholder="Rename Group Title"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <Button
          style={{ width: "20%" }}
          variant="contained"
          onClick={renameGroup}
        >
          Update
        </Button>
      </DialogContent>
      <DialogContent>
        <OutlinedInput
          style={{ width: "100%" }}
          placeholder="Add User"
          onChange={(e) => searchUser(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          searchresults?.map((i) => {
            return (
              <UserListItem
                name={i.name}
                email={i.email}
                selectUserToChat={() => addUser(i)}
              />
            );
          })
        )}
      </DialogContent>
      <DialogContent style={{ textAlign: "center" }}>
        <Button variant="contained" onClick={() => deleteFromSelected(user)}>
          Leave Group
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDetails;
