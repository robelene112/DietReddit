import React, { useState } from "react";
import "./Post.css";
import "./Post-mobile.css";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post-div">
      <div className="updoot-div">
        <button className="updoot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        </button>
        <div className="updoot-count">13k</div>
        <button className="updoot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </button>
      </div>
      <div className="content-div">
        <div className="post-title">
          <h3>{props.title}</h3>
        </div>
        <img src={props.image} className="post-image"></img>
        <div className="metadata-div">
          <p className="author">Costner-Facts</p>
          <p className="upload-time">17 hours ago</p>
          <p className="comments" onClick={toggleComments}>
            💬 264
          </p>
        </div>
      </div>
      {showComments ? (
        <div className="comments-div">
          <div className="comments-header-container">
            <h3>Comments</h3>
          </div>
          <div className="comments-container">
            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>This is a hecking wholesome comment!! Updoots for everyone!</p>
            </div>

            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>
                Frankly i don't agree how this can be heckin wholesome to
                anyone. As a long time redditooor with over 6 gorillian karma i
                don't think this fits within the Our democracy and bla bla bla
                bla
              </p>
            </div>
            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>This is a hecking wholesome comment!! Updoots for everyone!</p>
            </div>
            <div className="comment">
              <div className="comment-metadata">
                <p>ballsaque</p>
                <p>10 hours ago</p>
              </div>
              <p>word</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
