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
import { Alert, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";

const MyGroups = () => {
  const [myGroups, setMygroups] = useState([]);
  const [groupRequestList, setGroupRequestList] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);
  const [show, setShow] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "groups/");

    onValue(starCountRef, (snapshot) => {
      let groupsArray = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid) {
          groupsArray.push({ ...item.val(), id: item.key });
        }
      });
      setMygroups(groupsArray);
    });
  }, []);

  const handleMembers = (myitem) => {
    setShow(true);
    const starCountRef = ref(db, "groupjoinrequest/");

    onValue(starCountRef, (snapshot) => {
      let groupReqArray = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid && item.val().groupid == myitem.id) {
          groupReqArray.push({ ...item.val(), id: item.key });
        }
      });
      setGroupRequestList(groupReqArray);
    });
  };

  const handleRequestAccept = (item) => {
    set(push(ref(db, "groupmembers/")), {
      groupid: item.groupid,
      adminid: item.adminid,
      userid: item.userid,
      userProfilePic: item.userProfilePic,
      username: item.username,
      adminname: item.adminname,
      groupname: item.groupname,
      grouptag: item.grouptag,
    }).then(() => {
      remove(ref(db, "groupjoinrequest/" + item.id));
    });
  };
  return (
    <div className="mygroups-wrapper">
      <div className="mygroups-list-header">
        <h4>My Groups</h4>
        <div className="mygroups-list-option">
          <SlOptionsVertical />
        </div>
      </div>

      <div className="mygroups-wrapper-scroll">
        {show && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShow(false)}
          >
            Go Back
          </Button>
        )}
        {myGroups.length == 0 ? (
          <div className="empty-message">
            <Alert severity="error">You don't have any group.</Alert>
          </div>
        ) : show ? (
          groupRequestList.length == 0 ? (
            <div className="empty-message">
              <Alert severity="error">You don't Request.</Alert>
            </div>
          ) : (
            groupRequestList.map((item, i) => (
              <div className="mygroups-item-wraper" key={i}>
                <div className="mygroups-item-pic">
                  <picture>
                    <img src={item.userProfilePic} alt={item.username} />
                  </picture>
                </div>
                <div className="mygroups-item-name">
                  <h5>{item.username}</h5>
                  <p>
                    {item.grouptag}
                    <span className="groupadmin">{item.groupname}</span>
                  </p>
                </div>
                <div className="join-req-btn">
                  <div className="accept-button">
                    <Button
                      variant="contained"
                      onClick={() => handleRequestAccept(item)}
                    >
                      <BsCheck2 />
                    </Button>
                  </div>
                  <div className="reject-button">
                    <Button variant="contained">
                      <RxCross2 />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          myGroups.map((item, i) => (
            <div className="mygroups-item-wraper" key={i}>
              <div className="mygroups-item-pic">
                <picture>
                  <img src="./images/group/friends.jpg" alt="friends group" />
                </picture>
              </div>
              <div className="mygroups-item-name">
                <h5>{item.groupname}</h5>
                <p>
                  {item.grouptag}{" "}
                  <span className="groupadmin">{item.adminname}</span>
                </p>
              </div>
              <div className="mygroups-item-button">
                <Button size="small" variant="contained">
                  info
                </Button>
                <div className="members-btn">
                  <Button
                    onClick={() => handleMembers(item)}
                    className="members-btn"
                    size="small"
                    variant="contained"
                  >
                    members
                  </Button>
                  {/* <div className="bedge">{groupRequestList.length}</div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;
