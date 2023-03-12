import { Button } from "@mui/material";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./style.css";

const GroupList = () => {
  return (
    <div className="group-list-wrapper">
      <div className="group-list-header">
        <h4>Groups Request</h4>
        <div className="group-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="group-wrapper-scroll">
        <div className="group-item-wraper">
          <div className="group-item-pic">
            <picture>
              <img src="./images/group/friends.jpg" alt="friends group" />
            </picture>
          </div>
          <div className="group-item-name">
            <h5>Friends Reunion</h5>
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="group-item-button">
            <Button variant="contained">Accept</Button>
          </div>
        </div>
        <div className="group-item-wraper">
          <div className="group-item-pic">
            <picture>
              <img src="./images/group/forever.jpg" alt="friends group" />
            </picture>
          </div>
          <div className="group-item-name">
            <h5>Friends Forever</h5>
            <p>Good to see you.</p>
          </div>
          <div className="group-item-button">
            <Button variant="contained">Accept</Button>
          </div>
        </div>
        <div className="group-item-wraper">
          <div className="group-item-pic">
            <picture>
              <img src="./images/group/cusins.jpg" alt="friends group" />
            </picture>
          </div>
          <div className="group-item-name">
            <h5>Crazy Cousins</h5>
            <p>What plans today?</p>
          </div>
          <div className="group-item-button">
            <Button variant="contained">Accept</Button>
          </div>
        </div>
        <div className="group-item-wraper">
          <div className="group-item-pic">
            <picture>
              <img src="./images/group/enjoy.jpg" alt="friends group" />
            </picture>
          </div>
          <div className="group-item-name">
            <h5>Friends Enjoy</h5>
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="group-item-button">
            <Button variant="contained">Accept</Button>
          </div>
        </div>
        <div className="group-item-wraper">
          <div className="group-item-pic">
            <picture>
              <img src="./images/group/friends.jpg" alt="friends group" />
            </picture>
          </div>
          <div className="group-item-name">
            <h5>Friends Reunion</h5>
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="group-item-button">
            <Button variant="contained">Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
