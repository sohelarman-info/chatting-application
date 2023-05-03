import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const ChatFriends = () => {
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  const [friends, setFriends] = useState([]);
  const [friendSearch, setFriendSearch] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "friends/");

    onValue(starCountRef, (snapshot) => {
      let groupsArray = [];
      snapshot.forEach((item) => {
        groupsArray.push({ ...item.val(), id: item.key });
      });
      setFriends(groupsArray);
    });
  }, []);

  // Friends Search Funtionality
  const handlefriendSearch = (e) => {
    let groupArray = [];
    if (e.target.value.length === 0) {
      setFriendSearch([]);
    }
    friendSearch.filter((item) => {
      if (item.groupname.toLowerCase().includes(e.target.value.toLowerCase())) {
        groupArray.push(item);
        setFriendSearch(groupArray);
      }
    });
  };
  return (
    <div className="chat-list-wrapper">
      <div className="chat-list-header">
        <h4>Friends List</h4>
      </div>

      <div className="search-wrapper user-search">
        <div className="search-icon">
          <FiSearch />
        </div>
        <div className="search-input">
          <input
            onChange={handlefriendSearch}
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="chat-group-wrapper-scroll">
        {friends.length === 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't hvae any friends</Alert>
          </div>
        ) : friends.length > 0 ? (
          friends.map((item, i) => (
            <div className="chat-group-item-wraper" key={i}>
              <div className="chat-group-item-pic">
                <picture>
                  <img
                    src={
                      user.uid == item.senderid
                        ? item.receiverProfilePicture
                        : user.uid == item.receiverid
                        ? item.senderProfilePicture
                        : "/images/profile/avatar.png"
                    }
                    onError={(e) => {
                      e.target.src = "/images/profile/avatar.png";
                    }}
                    alt={
                      item.receiverid == user.uid
                        ? item.sendername
                        : item.receivername
                    }
                  />
                </picture>
              </div>
              <div className="chat-group-item-name">
                <h5>
                  {item.receiverid == user.uid
                    ? item.sendername
                    : item.receivername}
                </h5>
                <p>{item.id}</p>
              </div>
            </div>
          ))
        ) : (
          friends.map((item, i) => (
            <div className="chat-group-item-wraper" key={i}>
              <div className="chat-group-item-pic">
                <picture>
                  <img
                    src={
                      user.uid == item.senderid
                        ? item.receiverProfilePicture
                        : user.uid == item.receiverid
                        ? item.senderProfilePicture
                        : "/images/profile/avatar.png"
                    }
                    onError={(e) => {
                      e.target.src = "/images/profile/avatar.png";
                    }}
                    alt={
                      item.receiverid == user.uid
                        ? item.sendername
                        : item.receivername
                    }
                  />
                </picture>
              </div>
              <div className="chat-group-item-name">
                <h5>
                  {item.receiverid == user.uid
                    ? item.sendername
                    : item.receivername}
                </h5>
                <p>{item.id}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatFriends;
