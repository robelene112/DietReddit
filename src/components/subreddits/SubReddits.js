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
  };

  const handleClick = ({ target }) => {
    let redditDiv;
    if (target.tagName === "DIV") {
      const unorderedListEntries =
        target.parentElement.parentElement.childNodes;

      const selectedElement = Object.entries(unorderedListEntries).filter(
        (element) => {
          console.log(element[1].childNodes[0]);
          console.log(`Corresponding ${element[1].childNodes[0].className}`);
          return element[1].childNodes[0].className === "reddit-div selected";
        }
      );

      console.log(selectedElement);

      if (selectedElement.length > 0) {
        console.log("Found selected element");
        console.log(selectedElement[0][1].childNodes[0]);
        selectedElement[0][1].childNodes[0].classList.toggle("selected");
      } else {
        redditDiv = document.getElementById(target.id);
        redditDiv.classList.toggle("selected");
      }
    }
  };

  return (
    <div className="subreddits-div">
      <div className="title-container">
        <h2>Subreddits</h2>
      </div>
      <div className="listoptions">
        <ul>
          {Object.entries(subReddits).map((reddit) => {
            return (
              <li>
                <div
                  id={reddit[0]}
                  className="reddit-div"
                  onClick={handleClick}
                >
                  <div className="image">
                    <img src={reddit[1]} />
                  </div>
                  <p>{reddit[0]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SubReddits;
