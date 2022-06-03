import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

const UserListBox = styled.div`
  width: 90%;
  height: fit-content;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 0px 14px 2px #223456 inset;
  padding-top: 1vh;
  padding-bottom: 1vh;
  display: flex;
  justify-content: space-evenly;
  margin-top: 2vh;
  :hover {
    cursor: pointer;
    box-shadow: 2px 0px 14px 0px white inset;
    background-color: #223456;
    color: antiquewhite;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

const UserListItem = ({ name, email, selectUserToChat,pic }) => {
  return (
    <UserListBox onClick={selectUserToChat}>
      <Avatar alt={name} src={pic} className="avatar" />
      <div>
        <h1>{name}</h1>
        <small>
          Eamil: <b>{email}</b>
        </small>
      </div>
    </UserListBox>
  );
};

export default UserListItem;
