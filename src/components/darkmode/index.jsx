import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import "./style.css";

const DarkMode = () => {
  return (
    <div className="dark-mode-area">
      <FormGroup>
        <FormControlLabel control={<Switch />} label="Dark Mode" />
      </FormGroup>
    </div>
  );
};

export default DarkMode;
