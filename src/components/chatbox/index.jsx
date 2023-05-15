import React, { useRef, useState } from "react";
import "./style.css";
import { SlOptionsVertical } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { BiMicrophone } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  // Photo capture functionality

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }

  function handleCameraStop() {
    console.log("handleCameraStop");
  }

  // Choose file from gallery function
  const chooseFile = useRef(null);

  // Chat with friend (redux)

  const activeChatName = useSelector((state) => state.active.active);

  return (
    <>
      <div className="fixed-layout" fixed>
        {activeChatName == null ? (
          <div className="coversation-empty-message">
            <h3>Your coversation empty</h3>
          </div>
        ) : (
          <div className="chatbox-wrapper">
            <div className="chat-user">
              <div className="user-profile-pic">
                <picture>
                  <img src={activeChatName.photo} alt={activeChatName.name} />
                </picture>
              </div>
              <div className="user-name">
                <h4>{activeChatName.name}</h4>
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
                  <div className="add-files" onClick={() => setOpen(!open)}>
                    <AiOutlinePlus />
                    {open && (
                      <div className="add-files-area">
                        <div
                          className="add-gallery"
                          onClick={() => setOpenCamera(!openCamera)}
                        >
                          {/* packege sourch: https://www.npmjs.com/package/react-html5-camera-photo */}
                          <FiCamera />
                        </div>
                        <div
                          className="add-gallery"
                          onClick={() => chooseFile.current.click()}
                        >
                          <MdOutlinePhotoSizeSelectActual />
                          <input type="file" hidden ref={chooseFile} />
                        </div>
                        <div className="add-gallery">
                          <BiMicrophone />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="chat-send-button">
                <Button
                  variant="contained"
                  size="medium"
                  className="send-button"
                >
                  <FaTelegramPlane />
                </Button>
              </div>
            </div>
          </div>
        )}
        {openCamera && (
          <div className="open-camera">
            <div className="camera-close" onClick={() => setOpenCamera(false)}>
              <RxCross2 />
            </div>
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              onTakePhotoAnimationDone={(dataUri) => {
                handleTakePhotoAnimationDone(dataUri);
              }}
              onCameraError={(error) => {
                handleCameraError(error);
              }}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              idealResolution={{ width: 640, height: 480 }}
              imageType={IMAGE_TYPES.JPG}
              imageCompression={0.97}
              isMaxResolution={true}
              isImageMirror={false}
              isSilentMode={false}
              isDisplayStartCameraError={true}
              isFullscreen={false}
              sizeFactor={1}
              onCameraStart={(stream) => {
                handleCameraStart(stream);
              }}
              onCameraStop={() => {
                handleCameraStop();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;
