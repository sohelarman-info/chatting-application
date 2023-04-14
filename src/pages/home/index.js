import { Grid } from "@mui/material";
import React from "react";
import BlockList from "../../components/blocklist";
import CancelFriendRequest from "../../components/cancelrequest";
import FriendList from "../../components/friendlist";
import FriendRequest from "../../components/friendrequest";
import GroupList from "../../components/grouplist";
import MyGroups from "../../components/mygroups";
import SearchBox from "../../components/searchbox";
import UserList from "../../components/userlist";
import "./style.css";

const Home = () => {
  return (
    <div className="homepage">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div>
            <GroupList />
          </div>
          <div>
            <UserList />
          </div>
          <div>
            <CancelFriendRequest />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <MyGroups />
          </div>
          <div>
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <FriendList />
          </div>
          <div>
            <BlockList />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
