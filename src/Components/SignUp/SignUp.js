import React, { useState} from "react";
import styled from "styled-components";
import LoginInput from "../LoginInput/LoginInput";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ChatState } from "../Context/ChatProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpBox = styled.form`
  width: 100%;
  height: 80%;
  top: 20%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-evenly;
  position: absolute;
  padding-left: 8%;
  .btn {
    @media screen and (max-width: 950px) {
      width: 100%;
    }
  }
  .sign {
    width: 40%;
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
    @media screen and (max-width: 950px) {
      width: 100%;
    }
  }
`;
const UploadBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;

  @media screen and (max-width: 950px) {
    flex-direction: column;
    height: 30%;
  }
`;

const Input = styled("input")({
  display: "none",
});

const SignUp = ({ setSignUpAlert, setSignUpDoneAlert }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [picUrl, setPics] = useState();
  const [loading,setLoading] = useState(false);
  const {setAfterLogin} = ChatState();
  const navigate = useNavigate();

 
  const sendDataToMongo = async (data) => {
    //data sending to mongo
    setSignUpAlert(false);
    setSignUpDoneAlert(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const pic = picUrl;
      const mainData = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      setSignUpDoneAlert(true);

      localStorage.setItem("userInfo", JSON.stringify(mainData));

      setAfterLogin(true);
      setTimeout(() => navigate("/chat"), 2000);

    } catch (error) {
      setSignUpAlert(true);
      console.log(error);
    }
  };
 

  function UploadImage(pic){
    //upload Image
    setLoading(true);
    const dp = new FormData();
  
    dp.append("file", pic);
    dp.append("upload_preset", "chat-app");
    dp.append("cloud_name", "docvmut4w");
    fetch("https://api.cloudinary.com/v1_1/docvmut4w/image/upload", {
      method: "POST",
      body: dp,
    })
      .then((res) => res.json())
      .then((data) => {
        
        setPics(data.url.toString());
        setLoading(false);
      })
      
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  function getDetails(data) {
    if (data.password !== data.confirmPassword) {
      toast.error("Password Doesn't Match!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      sendDataToMongo(data);
    }
  }

  return (
    <SignUpBox onSubmit={handleSubmit(getDetails)}>
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
      <LoginInput
        register={{ ...register("name", { required: true }) }}
        label="Name"
        placeholder="Enter Your Name"
        type="text"
      />
      {errors.name && (
        <small style={{ color: "red" }}>This Field is required</small>
      )}

      <LoginInput
        register={{ ...register("email", { required: true }) }}
        label="Email Address"
        placeholder="Enter Your Email Address"
        type="email"
      />
      {errors.email && (
        <small style={{ color: "red" }}>This Field is required</small>
      )}

      <LoginInput
        register={{ ...register("password", { required: true }) }}
        label="Password"
        placeholder="Enter Password"
        type="password"
      />
      {errors.password && (
        <small style={{ color: "red" }}>This Field is required</small>
      )}

      <LoginInput
        register={{ ...register("confirmPassword", { required: true }) }}
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
      />
      {errors.confirmPassword && (
        <small style={{ color: "red" }}>This Field is required</small>
      )}

      <UploadBox>
        <label htmlFor="contained-button-file">
          <Input
            onChange={(e) => UploadImage(e.target.files[0])}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button className="btn" variant="contained" component="span">
            Upload A Picture
          </Button>
        </label>
        {loading ? <CircularProgress/>:<Button
            type="submit"
            className="btn sign"
            variant="contained"
            size="medium"
            disabled={loading}
          >
            Sign Up
          </Button>}
       
        
      </UploadBox>
    </SignUpBox>
  );
};

export default SignUp;
