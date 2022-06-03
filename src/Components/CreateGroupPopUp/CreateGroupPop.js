import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions } from "@mui/material";
import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CircularProgress } from "@mui/material";
import AlertBox from "../AlertBox/AlertBox";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import GroupUser from "../GroupUser/GroupUser";
import UserListItem from "../UserListItem/UserListItem";

const CreateGroupBox = styled.div``;

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

const CreateGroupPop = ({ grouppopup, setGroupPopUp }) => {
  const [groupname, setGroupName] = useState("");
  const [selectedusers, setSelecteUsers] = useState([]);
  const [addusers, setAddUsers] = useState("");
  const [searchresult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const searchUser = async (query) => {
    setAddUsers(query);
    if (query === "") return;
    try {
      setLoading(true);
      const token = user.data.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get("/api/user?search=" + addusers, config);
      setSearchResult(data);
      await setLoading(false);
    } catch (error) {
      <AlertBox type="error" content="Error fetching the Users" />;
    }
  };

  const addToGroup = (usertoadd) => {
    if (selectedusers.includes(usertoadd)) {
      return <AlertBox type="info" conetent="User already Added" />;
    } else {
      setSelecteUsers([...selectedusers, usertoadd]);
    }
  };

  const deleteFromGroup = (deleteuser) => {
    setSelecteUsers(selectedusers.filter((i) => i._id !== deleteuser._id));
  };

  const createGroup = async () => {
    if (selectedusers.length === 0 || groupname === "") {
      return <AlertBox type="error" content="Please Fill All the Fields" />;
    } else {
      try {
        const token = user.data.token;
        const config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.post(
          "/api/chat/group",
          {
            name: groupname,
            users: JSON.stringify(selectedusers.map((i) => i._id)),
          },
          config
        );
        setChats([data, ...chats]); //adding to the chats array
        setGroupPopUp(false);
        <AlertBox type="success" content="Group Created" />;
      } catch (error) {
        return (
          <AlertBox
            type="error"
            content="Something went wrong while creating Group"
          />
        );
      }
    }
  };
  return (
    <CreateGroupBox>
      <Dialog
        sx={{ textAlign: "center" }}
        fullWidth
        open={grouppopup}
        keepMounted
        onClose={() => setGroupPopUp(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <h1>Create Group Chat</h1>
        </DialogTitle>
        <DialogContent>
          <OutlinedInput
            onChange={(e) => setGroupName(e.target.value)}
            style={{ width: "90%" }}
            placeholder="Group name"
            className="input"
          />
        </DialogContent>
        <DialogContent>
          <OutlinedInput
            onChange={(e) => searchUser(e.target.value)}
            style={{ width: "90%" }}
            placeholder="Add Users"
          />
        </DialogContent>
        <DialogContent sx={{ display: "flex", flexWrap: "wrap" }}>
          {selectedusers ? (
            selectedusers?.map((i) => {
              return (
                <GroupUser
                  key={i._id}
                  name={i.name}
                  deleteUser={() => deleteFromGroup(i)}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </DialogContent>
        <DialogContent sx={{ height: "100px", overflowY: "hidden" }}>
          <ScrollBar>
            {loading ? (
              <CircularProgress />
            ) : (
              <DialogContent>
                {searchresult?.map((i) => {
                  return (
                    <UserListItem
                      name={i.name}
                      email={i.email}
                      selectUserToChat={() => addToGroup(i)}
                    />
                  );
                })}
              </DialogContent>
            )}
          </ScrollBar>
        </DialogContent>
        <DialogContent>
          <Button
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 0px 10px #78d9e0 inset",
              marginBottom: "2vh",
              color: "black",
            }}
            variant="contained"
            className="create-grp"
            onClick={() => createGroup()}
          >
            Create Chat
          </Button>
        </DialogContent>
      </Dialog>
    </CreateGroupBox>
  );
};

export default CreateGroupPop;
