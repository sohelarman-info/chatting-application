import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

const RootLayout = () => {
  return (
    <div>
      <Grid container>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Sidebar />
          </Grid>
          <Grid item xs={11}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RootLayout;
