import { Button } from "@mui/material";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./style.css";

const FriendList = () => {
  return (
    <div className="friends-list-wrapper">
      <div className="friends-list-header">
        <h4>Friends List</h4>
        <div className="friends-list-option">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="friends-wrapper-scroll">
        <div className="friends-item-wraper">
          <div className="friends-item-pic">
            <picture>
              <img src="./images/friends/1.jpg" alt="friends friends" />
            </picture>
          </div>
          <div className="friends-item-name">
            <h5>Raghav</h5>
            <p>Dinner?</p>
          </div>
          <div className="friends-item-button">
            <div className="block-button">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
        <div className="friends-item-wraper">
          <div className="friends-item-pic">
            <picture>
              <img src="./images/friends/2.jpg" alt="friends friends" />
            </picture>
          </div>
          <div className="friends-item-name">
            <h5>Swathi</h5>
            <p>su re!</p>
          </div>
          <div className="friends-item-button">
            <div className="block-button">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
        <div className="friends-item-wraper">
          <div className="friends-item-pic">
            <picture>
              <img src="./images/friends/3.jpg" alt="friends friends" />
            </picture>
          </div>
          <div className="friends-item-name">
            <h5>Kiran</h5>
            <p>Hi...</p>
          </div>
          <div className="friends-item-button">
            <div className="block-button">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
        <div className="friends-item-wraper">
          <div className="friends-item-pic">
            <picture>
              <img src="./images/friends/4.jpg" alt="friends friends" />
            </picture>
          </div>
          <div className="friends-item-name">
            <h5>Tejeshwini C</h5>
            <p>I will call him today.</p>
          </div>
          <div className="friends-item-button">
            <div className="block-button">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
        <div className="friends-item-wraper">
          <div className="friends-item-pic">
            <picture>
              <img src="./images/friends/5.jpg" alt="friends friends" />
            </picture>
          </div>
          <div className="friends-item-name">
            <h5>John</h5>
            <p>Go on</p>
          </div>
          <div className="friends-item-button">
            <div className="block-button">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
