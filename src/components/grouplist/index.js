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
import { FiSearch } from "react-icons/fi";

const GroupList = () => {
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  const [groups, setGroups] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);
  const [cancelRequest, setCancelRequest] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [joinRequest, setJoinRequest] = useState([]);
  const [groupMember, setGroupMember] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "groups/");

    onValue(starCountRef, (snapshot) => {
      let groupsArray = [];
      snapshot.forEach((item) => {
        if (user.uid != item.val().adminid) {
          groupsArray.push({ ...item.val(), id: item.key });
        }
      });
      setGroups(groupsArray);
    });
  }, []);

  // group join button

  const handleJoin = (item) => {
    setDisabled(true);
    set(push(ref(db, "groupjoinrequest/")), {
      groupid: item.id,
      adminid: item.adminid,
      userid: user.uid,
      userProfilePic: user.photoURL,
      username: user.displayName,
      adminname: item.adminname,
      groupname: item.groupname,
      grouptag: item.grouptag,
    }).then(() => {
      setDisabled(false);
    });
  };

  // group join cancel request

  useEffect(() => {
    const starCountRef = ref(db, "groupjoinrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      let cancelKey = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().groupid + item.val().userid);
        cancelKey.push({ ...item.val(), requestKey: item.key });
      });
      setCancelRequest(cancelKey);
    });
  }, []);

  const handleJoinCancel = (userInfo) => {
    cancelRequest.map((item) => {
      if (userInfo.id === item.groupid) {
        remove(ref(db, "groupjoinrequest/" + item.requestKey));
      } else {
        console.log("something problem");
      }
    });
  };

  // show group join cancel button
  useEffect(() => {
    const starCountRef = ref(db, "groupjoinrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().groupid + item.val().userid);
        requestArray.push({ ...item, id: item.key });
      });
      setJoinRequest(requestArray);
    });
  }, []);

  // show group group member button
  useEffect(() => {
    const starCountRef = ref(db, "groupmembers/");

    onValue(starCountRef, (snapshot) => {
      let memberArray = [];
      snapshot.forEach((item) => {
        memberArray.push(item.val().groupid + item.val().userid);
        memberArray.push({ ...item, id: item.key });
      });
      setGroupMember(memberArray);
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
    <div className="group-list-wrapper">
      <div className="group-list-header">
        <h4>Groups List</h4>
        <div className="group-list-option">
          <SlOptionsVertical />
        </div>
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

      <div className="group-wrapper-scroll">
        {groups.length === 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't hvae any group</Alert>
          </div>
        ) : groupSearch.length > 0 ? (
          groupSearch.map((item, i) => (
            <div className="group-item-wraper" key={i}>
              <div className="group-item-pic">
                <picture>
                  <img src="./images/group/friends.jpg" alt="friends group" />
                </picture>
              </div>
              <div className="group-item-name">
                <h5>{item.groupname}</h5>
                <p>
                  {item.grouptag}
                  <span className="groupadmin">{item.adminname}</span>
                </p>
              </div>
              <div className="group-item-button">
                <Button variant="contained" onClick={() => handleJoin(item)}>
                  Join
                </Button>
              </div>
            </div>
          ))
        ) : (
          groups.map((item, i) => (
            <div className="group-item-wraper" key={i}>
              <div className="group-item-pic">
                <picture>
                  <img src="./images/group/friends.jpg" alt="friends group" />
                </picture>
              </div>
              <div className="group-item-name">
                <h5>{item.groupname}</h5>
                <p>
                  {item.grouptag}
                  <span className="groupadmin">{item.adminname}</span>
                </p>
              </div>
              <div className="group-item-button">
                {joinRequest.includes(item.id + user.uid) ? (
                  <Button
                    variant="contained"
                    onClick={() => handleJoinCancel(item)}
                  >
                    Cancel
                  </Button>
                ) : groupMember.includes(item.id + user.uid) ? (
                  <Button variant="contained" disabled>
                    Member
                  </Button>
                ) : disabled ? (
                  <Button variant="contained" disabled>
                    Join
                  </Button>
                ) : (
                  <Button variant="contained" onClick={() => handleJoin(item)}>
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupList;
