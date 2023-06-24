import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((users) => users.loginSlice.login);
  console.log(user);
  return (
    <div className="settings-wrapper">
      <div className="settings-area">
        <div className="profile-pic-area">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <img src="images/profile/avatar.png" alt={user.displayName} />
          )}
        </div>
        <div className="settings-field-area">
          <div className="settings-field">settings-area</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
