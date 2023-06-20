import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./style.css";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const CancelFriendRequest = () => {
  const db = getDatabase();
  const [friendRequest, setFriendRequest] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);
  // read friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        if (item.val().senderid == user.uid) {
          requestArray.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequest(requestArray);
    });
  }, []);

  // friend request cancel
  const handleCancel = (item) => {
    remove(ref(db, "friendrequest/" + item.id));
  };

  return (
    <div className="friends-request-wrapper">
      <div className="friends-list-header">
        <h4>You Sent Request</h4>
        <div className="friends-list-option">
          <SlOptionsVertical />
        </div>
      </div>

      <div className="friends-wrapper-scroll">
        {friendRequest.length == 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't hvae any block friend</Alert>
          </div>
        ) : (
          friendRequest.map((item, i) => (
            <div className="friends-item-wraper">
              <div className="friends-item-pic">
                <picture>
                  <img
                    src={
                      item.receiverProfilePicture ||
                      "/images/profile/avatar.png"
                    }
                    onError={(e) => {
                      e.target.src = "/images/profile/avatar.png";
                    }}
                    alt=""
                  />
                </picture>
              </div>
              <div className="friends-item-name">
                <h5>{item.receivername}</h5>
                <p>{item.id}</p>
              </div>
              <div className="friends-item-button">
                <div className="cancel-button">
                  <Button
                    variant="contained"
                    onClick={() => handleCancel(item)}
                  >
                    <RxCross2 />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CancelFriendRequest;
