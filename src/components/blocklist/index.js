import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Rootcomponents from "../rootcomponents/Rootcomponents";
import { UserData } from "./data";
import "./style.css";

const BlockList = () => {
  return (
    <div className="block-wrapper">
      <div className="block-list-header">
        <h4>Block List</h4>
        <div className="block-list-option">
          <SlOptionsVertical />
        </div>
      </div>

      <div className="block-wrapper-scroll">
        {UserData.map((item, i) => {
          return (
            <Rootcomponents
              key={i}
              images={item.images}
              name={item.name}
              description={item.description}
              time={item.time}
              button={item.button}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlockList;
