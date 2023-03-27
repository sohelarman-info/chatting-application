import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";
import "./style.css";
import { useSelector } from "react-redux";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";

const UserList = () => {
  const db = getDatabase();
  const [userlists, setUserlists] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [cancelRequest, setCancelRequest] = useState([]);
  const [friends, setFriends] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);

  useEffect(() => {
    const starCountRef = ref(db, "users/");

    onValue(starCountRef, (snapshot) => {
      const userArray = [];
      snapshot.forEach((userData) => {
        if (user.uid != userData.key) {
          userArray.push({ ...userData.val(), id: userData.key });
        }
      });
      setUserlists(userArray);
    });
  }, []);

  // send request
  const handleRequestSend = (item) => {
    set(push(ref(db, "friendrequest/")), {
      senderid: user.uid,
      sendername: user.displayName,
      receiverid: item.id,
      receivername: item.username,
    });
  };

  // read friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().receiverid + item.val().senderid);
        requestArray.push({ ...item, id: item.key });
      });
      setFriendRequest(requestArray);
    });
  }, []);

  // read friends list
  useEffect(() => {
    const starCountRef = ref(db, "friends/");

    onValue(starCountRef, (snapshot) => {
      let friendsArray = [];
      snapshot.forEach((item) => {
        friendsArray.push(item.val().receiverid + item.val().senderid);
      });
      setFriends(friendsArray);
    });
  }, []);

  // friend request cancel

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let cancelRequestArray = [];
      snapshot.forEach((item) => {
        cancelRequestArray.push(item.val().receiverid + item.val().senderid);
        cancelRequestArray.push({ ...item, id: item.key });
      });
      setCancelRequest(cancelRequestArray);
    });
  }, []);

  const handleCancelRequest = (item) => {
    remove(ref(db, "friendrequest/" + cancelRequest[1].id));
  };

  return (
    <div className="users-list-wrapper">
      <div className="friends-list-header">
        <h4>User List</h4>
        <div className="users-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="users-wrapper-scroll">
        {userlists.map((item, i) => (
          <div key={i} className="users-item-wraper">
            <div className="users-item-pic">
              <picture>
                <img src="./images/friends/1.jpg" alt="friends friends" />
              </picture>
            </div>
            <div className="users-item-name">
              <h5>{item.username}</h5>
              <p>{item.id}</p>
            </div>
            <div className="users-item-button">
              <div className="users-block-button">
                {friendRequest.includes(item.id + user.uid) ? (
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleCancelRequest(friendRequest.includes(item))
                    }
                  >
                    <RxCross2 />
                    Cancel
                  </Button>
                ) : friendRequest.includes(user.uid + item.id) ? (
                  <Button variant="contained">
                    <BsCheck2 /> Accept
                  </Button>
                ) : friends.includes(item.id + user.uid) ||
                  friends.includes(user.uid + item.id) ? (
                  <Button variant="contained">
                    <FaUserTimes /> Unfriend
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleRequestSend(item)}
                  >
                    <FaUserPlus /> Add Friend
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
