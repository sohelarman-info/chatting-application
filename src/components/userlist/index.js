import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { UserData } from "./data";
import "./style.css";

const UserList = () => {
  const db = getDatabase();
  const [userlists, setUserlists] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "users/");

    onValue(starCountRef, (snapshot) => {
      const userArray = [];
      snapshot.forEach((user) => {
        userArray.push(user.val());
      });
      setUserlists(userArray);
    });
  }, []);
  return (
    <div className="users-list-wrapper">
      <div className="friends-list-header">
        <h4>User List</h4>
        <div className="users-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="users-wrapper-scroll">
        {userlists.map((item, i) => (
          <div key={i} className="users-item-wraper">
            <div className="users-item-pic">
              <picture>
                <img src="./images/friends/1.jpg" alt="friends friends" />
              </picture>
            </div>
            <div className="users-item-name">
              <h5>{item.username}</h5>
              <p>Today, 3.45pm</p>
            </div>
            <div className="users-item-button">
              <div className="users-block-button">
                <Button variant="contained">
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
