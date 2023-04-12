import React from "react";
import SidebarIcons from "./sidebaricons";

import { ImExit } from "react-icons/im";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../features/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProfileModal from "../modal/profilemodal";

const Sidebar = () => {
  const auth = getAuth();
  const users = useSelector((user) => user.loginSlice.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
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
            <div className="profile-pic" onClick={handleOpen}>
              <picture>
                {users.photoURL == null ? (
                  <img
                    src="./images/profile/avatar.png"
                    alt={users.displayName}
                  />
                ) : (
                  <img src={users.photoURL} alt={users.displayName} />
                )}
              </picture>
              <div className="profile-upload">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div className="username">
              <h4>{users.displayName}</h4>
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

      <ProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
