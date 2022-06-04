import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginInput from "../LoginInput/LoginInput";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const LoginBox = styled.form`
  width: 100%;
  position: absolute;
  height: 65%;
  top: 20%;
  display: flex;
  padding-left: 8%;
  flex-direction: column;
  text-align: left;
  justify-content: space-evenly;

  .btn {
    width: 80%;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    background-image: radial-gradient(
      circle,
      rgba(63, 231, 251, 1) 0%,
      rgba(204, 70, 252, 1) 100%
    );
    :hover {
      background-position: right center;
    }
  }
  .guest {
    background-color: orangered;
    width: 80%;
    :hover {
      background-color: firebrick;
    }
  }
`;

const Login = ({ setLoginAlert, setLoginDoneAlert }) => {
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { setAfterLogin }  = ChatState();

  const loginDetails = async (data) => {
    setLoginAlert(false);
    setLoginDoneAlert(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const email = data.email;
      const password = data.password;
      const mainData = await axios.post(
        "/api/user/login",
        { password, email },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(mainData));

      setLoginDoneAlert(true);
      
      setAfterLogin(true)

      setTimeout(() => {navigate("/chat")}, 2000);
      
    } catch (error) {
      setLoginAlert(true);
    }
  };

  return (
    <LoginBox onSubmit={handleSubmit(loginDetails)}>
      <LoginInput
        register={{ ...register("email", { required: true }) }}
        type="email"
        label="Email Address"
      />
      {errors.email && (
        <small style={{ color: "red" }}>This field is required</small>
      )}

      <LoginInput
        register={{ ...register("password", { required: true }) }}
        type="password"
        label="Password"
      />
      {errors.email && (
        <small style={{ color: "red" }}>This field is required</small>
      )}

      <Button type="submit" className="btn" variant="contained" size="medium">
        Login
      </Button>
    </LoginBox>
  );
};

export default Login;
