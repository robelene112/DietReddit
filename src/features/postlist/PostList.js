import React from "react";
import Post from "../../components/post/Post";
import "./PostList.css";
import "./PostList-mobile.css";

const PostList = () => {
  return (
    <div className="postlist-div">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostList;
