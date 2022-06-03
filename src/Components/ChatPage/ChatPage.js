import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatBox from "../ChatBox/ChatBox";
import MyChats from "../MyChats/MyChats";
import Profile from "../Profile/Profile";
import SideDrawer from "../SideDrawer/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  background-color: white;
  font-family: cursive;
`;
const MainChatBox = styled.div`
  display: flex;
  height: 85%;
`;
const ChatPage = () => {
  const { user,afterLogin,setAfterLogin } = ChatState();
  const {profileLogin} = ChatState();
  const [profile, setProfile] = useState(false);
  const [fetchagain, setFetchAgain] = useState(false);

  
  if(afterLogin){
    window.location.reload();
    setAfterLogin(false);
  }

  return (
    <ChatContent>
      {profile ? (
        <Profile
          profile={profile}
          setProfile={setProfile}
          name={user.data.name}
          email={user.data.email}
          pic={user.data.pic}
        />
      ) : null}
      {user && <SideDrawer setProfile={setProfile} />}

      <MainChatBox>
        {user && <MyChats fetchAgain={fetchagain} />}
        {user && (
          <ChatBox fetchagain={fetchagain} setFetchAgain={setFetchAgain} />
        )}
      </MainChatBox>
    </ChatContent>
  );
};

export default ChatPage;
