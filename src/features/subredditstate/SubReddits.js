import React, { useEffect } from "react";
import "./SubReddits.css";
import "./SubReddits-mobile.css";
import { selectSubReddit, SubRedditsSelector } from "./subRedditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../postlist/postListSlice";

const SubReddits = () => {
  const subReddits = useSelector(SubRedditsSelector);
  const dispatch = useDispatch();

  const handleClick = ({ target }) => {
    const currentlySelectedElement = document.querySelector(".selected");
    currentlySelectedElement.classList.toggle("selected");

    if (target.tagName === "DIV") {
      target.classList.toggle("selected");
      dispatch(selectSubReddit(target.innerText));
      dispatch(fetchPosts());
    } else {
      target.parentElement.classList.toggle("selected");
      dispatch(selectSubReddit(target.parentElement.innerText));
      dispatch(fetchPosts());
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // TODO: use the selectedSubReddit to choose the selected class

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
              onClick={handleClick}
            >
              <img src={reddit[1]} className="subreddit-image" />
              <p>{reddit[0]}</p>
            </div>
          ) : (
            <div key={reddit[0]} className="reddit-div" onClick={handleClick}>
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
