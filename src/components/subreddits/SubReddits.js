import React from "react";
import "./SubReddits.css";
import "./SubReddits-mobile.css";

const SubReddits = () => {
  const subReddits = {
    AskReddit:
      "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png",
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

  return (
    <div className="subreddits-div">
      <h2>SubReddits</h2>
      <ul>
        {Object.entries(subReddits).map((reddit) => {
          return (
            <li>
              <div>
                <img src={reddit[1]} />
                <p>{reddit[0]}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubReddits;
