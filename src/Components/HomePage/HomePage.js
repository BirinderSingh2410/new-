import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginBg from "../../asset/images/login-bg.gif";
import LoginDropBox from "../LoginDropBox/LoginDropBox";
import AlertBox from "../AlertBox/AlertBox";

const BackgroundBg = styled.div`
  background-image: url(${loginBg});
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: -webkit-center;
  h1 {
    font-weight: 200;
    font-size: 5em;
    color: white;
    filter: blur(0.5px);
  }
`;

const HomePage = () => {
  const [loginAlert, setLoginAlert] = useState(false);
  const [loginDoneAlert, setLoginDoneAlert] = useState(false);

  const [signUpAlert, setSignUpAlert] = useState(false);
  const [signUpDoneAlert, setSignUpDoneAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chat");
  }, [navigate]);

  return (
    <BackgroundBg>
      {loginAlert ? (
        <AlertBox type="error" content="User Not Registered" />
      ) : null}
      {loginDoneAlert ? (
        <AlertBox type="success" content="Login Successfully" />
      ) : null}
      {signUpAlert ? (
        <AlertBox type="error" content="User Credentials not valid" />
      ) : null}
      {signUpDoneAlert ? (
        <AlertBox type="success" content="User Registered Successfully" />
      ) : null}
      <h1>Welcome !</h1>
      <LoginDropBox
        setLoginAlert={setLoginAlert}
        setLoginDoneAlert={setLoginDoneAlert}
        setSignUpAlert={setSignUpAlert}
        setSignUpDoneAlert={setSignUpDoneAlert}
      />
    </BackgroundBg>
  );
};

export default HomePage;
