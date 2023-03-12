import React from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

const SearchBox = () => {
  return (
    <div className="search-wrapper">
      <div className="search-icon">
        <FiSearch />
      </div>
      <div className="search-input">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchBox;
