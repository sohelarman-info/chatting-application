import React from "react";
import "./style.css";
import { Grid } from "@mui/material";
import ChatGroup from "../../components/chatgroup";
import ChatFriends from "../../components/chatfriend";
import ChatBox from "../../components/chatbox";

const Messages = () => {
  return (
    <div>
      <Grid container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ChatGroup />
            <ChatFriends />
          </Grid>
          <Grid item xs={8}>
            <ChatBox />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Messages;
