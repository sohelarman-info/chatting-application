import { Button } from "@mui/material";
import React from "react";
import "./style.css";

const Rootcomponents = ({ images, name, description, time, button }) => {
  return (
    <div className="root-wrapper">
      <div className="root-item-pic">
        <picture>
          <img src={images} alt="friends group" />
        </picture>
      </div>
      <div className="root-item-name">
        <h5>{name}</h5>
        <p>{!description ? time : description}</p>
      </div>
      <div className="root-item-time">
        <p>
          {button == undefined ? (
            time
          ) : (
            <div className="mygroups-item-button">
              <Button variant="contained">{button}</Button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default Rootcomponents;
