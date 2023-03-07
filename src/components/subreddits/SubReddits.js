import React from "react";
import "./SubReddits.css";
import "./SubReddits-mobile.css";
import askreddit from "./assets/askreddit.png";
import funny from "./assets/funny.png";

const SubReddits = () => {
  const subReddits = {
    AskReddit: askreddit,
    mildyinfuriating:
      "https://styles.redditmedia.com/t5_2ubgg/styles/communityIcon_lkxajjefezh51.png?width=256&v=enabled&s=e9f08e5f20f9c160ae08bda2cfd54ad5af270323",
    interestingasfuck:
      "https://styles.redditmedia.com/t5_2qhsa/styles/communityIcon_5v3bepmshpg81.png?width=256&v=enabled&s=2914ade77dd2525043d2a30b44aad9ea0a38c0b9",
    gaming:
      "https://styles.redditmedia.com/t5_2qh03/styles/communityIcon_1isvxgkk7hw51.png?width=256&v=enabled&s=00f6d887500614cf4e45adc847b7ab075a8170a6",
    Minecraft:
      "https://b.thumbs.redditmedia.com/rwN0al9P6nYhGSQO-yIJb-FyF5xg-c2v61zjMom4c4E.png",
    movies:
      "https://styles.redditmedia.com/t5_2qh3s/styles/communityIcon_yq9ah8eniar81.jpg?width=256&format=pjpg&v=enabled&s=8f37365c563a8960ff102217387d22923856df76",
    funny: funny,
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
