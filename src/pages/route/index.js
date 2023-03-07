import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Url = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <div className="route-title">
          <h2>All Route Here</h2>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={6} md={6} sm={12} lg={4} xl={3}>
            <div className="route-path">
              <Link to="/registration">Sign Up</Link>
            </div>
          </Grid>
          <Grid item xs={6} md={6} sm={12} lg={4} xl={3}>
            <div className="route-path">
              <Link to="/login">Sign In</Link>
            </div>
          </Grid>
          <Grid item xs={6} md={6} sm={12} lg={4} xl={3}>
            <div className="route-path">
              <Link to="/">Blank</Link>
            </div>
          </Grid>
          <Grid item xs={6} md={6} sm={12} lg={4} xl={3}>
            <div className="route-path">
              <Link to="/">Blank</Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Url;
