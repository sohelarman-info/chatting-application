import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const ChatGroup = () => {
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  const [groups, setGroups] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "groups/");

    onValue(starCountRef, (snapshot) => {
      let groupsArray = [];
      snapshot.forEach((item) => {
        groupsArray.push({ ...item.val(), id: item.key });
      });
      setGroups(groupsArray);
    });
  }, []);

  // Group Search Funtionality
  const handleGroupSearch = (e) => {
    let groupArray = [];
    if (e.target.value.length === 0) {
      setGroupSearch([]);
    }
    groups.filter((item) => {
      if (item.groupname.toLowerCase().includes(e.target.value.toLowerCase())) {
        groupArray.push(item);
        setGroupSearch(groupArray);
      }
    });
  };
  return (
    <div className="chat-list-wrapper">
      <div className="chat-list-header">
        <h4>Groups List</h4>
      </div>

      <div className="search-wrapper user-search">
        <div className="search-icon">
          <FiSearch />
        </div>
        <div className="search-input">
          <input
            onChange={handleGroupSearch}
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="chat-group-wrapper-scroll">
        {groups.length === 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't hvae any group</Alert>
          </div>
        ) : groupSearch.length > 0 ? (
          groupSearch.map((item, i) => (
            <div className="chat-group-item-wraper" key={i}>
              <div className="chat-group-item-pic">
                <picture>
                  <img src="./images/group/friends.jpg" alt="friends group" />
                </picture>
              </div>
              <div className="chat-group-item-name">
                <h5>{item.groupname}</h5>
                <p>{item.grouptag}</p>
              </div>
            </div>
          ))
        ) : (
          groups.map((item, i) => (
            <div className="chat-group-item-wraper" key={i}>
              <div className="chat-group-item-pic">
                <picture>
                  <img src="./images/group/friends.jpg" alt="friends group" />
                </picture>
              </div>
              <div className="chat-group-item-name">
                <h5>{item.groupname}</h5>
                <p>{item.grouptag}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatGroup;