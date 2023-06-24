import React, { useEffect, useState } from "react";
import SidebarIcons from "./sidebaricons";

import { ImExit } from "react-icons/im";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../features/slice/UserSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  AiOutlineCloudUpload,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import ProfileModal from "../modal/profilemodal";
import { BsChatDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { getDatabase, onValue, ref, remove } from "firebase/database";

const Sidebar = () => {
  const auth = getAuth();
  const users = useSelector((user) => user.loginSlice.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [OnlineStatus, setOnlineStatus] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handlelogout = () => {
    if (OnlineStatus.includes(users.uid)) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("users");
          dispatch(Loginuser(null));
          navigate("/");
          remove(ref(db, "online/" + users.uid));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("users");
          dispatch(Loginuser(null));
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // read Online status

  const db = getDatabase();
  useEffect(() => {
    onValue(ref(db, "online/"), (snapshot) => {
      let OnlineArray = [];
      snapshot.forEach((item) => {
        OnlineArray.push(item.val().userid);
      });
      setOnlineStatus(OnlineArray);
    });
  }, []);

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
            <NavLink to="/" className="page-icon">
              <AiOutlineHome />
            </NavLink>
            <NavLink to="/messages" className="page-icon">
              <BsChatDots />
            </NavLink>

            <div className="page-icon">
              <FaRegBell />
            </div>
            <NavLink to="/settings" className="page-icon">
              <AiOutlineSetting />
            </NavLink>
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
