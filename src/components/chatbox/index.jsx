import React from "react";
import "./style.css";
import { SlOptionsVertical } from "react-icons/sl";

const ChatBox = () => {
  return (
    <>
      <div className="fixed-layout" fixed>
        <div className="chatbox-wrapper">
          <div className="chat-user">
            <div className="user-profile-pic">
              <picture>
                <img src="./images/profile/avatar.png" alt="" />
              </picture>
            </div>
            <div className="user-name">
              <h4>Sohel Arman</h4>
              <p className="status">online</p>
            </div>
            <div className="chat-list-option">
              <SlOptionsVertical />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
