import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../Context/ChatProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Icon = styled.div`
  width: fit-content;
  margin-left: 90%;
  .icon-btn {
    font-size: 40px;
    :hover {
      cursor: pointer;
    }
  }
`;
const Profile = ({ profile, setProfile, name, email, pic }) => {
  return (
    <Dialog open={profile} onClose={() => setProfile(false)} fullWidth>
      <DialogContent style={{ textAlign: "end" }}>
        <Icon onClick={() => setProfile(false)}>
          <CloseIcon className="icon-btn" />
        </Icon>
      </DialogContent>
      <DialogContent style={{ textAlign: "-webkit-center" }}>
        <Avatar
          style={{ fontSize: "50px" }}
          sx={{ width: 100, height: 100 }}
          alt={name}
          src={pic}
        />
      </DialogContent>
      <DialogContent style={{ textAlign: "-webkit-center" }}>
        <h1>Name:{name}</h1>
      </DialogContent>
      <DialogContent style={{ textAlign: "-webkit-center" }}>
        <p>Email: {email}</p>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
