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
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";

const MyGroups = () => {
  const [myGroups, setMygroups] = useState([]);
  const [groupRequestList, setGroupRequestList] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);
  const [show, setShow] = useState(false);
  const [memberShow, setMemberShow] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const handleJoinRequest = (myitem) => {
    setShow(true);
    const starCountRef = ref(db, "groupjoinrequest/");

    onValue(starCountRef, (snapshot) => {
      let groupReqArray = [];
      snapshot.forEach((item) => {
        if (user.uid == myitem.adminid && item.val().groupid == myitem.id) {
          groupReqArray.push({ ...item.val(), id: item.key });
        }
      });
      setGroupRequestList(groupReqArray);
    });
  };

  // create group

  const handleCreate = () => {
    set(push(ref(db, "groups/")), {
      adminid: user.uid,
      adminname: user.displayName,
      groupname: groupName,
      grouptag: groupTag,
    }).then(setOpen(false));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // group members accept

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

  // group members Reject

  const handleReject = (item) => {
    remove(ref(db, "groupjoinrequest/" + item.id));
  };

  // group member show

  const handleInfo = (myitem) => {
    setMemberShow(true);
    const groupmembers = ref(db, "groupmembers/");

    onValue(groupmembers, (snapshot) => {
      let groupMemberArray = [];
      snapshot.forEach((item) => {
        if (user.uid == myitem.adminid && item.val().groupid == myitem.id) {
          groupMemberArray.push({ ...item.val(), id: item.key });
          console.log("asi");
        } else {
          console.log("nai");
        }
      });
      setGroupMembers(groupMemberArray);
    });
  };
  return (
    <div className="mygroups-wrapper">
      <div className="mygroups-list-header">
        <h4>My Groups</h4>

        <div className="create-group">
          <Button
            onClick={handleOpen}
            color="success"
            variant="contained"
            size="small"
          >
            Create Group
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Your Group
            </Typography>
            <div className="group-name-field">
              <TextField
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                className="field"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="group-groupTag-field">
              <TextField
                id="outlined-basic"
                label="Group Tag"
                variant="outlined"
                className="field"
                onChange={(e) => setGroupTag(e.target.value)}
              />
            </div>
            <div className="group-submit">
              <Button
                variant="contained"
                className="group-submit-btn"
                size="large"
                onClick={handleCreate}
              >
                Create Group
              </Button>
            </div>
          </Box>
        </Modal>
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
        {memberShow && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => setMemberShow(false)}
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
                    <Button
                      variant="contained"
                      onClick={() => handleReject(item)}
                    >
                      <RxCross2 />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : memberShow ? (
          groupMembers.length == 0 ? (
            <div className="empty-message">
              <Alert severity="error">You don't have any members.</Alert>
            </div>
          ) : (
            groupMembers.map((item, i) => (
              <div className="mygroups-item-wraper" key={i}>
                <div className="mygroups-item-pic">
                  <picture>
                    <img src={item.userProfilePic} alt={item.username} />
                  </picture>
                </div>
                <div className="mygroups-item-name">
                  <h5>{item.username}</h5>
                  <p>
                    <span className="groupadmin">{item.groupname}</span>
                  </p>
                </div>
                <div className="members-btn">
                  <Button variant="contained">profile</Button>
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
                <div className="members-btn">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleInfo(item)}
                    className="member-btn"
                  >
                    members
                  </Button>
                  <div className="member-bedge">{groupMembers.length}</div>
                </div>
                <div className="request-btn">
                  <Button
                    onClick={() => handleJoinRequest(item)}
                    className="request-btn"
                    size="small"
                    variant="contained"
                  >
                    request
                  </Button>
                  <div className="req-bedge">{groupRequestList.length}</div>
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
