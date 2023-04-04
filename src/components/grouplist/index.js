import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Modal from "@mui/material/Modal";
import "./style.css";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const GroupList = () => {
  const user = useSelector((users) => users.loginSlice.login);
  const db = getDatabase();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groups, setGroups] = useState([]);

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

  console.log(groups);

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
      <div className="group-wrapper-scroll">
        {groups.map((item, i) => (
          <div className="group-item-wraper" key={i}>
            <div className="group-item-pic">
              <picture>
                <img src="./images/group/friends.jpg" alt="friends group" />
              </picture>
            </div>
            <div className="group-item-name">
              <h5>{item.groupname}</h5>
              <p>{item.grouptag}</p>
            </div>
            <div className="group-item-button">
              <Button variant="contained">Join</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
