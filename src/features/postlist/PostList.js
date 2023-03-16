import React, { useEffect } from "react";
import PostContainer from "../../components/postcontainer/PostContainer";
import "./PostList.css";
import "./PostList-mobile.css";
import { useSelector } from "react-redux";
import { postListSliceSelector } from "./postListSlice";
import {
  searchBarValueSelector,
  searchedPostsSelector,
} from "../searchbar/searchBarSlice";

const PostList = () => {
  const posts = useSelector(postListSliceSelector);
  const searchedPosts = useSelector(searchedPostsSelector);
  const searchbarValue = useSelector(searchBarValueSelector);
  const postsToRender = searchbarValue ? searchedPosts : posts;

  return (
    <div className="postlist-div">
      {postsToRender.map((post, index) => {
        return (
          <PostContainer
            key={index}
            postNum={index}
            title={post.content.title}
            url={post.content.url}
            upvotes={post.content.ups}
            author={post.content.author}
            created={post.content.created}
            commentcount={post.content.num_comments}
            isVideo={post.content.is_video}
            secureMedia={post.content.secure_media}
          />
        );
      })}
    </div>
  );
};

export default PostList;
