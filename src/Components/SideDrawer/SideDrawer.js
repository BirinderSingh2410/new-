import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import UserListItem from "../UserListItem/UserListItem";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatLoading from "../ChatLoading/ChatLoading";
import List from "@mui/material/List";
import AlertBox from "../AlertBox/AlertBox";
import { ChatState } from "../Context/ChatProvider";
import { getSenderName } from "../../Config/ChatLogics";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideDrawerBox = styled.div`
  height: 12vh;
  display: flex;
  width: 95%;
  margin-top: 2vh;
  align-self: center;
  border-radius: 10px;
  background-color: 223456;
  justify-content: space-between;
  align-items: center;
  .drawer {
    .go-btn {
      background-color: white;
      box-shadow: 0px 0px 10px #78d9e0 inset;
      :hover {
        background-color: #78d9e0;
        box-shadow: 0px 0px 10px white inset;
      }
    }
  }
  .search-btn {
    height: 45px;
    width: 200px;
    border-radius: 10px;
    margin-left: 2vw;
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
const NotifictaionBox = styled.div`
  display: flex;
  margin-right: 4vw;
  justify-content: space-evenly;
  width: 15%;
  .profile-menu {
    width: 10vw;
  }

  .profile-btn {
    height: 100%;
    transition: 0.5s;
    background-size: 200% auto;
    background-image: radial-gradient(
      circle,
      rgba(235, 235, 235, 1) 0%,
      rgba(181, 181, 181, 1) 100%
    );
    border-radius: 10px;
    color: black;
    margin: auto;
    div {
      display: flex;
    }

    :hover {
      background-position: right center;
      background-color: #78d9e0;
      box-shadow: 0px 0px 10px white inset;
      cursor: pointer;
    }
  }
`;
const NotificationIconBox = styled.div`
  width: 50px;
  height: 50px;
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
    background: #223456;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #223456;
  }
`;
const ProfileDetails = styled.div`
  display: flex;
  @media only screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const SideDrawer = ({ setProfile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [sideslider, setSlider] = useState(false);
  const [userlist, setUserList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState();
  const [loadingchat, setLoadingChat] = useState(false);
  const [opennotification, setOpenNotification] = useState(false);


  const {
    user,
    setSelectedChat,
    setUser,
    selectedchat,
    setChats,
    chats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const openNotifictaion = Boolean(anchor);

  const notificationClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const notificationClose = () => {
    setAnchor(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logoutHandler() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const handleSearch = async () => {
    //search for the required user to chat with..
    if (search === "") setAlert(true);
    else {
      setAlert(false);
    }
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
      setUserList(data);
    } catch (error) {
      <AlertBox type="error" content="Error occurred while fetching users" />;
    }
  };

  const accessChat = async (userId) => {
    //acess chat with particular user.
    var c= 0;
    if(chats.length > 0){
     
      chats.map((i)=>{
        if(i.users[1]._id == userId){
          console.log("1");
          toast("You are already chatting with the user!!")
          c++;
        }
      })
    }
    console.log("2");
    if(c==0){
      
    try {
      setLoadingChat(true);
      const token = user.data.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((i) => i._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      setSlider(false);
    } catch (error) {
      <AlertBox type="error" content="Error fetching the Chat" />;
    }
    }
  };

  return (
    <SideDrawerBox>
      <Tooltip title="Search User to Chat">
        <Button
          onClick={() => setSlider(true)}
          className="search-btn"
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search User
        </Button>
      </Tooltip>
      <Drawer
        className="drawer"
        anchor="left"
        open={sideslider}
        onClose={() => setSlider(false)}
      >
        
        <List>
          <ListItem>
            <ListItemText>
              <h4>Search User</h4>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
            />
            <Button onClick={handleSearch}>Go</Button>
          </ListItem>
          {loading ? (
            <ListItem>
              {" "}
              <ChatLoading />
            </ListItem>
          ) : (
            <ScrollBar>
              {userlist?.map((i, index) => {
                return (
                  <ListItem>
                    <UserListItem
                      key={i._id}
                      name={i.name}
                      email={i.email}
                      pic={i.pic}
                      selectUserToChat={() => accessChat(i._id)}
                    />
                  </ListItem>
                );
              })}
            </ScrollBar>
          )}
          <ListItem>
            {loadingchat ? (
              <CircularProgress style={{ alignSelf: "center" }} />
            ) : null}
          </ListItem>
        </List>
      </Drawer>

      <h1 style={{ color: "white" }}>Chat Application</h1>
      <NotifictaionBox>
        <NotificationIconBox onClick={notificationClick}>
          <Badge badgeContent={notification.length} color="primary">
            <NotificationsIcon style={{ marginTop: "40%" ,color:notification.length ? "red":"white"}} />
          </Badge>
        </NotificationIconBox>
        <Menu
          id="basic-menu"
          anchorEl={anchor}
          open={openNotifictaion}
          onClose={notificationClose}
        >
          <MenuItem>
            {!notification.length && "No Messages"}
            {notification.map((i) => [
              <MenuItem
                key={i._id}
                onClick={() => {
                  setSelectedChat(i.chat);
                  setNotification(notification.filter((n) => n !== i));
                }}
              >
                {i.chat.isGroupChat
                  ? "New message in " + i.chat.chatName
                  : "New message from " + getSenderName(user, i.chat.users)}
              </MenuItem>,
            ])}
          </MenuItem>
        </Menu>
        <Tooltip title="Profile">
          <Button
            onClick={handleClick}
            className="profile-btn"
            variant="contained"
            startIcon={
              <ProfileDetails>
                <Avatar
                  sx={{ width: 25, height: 25, backgroundColor: "#696969" }}
                  className="avatar"
                  alt={user.data.name}
                  src={user.data.pic}  
                />
                <KeyboardArrowDownIcon />
              </ProfileDetails>
            }
          />
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            style={{ width: "150px" }}
            onClick={() => {
              setProfile(true);
              setAnchorEl(null);
            }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </NotifictaionBox>
    </SideDrawerBox>
  );
};

export default SideDrawer;
