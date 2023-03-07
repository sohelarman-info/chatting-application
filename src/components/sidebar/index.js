import React from "react";
import SidebarIcons from "./sidebaricons";

import { ImExit } from "react-icons/im";
import "./style.css";
import { useDispatch } from "react-redux";
import { Loginuser } from "../../features/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(Loginuser(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="sidebar-column">
          <div className="profile-section">
            <div className="profile-pic">
              <picture>
                <img src="./images/profile/avatar.jpg" alt="profile-pic" />
              </picture>
            </div>
          </div>
          <div className="page-section">
            <SidebarIcons />
          </div>
          <div className="logout-section">
            <div className="logout-icon" onClick={handlelogout}>
              <ImExit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
