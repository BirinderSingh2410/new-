import React, { useState } from "react";
import styled from "styled-components";
import Input from "@mui/material/Input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Label = styled.h2`
  font-size: 15px;
  color: white;
  font-weight: 400;
  ::after {
    content: "*";
    color: red;
  }
  margin-top: 5px;
`;
const InputBox = styled.div`
  .input-bar {
    width: 80%;
    font-size: 12px;
    color: white;
    margin-top: 2%;
  }
  .eye {
    :hover {
      cursor: pointer;
    }
  }
  .password-input {
    width: 80%;
  }
`;

const LoginInput = (props) => {
  const [visible, setVisible] = useState(false);

  function showPassword() {
    setVisible(!visible);
  }

  return (
    <InputBox>
      <Label>{props.label}</Label>
      {props.label === "Password" || props.label === "Confirm Password" ? (
        <Input
          {...props.register}
          type={visible ? "text" : "password"}
          placeholder={props.placeholder}
          className="input-bar password-input"
        />
      ) : (
        <Input
          {...props.register}
          type={props.type}
          placeholder={props.placeholder}
          className="input-bar"
        />
      )}
      {props.label === "Password" || props.label === "Confirm Password" ? (
        visible ? (
          <VisibilityIcon className="eye" onClick={showPassword} />
        ) : (
          <VisibilityOffIcon className="eye" onClick={showPassword} />
        )
      ) : null}
    </InputBox>
  );
};

export default LoginInput;
