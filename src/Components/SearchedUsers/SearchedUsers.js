import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

const SearchedBox = styled.div`
  text-align: -webkit-center;
`;
const User = styled.div``;

const SearchedUsers = () => {
  return (
    <SearchedBox>
      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      <div>
        <h4></h4>
      </div>
    </SearchedBox>
  );
};

export default SearchedUsers;
