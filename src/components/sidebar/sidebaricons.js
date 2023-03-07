import React from "react";
import "./style.css";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const SidebarIcons = () => {
  return (
    <div className="sidebar-icons">
      <div className="page-icon">
        <AiOutlineHome />
      </div>
      <div className="page-icon">
        <BsChatDots />
      </div>
      <div className="page-icon">
        <FaRegBell />
      </div>
      <div className="page-icon">
        <AiOutlineSetting />
      </div>
    </div>
  );
};

export default SidebarIcons;
