import React from "react";
import "./Header.css";
import "./Header-mobile.css";
import logo from "./kirby.png";
import Search from "../../features/search/Search";

const Header = () => {
  const toggleHamburgerMenu = () => {
    const hamburger = document.getElementsByClassName("hamburger")[0];
    hamburger.classList.toggle("is-active");

    const subRedditDiv = document.querySelector(".subreddits-div");

    if (hamburger.className === "hamburger is-active") {
      subRedditDiv.style = "display: block; position: absolute";
    } else {
      subRedditDiv.style = "display: none";
    }
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} className="logo" />
        <h1 className="logo-text">
          Diet<span id="word-reddit">reddit</span>
        </h1>
      </div>
      <Search />
      <div className="hamburger" onClick={toggleHamburgerMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
    </div>
  );
};

export default Header;
