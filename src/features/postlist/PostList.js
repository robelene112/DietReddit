import React from "react";
import PostContainer from "../../components/postcontainer/PostContainer";
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
          <PostContainer
            key={index}
            postNum={index}
            title={post.title}
            url={post.url}
            upvotes={post.ups}
            author={post.author}
            created={post.created}
            commentcount={post.num_comments}
            isVideo={post.is_video}
            secureMedia={post.secure_media}
          />
        );
      })}
    </div>
  );
};

export default PostList;
