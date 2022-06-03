import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const DropBox = styled.div`
  width: 40%;
  height: 450px;
  position: fixed;
  margin-top: 5%;
  margin-left: 30%;
  @media screen and (max-width: 722px) {
    width: 70%;
    margin-left: 15%;
    height: 500px;
  }
`;

const DropBg = styled.div`
  background: black;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  filter: opacity(0.5);
  z-index: 0;
`;

const ButtonsSign = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 20px;
  width: 80%;
  margin-left: 10%;
  justify-content: space-evenly;
  .signup {
    @media screen and (max-width: 722px) {
      margin-top: 8px;
    }
  }
  .btn {
    width: 40%;
    border-radius: 30px;
    height: 40px;
    border: 2px solid #33ccff;
    @media screen and (max-width: 722px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 722px) {
    flex-direction: column;
  }
`;

const LoginDropBox = ({
  setLoginAlert,
  setLoginDoneAlert,
  setSignUpAlert,
  setSignUpDoneAlert,
}) => {
  const [tab, setTab] = useState(false);

  return (
    <DropBox>
      <DropBg />
      <ButtonsSign>
        <Button
          style={
            tab
              ? { backgroundColor: "transparent" }
              : { backgroundColor: "#33ccff" }
          }
          className="btn"
          variant="contained"
          size="medium"
          onClick={() => setTab(false)}
        >
          Login
        </Button>
        <Button
          style={
            tab
              ? { backgroundColor: "#33ccff" }
              : { backgroundColor: "transparent" }
          }
          className="btn signup"
          variant="contained"
          size="medium"
          onClick={() => setTab(true)}
        >
          Sign Up
        </Button>
      </ButtonsSign>
      {tab ? (
        <SignUp
          setSignUpAlert={setSignUpAlert}
          setSignUpDoneAlert={setSignUpDoneAlert}
        />
      ) : (
        <Login
          setLoginAlert={setLoginAlert}
          setLoginDoneAlert={setLoginDoneAlert}
        />
      )}
    </DropBox>
  );
};

export default LoginDropBox;
