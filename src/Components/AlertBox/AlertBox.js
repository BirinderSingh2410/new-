import React from "react";
import { Alert } from "@mui/material";
import styled from "styled-components";

const Content = styled.div`
  position: absolute;
  align-self: center;
  z-index: 1000;
  top: 0;
  width: 20%;
  border-radius: 10px;
  margin-left: 40%;
`;

const AlertBox = ({ content, type }) => {
  return (
    <Content>
      <Alert style={{ width: "100%", height: "50px" }} severity={type}>
        {content}
      </Alert>
    </Content>
  );
};

export default AlertBox;
