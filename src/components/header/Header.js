import React from "react";
import "./Header.css";
import "./Header-mobile.css";
import logo from "./kirby.png";
import Search from "../../features/search/Search";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} className="logo" />
        <h1 className="logo-text">
          Diet<span id="word-reddit">reddit</span>
        </h1>
      </div>
      <Search />
    </div>
  );
};

export default Header;
