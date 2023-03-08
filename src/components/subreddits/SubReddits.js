import React from "react";
import "./SubReddits.css";
import "./SubReddits-mobile.css";
import askreddit from "./assets/askreddit.png";
import funny from "./assets/funny.png";
import mildlyinfuriating from "./assets/mildlyinfuriating.png";
import interestingasfuck from "./assets/interestingasf.png";
import gaming from "./assets/gaming.png";
import minecraft from "./assets/minecraft.png";
import movies from "./assets/movies.png";

const SubReddits = () => {
  const subReddits = {
    AskReddit: askreddit,
    Mildlyinfuriating: mildlyinfuriating,
    Interestingasfuck: interestingasfuck,
    Gaming: gaming,
    Minecraft: minecraft,
    Movies: movies,
    Funny: funny,
  };

  const handleClick = ({ target }) => {
    const currentlySelectedElement =
      document.getElementsByClassName("selected")[0];
    currentlySelectedElement.classList.toggle("selected");

    if (target.tagName === "DIV") {
      target.classList.toggle("selected");
    } else {
      target.parentElement.classList.toggle("selected");
    }
  };

  return (
    <div className="subreddits-div">
      <div className="title-container">
        <h2>Subreddits</h2>
      </div>
      <div className="listoptions">
        {Object.entries(subReddits).map((reddit, index) =>
          index === 0 ? (
            <div
              id={reddit[0]}
              className="reddit-div selected"
              onClick={handleClick}
            >
              <img src={reddit[1]} className="subreddit-image" />
              <p>{reddit[0]}</p>
            </div>
          ) : (
            <div id={reddit[0]} className="reddit-div" onClick={handleClick}>
              <img src={reddit[1]} className="subreddit-image" />
              <p>{reddit[0]}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubReddits;
