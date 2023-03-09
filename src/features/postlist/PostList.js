import React from "react";
import Post from "../../components/post/Post";
import "./PostList.css";
import "./PostList-mobile.css";
import { useSelector } from "react-redux";
import { postListSliceSelector } from "./postListSlice";

const PostList = () => {
  const posts = useSelector(postListSliceSelector);

  return (
    <div className="postlist-div">
      {posts.map((post) => {
        return <Post title={post.title} image={post.image} />;
      })}
    </div>
  );
};

export default PostList;
