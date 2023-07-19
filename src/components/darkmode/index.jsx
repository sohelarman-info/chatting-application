import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeTheme } from "../../features/slice/themeSlice";

const DarkMode = () => {
  const theme = useSelector((state) => state.themeChange.DarkTheme);
  const dispatch = useDispatch();
  const handleThemeChange = (e) => {
    if (e.target.checked) {
      dispatch(DarkModeTheme(true));
      localStorage.setItem("dark", true);
    } else {
      dispatch(DarkModeTheme(false));
      localStorage.removeItem("dark", false);
    }
  };
  return (
    <div className="dark-mode-area">
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={handleThemeChange} checked={theme} />}
          label="Dark Mode"
        />
      </FormGroup>
    </div>
  );
};

export default DarkMode;
