import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import "./style.css";
import { BsCheck2 } from "react-icons/bs";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const [friendRequest, setFriendRequest] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);
  const [disabled, setDisabled] = useState(false);

  // read friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == user.uid) {
          requestArray.push({ ...item.val(), requestKey: item.key });
        }
      });
      setFriendRequest(requestArray);
    });
  }, []);

  // friend request accept
  const handleAccept = (item) => {
    setDisabled(true);
    set(push(ref(db, "friends/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.requestKey));
      setDisabled(false);
    });
  };

  // friend request cancel
  const handleCancel = (item) => {
    remove(ref(db, "friendrequest/" + item.requestKey));
  };

  return (
    <div className="friends-request-wrapper">
      <div className="friends-list-header">
        <h4>Friends Request</h4>
        <div className="friends-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="friends-wrapper-scroll">
        {friendRequest.length == 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't hvae any friend request</Alert>
          </div>
        ) : (
          friendRequest.map((item, i) => (
            <div className="friends-item-wraper">
              <div className="friends-item-pic">
                <picture>
                  <img
                    src={
                      item.senderProfilePicture || "/images/profile/avatar.png"
                    }
                    onError={(e) => {
                      e.target.src = "/images/profile/avatar.png";
                    }}
                    alt=""
                  />
                </picture>
              </div>
              <div className="friends-item-name">
                <h5>{item.sendername}</h5>
                <p>{item.id}</p>
              </div>
              <div className="friends-item-button">
                <div className="accept-button">
                  {disabled ? (
                    <Button variant="contained" disabled>
                      <BsCheck2 />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleAccept(item)}
                    >
                      <BsCheck2 />
                    </Button>
                  )}
                </div>
                <div className="reject-button">
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

export default FriendRequest;
