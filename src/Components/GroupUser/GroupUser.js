import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const GroupUserBox = styled.div`
  width: fit-content;
  background-color: #78d9e0;
  border-radius: 5px;
  padding-top: 3px;
  padding-left: 3px;
  justify-content: space-between;
  padding-bottom: 3px;
  padding-right: 3px;
  color: black;
  height: 20px;
  display: flex;
  border: 2px solid white;
  .close-btn {
    :hover {
      cursor: pointer;
    }
  }
`;

const GroupUser = ({ name, deleteUser }) => {
  return (
    <GroupUserBox>
      <p>{name}</p>
      <div onClick={deleteUser}>
        <CloseIcon className="close-btn" />
      </div>
    </GroupUserBox>
  );
};

export default GroupUser;
