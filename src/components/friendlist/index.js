import { Button } from "@mui/material";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import "./style.css";

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  // read friends
  useEffect(() => {
    const starCountRef = ref(db, "friends/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        if (
          item.val().senderid == user.uid ||
          item.val().receiverid == user.uid
        ) {
          requestArray.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(requestArray);
    });
  }, []);

  // friend block

  const handleBlock = (item) => {
    setDisabled(true);
    if (user.uid == item.senderid) {
      set(push(ref(db, "block/")), {
        block: item.receivername,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid,
        receiverid: item.receiverid,
        receivername: item.receivername,
        requestKey: item.requestKey,
        senderid: item.senderid,
        sendername: item.sendername,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
        setDisabled(false);
      });
    } else if (user.uid == item.receiverid) {
      set(push(ref(db, "block/")), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,
        receiverid: item.receiverid,
        receivername: item.receivername,
        requestKey: item.requestKey,
        senderid: item.senderid,
        sendername: item.sendername,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
        setDisabled(false);
      });
    }
  };

  return (
    <div className="friends-list-wrapper">
      <div className="friends-list-header">
        <h4>Friends List</h4>
        <div className="friends-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="friends-list-wrapper-scroll">
        {friendList.map((item, i) => (
          <div className="friends-item-wraper" key={i}>
            <div className="friends-item-pic">
              <picture>
                <img src="./images/friends/1.jpg" alt="friends friends" />
              </picture>
            </div>
            <div className="friends-item-name">
              <h5>
                {item.receiverid == user.uid
                  ? item.sendername
                  : item.receivername}
              </h5>
              <p>{item.id}</p>
            </div>
            <div className="friends-item-button">
              <div className="friends-block-button">
                {disabled ? (
                  <Button variant="contained" disabled>
                    Block
                  </Button>
                ) : (
                  <Button variant="contained" onClick={() => handleBlock(item)}>
                    Block
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

export default FriendList;
