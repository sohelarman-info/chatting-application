import { Grid } from "@mui/material";
import React from "react";
import FriendList from "../../components/friendlist";
import FriendRequest from "../../components/friendrequest";
import GroupList from "../../components/grouplist";
import SearchBox from "../../components/searchbox";
import "./style.css";

const Home = () => {
  return (
    <div className="homepage">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SearchBox />
          <GroupList />
          <FriendRequest />
        </Grid>
        <Grid item xs={4}>
          <FriendList />
        </Grid>
        <Grid item xs={4}>
          hello
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
