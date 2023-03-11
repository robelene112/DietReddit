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
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            title={post.title}
            media={post.url}
            updoots={post.ups}
            author={post.author}
            created={post.created}
            commentcount={post.num_comments}
            isVideo={post.is_video}
            secureMedia={post.secure_media}
            isPinned={post.pinned}
          />
        );
      })}
    </div>
  );
};

export default PostList;
