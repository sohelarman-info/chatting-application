import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Modal from "@mui/material/Modal";
import "./style.css";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const GroupList = () => {
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groups, setGroups] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);

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

  const handleCreate = () => {
    set(push(ref(db, "groups/")), {
      adminid: user.uid,
      adminname: user.displayName,
      groupname: groupName,
      grouptag: groupTag,
    }).then(setOpen(false));
  };

  const handleJoin = (item) => {
    console.log(item.id);
    set(push(ref(db, "groupjoinrequest/")), {
      groupid: item.id,
      adminid: item.adminid,
      userid: user.uid,
      userProfilePic: user.photoURL,
      username: user.displayName,
      adminname: item.adminname,
      groupname: item.groupname,
      grouptag: item.grouptag,
    });
  };

  // Group Search Funtionality
  const handleGroupSearch = (e) => {
    groups.filter((item) => {
      let groupArray = [];
      if (e.target.value.length == 0) {
        setGroupSearch([]);
      }
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
                label="groupTag"
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
        {groups.length == 0 ? (
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
                <Button variant="contained" onClick={() => handleJoin(item)}>
                  Join
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupList;
