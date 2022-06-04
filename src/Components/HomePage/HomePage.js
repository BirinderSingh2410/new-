import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginBg from "../../asset/images/login-bg.gif";
import LoginDropBox from "../LoginDropBox/LoginDropBox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
     <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          value=""/>
      {loginAlert ? (
        <div style={{display:"none"}}>
          {toast.error("User Not Registered!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })}</div>
        
      ) : null}
      {loginDoneAlert ? (
        <div style={{display:"none"}}>{toast("Login Successfull!!")}</div>
      ) : null}
      {signUpAlert ? (
        <div style={{display:"none"}}>
          {toast.error("User Credentials Not valid!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })}</div>
      ) : null}
      {signUpDoneAlert ? (
        <div style={{display:"none"}}>{toast("User Registered Successfull!!")}</div>
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
