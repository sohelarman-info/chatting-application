import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from "react-audio-voice-recorder";
import "./style.css";
import { SlOptionsVertical } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import { RiRecordCircleLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { BiMicrophone } from "react-icons/bi";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

// Lottie Animation
import Lottie from "lottie-react";
import Find from "../lottie/find.json";

import EmojiPicker from "emoji-picker-react";
import {
  MdOutlinePhotoSizeSelectActual,
  MdScheduleSend,
  MdVoiceOverOff,
} from "react-icons/md";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment/moment";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from "firebase/storage";
import { ScaleLoader } from "react-spinners";

const ChatBox = () => {
  // redux state
  const user = useSelector((users) => users.loginSlice.login);

  //Camera state
  const [open, setOpen] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [captureImage, setCaptureImage] = useState("");

  //audio state
  const [audioURL, setAudioURL] = useState("");
  const [blob, setBlob] = useState("");
  const [showAudio, setShowAudio] = useState(false);

  // emoji state
  const [showEmoji, setShowEmoji] = useState(false);

  // Loader state
  const [loader, setLoader] = useState(false);

  // firebase state
  const db = getDatabase();
  const storage = getStorage();

  // msg state
  const [message, setMessage] = useState("");
  const [groupMessage, setGroupMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [GroupMessageList, setGroupMessageList] = useState([]);
  const [GroupMembers, setGroupMembers] = useState([]);
  const [OnlineStatus, setOnlineStatus] = useState([]);
  const scrollMsg = useRef(null);

  // Emoji Picker Functionality

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  // Photo capture functionality

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    setCaptureImage(dataUri);
    setOpenCamera(false);
    let randomCaptureName = (Math.random() + 1).toString(36).substring(2);
    const storageRef = sref(
      storage,
      "capture/" + user.uid + "/" + user.uid + "-" + randomCaptureName
    );
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "friends-chat/")), {
          whosendid: user.uid,
          whosendname: user.displayName,
          whosendphoto: user.photoURL,
          whoreceiveid: activeChatName.id,
          whoreceivename: activeChatName.name,
          whoreceivephoto: activeChatName.photo,
          image: downloadURL,
          date: `${new Date()}`,
        }).then(() => {
          setMessage("");

          setOpen(false);
        });
      });
    });
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
  let handleImageUpload = (e) => {
    let randomUploadName = (Math.random() + 1).toString(36).substring(2);
    const storageRef = sref(
      storage,
      "chat-upload/" + user.uid + "/" + user.uid + "-" + randomUploadName
    );

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("errors", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "friends-chat/")), {
            whosendid: user.uid,
            whosendname: user.displayName,
            whosendphoto: user.photoURL,
            whoreceiveid: activeChatName.id,
            whoreceivename: activeChatName.name,
            whoreceivephoto: activeChatName.photo,
            image: downloadURL,
            date: `${new Date()}`,
          }).then(() => {
            setMessage("");

            setOpen(false);
          });
        });
      }
    );
  };

  // Chat with friend (redux)

  const activeChatName = useSelector((state) => state.active.active);

  // msg send functionality

  const handleMessageInput = (e) => {
    setMessage(e.target.value.trimStart());
    setGroupMessage(e.target.value.trimStart());
    setShowEmoji(false);
  };

  const handleSendMessage = (e) => {
    if (activeChatName.status == "single") {
      set(push(ref(db, "friends-chat/")), {
        whosendid: user.uid,
        whosendname: user.displayName,
        whosendphoto: user.photoURL,
        whoreceiveid: activeChatName.id,
        whoreceivename: activeChatName.name,
        whoreceivephoto: activeChatName.photo,
        message: message,
        date: `${new Date()}`,
      }).then(() => {
        setMessage("");
      });
    } else if (activeChatName.status == "group") {
      set(push(ref(db, "group-chat/")), {
        whosendid: user.uid,
        whosendname: user.displayName,
        whosendphoto: user.photoURL,
        whoreceiveid: activeChatName.groupid,
        adminid: activeChatName.adminid,
        whoreceivename: activeChatName.name,
        message: message,
        date: `${new Date()}`,
      }).then(() => {
        setMessage("");
      });
      console.log("group msg");
      console.log(activeChatName);
    }
  };

  // send to enter button
  const handleEnterPress = (e) => {
    if (!e.target.value.length == "" && e.key == "Enter") {
      handleSendMessage();
    }
  };

  // audio record chat functionality

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    setBlob(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  const handleAudioUpload = () => {
    setLoader(true);
    let randomAudioName = (Math.random() + 1).toString(36).substring(2);
    const audioStorageRef = sref(
      storage,
      "chat-audio/" + user.uid + "/" + user.uid + "-" + randomAudioName
    );
    uploadBytes(audioStorageRef, blob).then((snapshot) => {
      getDownloadURL(audioStorageRef).then((downloadURL) => {
        set(push(ref(db, "friends-chat/")), {
          whosendid: user.uid,
          whosendname: user.displayName,
          whosendphoto: user.photoURL,
          whoreceiveid: activeChatName.id,
          whoreceivename: activeChatName.name,
          whoreceivephoto: activeChatName.photo,
          audio: downloadURL,
          date: `${new Date()}`,
        }).then(() => {
          setMessage("");
          setOpen(false);
          setAudioURL("");
          setShowAudio(false);
          setLoader(false);
        });
      });
    });
  };

  // read single message

  useEffect(() => {
    onValue(ref(db, "friends-chat/"), (snapshot) => {
      let singleMessage = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == user.uid &&
            item.val().whoreceiveid == activeChatName.id) ||
          (item.val().whoreceiveid == user.uid &&
            item.val().whosendid == activeChatName.id)
        ) {
          singleMessage.push(item.val());
        }
        setMessageList(singleMessage);
      });
    });
  }, [activeChatName?.id]);

  // read group message

  useEffect(() => {
    onValue(ref(db, "group-chat/"), (snapshot) => {
      let groupMessage = [];
      snapshot.forEach((item) => {
        groupMessage.push(item.val());
      });
      setGroupMessageList(groupMessage);
    });
  }, [activeChatName?.id]);

  // read group members

  useEffect(() => {
    onValue(ref(db, "groupmembers/"), (snapshot) => {
      let groupMembersArray = [];
      snapshot.forEach((item) => {
        groupMembersArray.push(item.val().groupid + item.val().userid);
      });
      setGroupMembers(groupMembersArray);
    });
  }, [activeChatName?.id]);

  // read Online status

  useEffect(() => {
    onValue(ref(db, "online/"), (snapshot) => {
      let OnlineArray = [];
      snapshot.forEach((item) => {
        OnlineArray.push(item.val().userid);
      });
      setOnlineStatus(OnlineArray);
    });
  }, [activeChatName?.id]);

  // single memssage scroll functionality
  useEffect(() => {
    scrollMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // group memssage scroll functionality
  useEffect(() => {
    scrollMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [GroupMessageList]);

  return (
    <>
      <div className="fixed-layout" fixed>
        {activeChatName == null ? (
          <div className="coversation-empty-message">
            <h3>
              <Lottie animationData={Find} loop={true} />
            </h3>
          </div>
        ) : (
          <div className="chatbox-wrapper">
            <div className="chat-user">
              <div className="user-profile-pic">
                <picture>
                  <img
                    src={
                      !activeChatName.photo
                        ? "./images/profile/no-photo.jpg"
                        : activeChatName.photo
                    }
                    alt={activeChatName.name}
                  />
                </picture>
                {OnlineStatus.includes(activeChatName.id) ? (
                  <div className="online-active"></div>
                ) : (
                  <div className="offline-active"></div>
                )}
              </div>
              <div className="user-name">
                <h4>{activeChatName.name}</h4>
                <p className="status">
                  {OnlineStatus.includes(activeChatName.id)
                    ? "Online"
                    : "offline"}
                </p>
              </div>
              <div className="chat-list-option">
                <SlOptionsVertical />
              </div>
            </div>
            <div className="message-box">
              <div className="chat-scroll">
                {activeChatName.status == "single" ? (
                  messageList.map((item, i) => (
                    <div ref={scrollMsg}>
                      {item.whosendid == user.uid ? (
                        item.message ? (
                          <div key={i}>
                            <div className="message-right">
                              <div className="message-right-text">
                                <p>{item.message}</p>
                              </div>
                              <div className="message-right-time">
                                <p>
                                  {moment(item.date).format("MMMM DD, h:mm a")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : item.image ? (
                          <div className="message-right">
                            <div className="message-right-text">
                              <ModalImage
                                small={item.image}
                                large={item.image}
                                alt={item.whosendname}
                              />
                            </div>
                            <div className="message-right-time">
                              <p>
                                {moment(item.date).format("MMMM DD, h:mm a")}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="message-right">
                            <div className="message-right-text">
                              <audio src={item.audio} controls></audio>
                            </div>
                            <div className="message-right-time">
                              <p>
                                {moment(item.date).format("MMMM DD, h:mm a")}
                              </p>
                            </div>
                          </div>
                        )
                      ) : item.message ? (
                        <div key={i}>
                          <div className="message-left">
                            <div className="message-left-text">
                              <p>{item.message}</p>
                            </div>
                            <div className="message-left-time">
                              <p>
                                {moment(item.date).format("MMMM DD, h:mm a")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : item.image ? (
                        <div className="message-left">
                          <div className="message-left-text">
                            <ModalImage
                              small={item.image}
                              large={item.image}
                              alt={item.whosendname}
                            />
                          </div>
                          <div className="message-left-time">
                            <p>{moment(item.date).format("MMMM DD, h:mm a")}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="message-left">
                          <div className="message-left-text">
                            <audio src={item.audio} controls></audio>
                          </div>
                          <div className="message-left-time">
                            <p>{moment(item.date).format("MMMM DD, h:mm a")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : user.uid == activeChatName.adminid ||
                  GroupMembers.includes(activeChatName.groupid + user.uid) ? (
                  GroupMessageList.map((item, i) => (
                    <div ref={scrollMsg}>
                      {item.whoreceiveid == activeChatName.groupid &&
                        (item.whosendid == user.uid ? (
                          <div key={i}>
                            <div className="message-right">
                              <div className="message-right-text">
                                <p>{item.message}</p>
                              </div>
                              <div className="message-right-time">
                                <p>
                                  {moment(item.date).format("MMMM DD, h:mm a")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={i}>
                            <div className="message-left">
                              <div className="sender-name">
                                <p>{item.whosendname}</p>
                              </div>
                              <div className="message-left-text">
                                <p>{item.message}</p>
                              </div>
                              <div className="message-left-time">
                                <p>
                                  {moment(item.date).format("MMMM DD, h:mm a")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))
                ) : (
                  <div className="coversation-empty-message">
                    You are not group admin or member
                  </div>
                )}
                {/* <div className="message-left">
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
                </div> */}
              </div>
            </div>
            {activeChatName.status == "single" ? (
              <div className="chat-input-area">
                <div className="chat-input">
                  <input
                    type="text"
                    onChange={handleMessageInput}
                    value={message}
                    onKeyUp={handleEnterPress}
                    placeholder="Write message..."
                  />

                  <div
                    className="emoji-chat"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <BsEmojiSmile />
                    {showEmoji && (
                      <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>

                  <div
                    className="audio-recorded"
                    onClick={() => setShowAudio(true)}
                  >
                    {!audioURL ? (
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={false}
                        downloadFileExtension="mp3"
                      />
                    ) : (
                      <audio src={audioURL} controls></audio>
                    )}
                  </div>
                  <div className="chat-files">
                    {!audioURL ? (
                      <div className="add-files">
                        {open == true ? (
                          <div
                            className="add-files"
                            onClick={() => setOpen(false)}
                          >
                            <RxCross1 />
                          </div>
                        ) : (
                          <div
                            className="add-files"
                            onClick={() => setOpen(true)}
                          >
                            <AiOutlinePlus />
                          </div>
                        )}
                        {open && (
                          <div className="add-files-area">
                            <div className="add-gallery">
                              <div
                                className="camera-capture"
                                onClick={() => setOpenCamera(!openCamera)}
                              >
                                {/* packege sourch: https://www.npmjs.com/package/react-html5-camera-photo */}
                                <FiCamera />
                              </div>
                            </div>
                            <div className="add-gallery">
                              <div className="upload-image">
                                <label>
                                  <input
                                    hidden
                                    onChange={handleImageUpload}
                                    type="file"
                                  />
                                  <MdOutlinePhotoSizeSelectActual />
                                </label>
                              </div>
                            </div>
                            <div className="add-gallery">
                              <div className="open-audio-canvas">
                                <BiMicrophone />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="audio-send-area">
                        <div
                          className="audio-delete-btn"
                          onClick={() => {
                            setAudioURL("");
                            setShowAudio(false);
                          }}
                        >
                          <AiOutlineDelete />
                        </div>

                        {loader ? (
                          <ScaleLoader
                            className="audio-loading-btn"
                            height="10"
                            width="3"
                            color="#5F35F5"
                          />
                        ) : (
                          <div
                            className="audio-send-btn"
                            onClick={handleAudioUpload}
                          >
                            <FaTelegramPlane />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="chat-send-button">
                  {message == "" ? (
                    showAudio == true ? (
                      !audioURL ? (
                        !showAudio ? (
                          <Button
                            disabled
                            variant="contained"
                            size="medium"
                            className="send-button recording-button"
                          >
                            <RiRecordCircleLine />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="medium"
                            className="send-button"
                            onClick={() => {
                              setShowAudio(false);
                              setAudioURL("");
                            }}
                          >
                            <MdVoiceOverOff />
                          </Button>
                        )
                      ) : loader ? (
                        <Button
                          disabled
                          variant="contained"
                          size="medium"
                          className="send-button"
                        >
                          <MdScheduleSend />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="medium"
                          className="send-button"
                          onClick={handleAudioUpload}
                        >
                          <MdScheduleSend />
                        </Button>
                      )
                    ) : (
                      <Button
                        disabled
                        variant="contained"
                        size="medium"
                        className="send-button"
                      >
                        <FaTelegramPlane />
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={handleSendMessage}
                      variant="contained"
                      size="medium"
                      className="send-button"
                    >
                      <FaTelegramPlane />
                    </Button>
                  )}
                </div>
              </div>
            ) : user.uid == activeChatName.adminid ||
              GroupMembers.includes(activeChatName.groupid + user.uid) ? (
              <div className="chat-input-area">
                <div className="chat-input">
                  <input
                    type="text"
                    onChange={handleMessageInput}
                    value={message}
                    onKeyUp={handleEnterPress}
                    placeholder="Write message..."
                  />

                  <div
                    className="emoji-chat"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <BsEmojiSmile />
                    {showEmoji && (
                      <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>

                  <div
                    className="audio-recorded"
                    onClick={() => setShowAudio(true)}
                  >
                    {!audioURL ? (
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={false}
                        downloadFileExtension="mp3"
                      />
                    ) : (
                      <audio src={audioURL} controls></audio>
                    )}
                  </div>
                  <div className="chat-files">
                    {!audioURL ? (
                      <div className="add-files">
                        {open == true ? (
                          <div
                            className="add-files"
                            onClick={() => setOpen(false)}
                          >
                            <RxCross1 />
                          </div>
                        ) : (
                          <div
                            className="add-files"
                            onClick={() => setOpen(true)}
                          >
                            <AiOutlinePlus />
                          </div>
                        )}
                        {open && (
                          <div className="add-files-area">
                            <div className="add-gallery">
                              <div
                                className="camera-capture"
                                onClick={() => setOpenCamera(!openCamera)}
                              >
                                {/* packege sourch: https://www.npmjs.com/package/react-html5-camera-photo */}
                                <FiCamera />
                              </div>
                            </div>
                            <div className="add-gallery">
                              <div className="upload-image">
                                <label>
                                  <input
                                    hidden
                                    onChange={handleImageUpload}
                                    type="file"
                                  />
                                  <MdOutlinePhotoSizeSelectActual />
                                </label>
                              </div>
                            </div>
                            <div className="add-gallery">
                              <div className="open-audio-canvas">
                                <BiMicrophone />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="audio-send-area">
                        <div
                          className="audio-delete-btn"
                          onClick={() => {
                            setAudioURL("");
                            setShowAudio(false);
                          }}
                        >
                          <AiOutlineDelete />
                        </div>

                        {loader ? (
                          <ScaleLoader
                            className="audio-loading-btn"
                            height="10"
                            width="3"
                            color="#5F35F5"
                          />
                        ) : (
                          <div
                            className="audio-send-btn"
                            onClick={handleAudioUpload}
                          >
                            <FaTelegramPlane />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="chat-send-button">
                  {message == "" ? (
                    showAudio == true ? (
                      !audioURL ? (
                        !showAudio ? (
                          <Button
                            disabled
                            variant="contained"
                            size="medium"
                            className="send-button recording-button"
                          >
                            <RiRecordCircleLine />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="medium"
                            className="send-button"
                            onClick={() => {
                              setShowAudio(false);
                              setAudioURL("");
                            }}
                          >
                            <MdVoiceOverOff />
                          </Button>
                        )
                      ) : loader ? (
                        <Button
                          disabled
                          variant="contained"
                          size="medium"
                          className="send-button"
                        >
                          <MdScheduleSend />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="medium"
                          className="send-button"
                          onClick={handleAudioUpload}
                        >
                          <MdScheduleSend />
                        </Button>
                      )
                    ) : (
                      <Button
                        disabled
                        variant="contained"
                        size="medium"
                        className="send-button"
                      >
                        <FaTelegramPlane />
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={handleSendMessage}
                      variant="contained"
                      size="medium"
                      className="send-button"
                    >
                      <FaTelegramPlane />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              "Not Permitted"
            )}
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
