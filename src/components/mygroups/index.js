import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Rootcomponents from "../rootcomponents/Rootcomponents";
import { mygroupsdata } from "./data";
import "./style.css";

const MyGroups = () => {
  return (
    <div className="mygroups-wrapper">
      <div className="mygroups-list-header">
        <h4>My Groups</h4>
        <div className="mygroups-list-option">
          <SlOptionsVertical />
        </div>
      </div>

      <div className="mygroups-wrapper-scroll">
        {mygroupsdata.map((item, i) => (
          <Rootcomponents
            key={i}
            images={item.images}
            name={item.name}
            description={item.description}
            time={item.time}
            button={item.button}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
