import { Button } from "@mui/material";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { UserData } from "./data";
import "./style.css";

const UserList = () => {
  return (
    <div className="users-list-wrapper">
      <div className="friends-list-header">
        <h4>User List</h4>
        <div className="users-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="users-wrapper-scroll">
        {UserData.map((item, i) => (
          <div className="users-item-wraper">
            <div className="users-item-pic">
              <picture>
                <img src={item.images} alt="friends friends" />
              </picture>
            </div>
            <div className="users-item-name">
              <h5>{item.name}</h5>
              <p>{item.time}</p>
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
