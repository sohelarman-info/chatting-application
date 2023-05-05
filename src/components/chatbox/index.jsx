import React from "react";
import "./style.css";
import { SlOptionsVertical } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import ModalImage from "react-modal-image";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

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
          <div className="message-box">
            <div className="chat-scroll">
              <div className="message-left">
                <div className="message-left-text">
                  <p>Hey There !</p>
                </div>
                <div className="message-left-time">
                  <p>Today, 2:01pm</p>
                </div>
              </div>
              <div className="message-right">
                <div className="message-right-text">
                  <p>Hello</p>
                </div>
                <div className="message-right-time">
                  <p>Today, 2:02pm</p>
                </div>
              </div>
              <div className="message-right">
                <div className="message-right-text">
                  <p>I am good and hoew about you?</p>
                </div>
                <div className="message-right-time">
                  <p>Today, 2:03pm</p>
                </div>
              </div>

              <div className="message-left">
                <div className="message-left-text">
                  <p>I am doing well. Can we meet up tomorrow?</p>
                </div>
                <div className="message-left-time">
                  <p>Today, 2:04pm</p>
                </div>
              </div>

              <div className="message-right">
                <div className="message-right-text">
                  <p>Yes, I'm free. Send Me your pic</p>
                </div>
                <div className="message-right-time">
                  <p>Today, 2:05pm</p>
                </div>
              </div>

              <div className="message-left">
                <div className="message-left-text">
                  <ModalImage
                    small="./images/friends/5.jpg"
                    large="./images/friends/5.jpg"
                    alt="Hello World!"
                  />
                </div>
                <div className="message-left-time">
                  <p>Today, 2:06pm</p>
                </div>
              </div>

              <div className="message-left">
                <div className="message-left-text">
                  <p>Your pic?</p>
                </div>
                <div className="message-left-time">
                  <p>Today, 2:06pm</p>
                </div>
              </div>

              <div className="message-right">
                <div className="message-right-text">
                  <ModalImage
                    small="./images/friends/7.jpg"
                    large="./images/friends/7.jpg"
                    alt="Hello World!"
                  />
                </div>
                <div className="message-right-time">
                  <p>Today, 2:07pm</p>
                </div>
              </div>

              <div className="message-left">
                <div className="message-left-text">
                  <audio src="./audio/1.mp3" controls></audio>
                </div>
                <div className="message-left-time">
                  <p>Today, 2:08pm</p>
                </div>
              </div>

              <div className="message-right">
                <div className="message-right-text">
                  <audio src="./audio/2.mp3" controls></audio>
                </div>
                <div className="message-right-time">
                  <p>Today, 2:09pm</p>
                </div>
              </div>

              <div className="message-left">
                <div className="message-left-text">
                  <video src="./videos/1.mp4" controls></video>
                </div>
                <div className="message-left-time">
                  <p>Today, 2:08pm</p>
                </div>
              </div>

              <div className="message-right">
                <div className="message-right-text">
                  <video src="./videos/2.mp4" controls></video>
                </div>
                <div className="message-right-time">
                  <p>Today, 2:09pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-input-area">
            <div className="chat-input">
              <input type="text" />
              <div className="chat-files">
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  className="speed-dial-icon"
                  // sx={{ position: "absolute", bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
            <div className="chat-send-button">
              <Button variant="contained" size="medium" className="send-button">
                <FaTelegramPlane />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
