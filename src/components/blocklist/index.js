import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import "./style.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const BlockList = () => {
  const [blockList, setBlockList] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);
  const [disabled, setDisabled] = useState(false);
  const db = getDatabase();
  // read block
  useEffect(() => {
    const starCountRef = ref(db, "block");

    onValue(starCountRef, (snapshot) => {
      let blockArray = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == user.uid) {
          blockArray.push({ ...item.val(), blockKey: item.key });
        }
      });
      setBlockList(blockArray);
    });
  }, []);

  // Unblock
  const handleUnblock = (item) => {
    setDisabled(true);
    set(push(ref(db, "friends")), {
      receiverid: item.receiverid,
      receivername: item.receivername,
      requestKey: item.requestKey,
      senderid: item.senderid,
      sendername: item.sendername,
    }).then(() => {
      remove(ref(db, "block/" + item.blockKey));
      setDisabled(false);
    });
  };
  return (
    <div className="block-list-wrapper">
      <div className="block-list-header">
        <h4>Block List</h4>
        <div className="block-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="block-list-wrapper-scroll">
        {blockList.map((item, i) => (
          <div className="block-item-wraper" key={i}>
            <div className="block-item-pic">
              <picture>
                <img src="./images/friends/1.jpg" alt="block block" />
              </picture>
            </div>
            <div className="block-item-name">
              <h5>{item.block}</h5>
              <p>{item.blockKey}</p>
            </div>
            <div className="block-item-button">
              <div className="block-block-button">
                {disabled ? (
                  <Button variant="contained" disabled>
                    Unblock
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleUnblock(item)}
                  >
                    Unblock
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

export default BlockList;
