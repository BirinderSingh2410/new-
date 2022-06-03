import React from "react";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";

const ChatLoadingBox = styled.div`
  text-align: -webkit-center;
  width: 100%;
  .skel {
    width: 90%;
    height: 50px;
  }
`;

const ChatLoading = () => {
  return (
    <ChatLoadingBox>
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
      <Skeleton className="skel" animation="wave" />
    </ChatLoadingBox>
  );
};

export default ChatLoading;
