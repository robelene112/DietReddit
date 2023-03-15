import React, { useEffect } from "react";
import "./SubReddits.css";
import "./SubReddits-mobile.css";
import { selectSubReddit, SubRedditsSelector } from "./subRedditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../postlist/postListSlice";

const SubReddits = () => {
  const subReddits = useSelector(SubRedditsSelector);
  const dispatch = useDispatch();

  const selectSubRedditHandler = ({ target }) => {
    const currentlySelectedElement =
      document.getElementsByClassName("selected")[0];
    currentlySelectedElement.classList.toggle("selected");

    let reddit_div;

    if (target.tagName === "DIV") {
      reddit_div = target;
    } else {
      reddit_div = target.parentElement;
    }

    reddit_div.classList.toggle("selected");
    dispatch(selectSubReddit(reddit_div.innerText));
    dispatch(fetchPosts());

    if (window.innerWidth <= 480) {
      const hamburger = document.getElementsByClassName("hamburger")[0];
      hamburger.classList.toggle("is-active");

      const subRedditDiv = document.querySelector(".subreddits-div");

      if (hamburger.className === "hamburger is-active") {
        subRedditDiv.style = "display: block; position: absolute";
      } else {
        subRedditDiv.style = "display: none";
      }
    }

    console.log(window.innerWidth);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="subreddits-div">
      <div className="title-container">
        <h2>Subreddits</h2>
      </div>
      <div className="listoptions">
        {Object.entries(subReddits).map((reddit, index) =>
          index === 0 ? (
            <div
              key={reddit[0]}
              className="reddit-div selected"
              onClick={selectSubRedditHandler}
            >
              <img src={reddit[1]} className="subreddit-image" />
              <p>{reddit[0]}</p>
            </div>
          ) : (
            <div
              key={reddit[0]}
              className="reddit-div"
              onClick={selectSubRedditHandler}
            >
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
