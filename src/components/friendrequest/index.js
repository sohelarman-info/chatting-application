import { Button } from "@mui/material";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import "./style.css";
import { BsCheck2 } from "react-icons/bs";

const FriendRequest = () => {
  return (
    <div className="friends-request-wrapper">
      <div className="friends-list-header">
        <h4>Friends Request</h4>
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
            <div className="accept-button">
              <Button variant="contained">
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
            <div className="accept-button">
              <Button variant="contained">
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
            <div className="accept-button">
              <Button variant="contained">
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
            <div className="accept-button">
              <Button variant="contained">
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
            <div className="accept-button">
              <Button variant="contained">
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
      </div>
    </div>
  );
};

export default FriendRequest;
