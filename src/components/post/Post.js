import React from "react";
import "./Post.css";

const Post = () => {
  return (
    <div className="post-div">
      <div className="updoot-div">
        <button className="updoot-up">⇧</button>
        <div className="updoot-count">13k</div>
        <button className="updoot-down">⇩</button>
      </div>
      <div>
        <h3>Heckin wholesome post!!</h3>
        <img
          src="https://i.pinimg.com/originals/10/67/29/1067297eead5bdb13f0a5195d4193e5d.png"
          className="post-image"
        ></img>
        <div className="metadata-div">
          <p>Costner-Facts</p>
          <p>17 hours ago</p>
          <p>264</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
