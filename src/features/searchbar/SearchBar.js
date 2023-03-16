import React from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { postListSliceSelector } from "../postlist/postListSlice";
import { filterPosts } from "./searchBarSlice";
import { updateValue } from "./searchBarSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postListSliceSelector);

  const findPosts = ({ target }) => {
    const filteredPosts = posts.filter((post) =>
      post.content.title.includes(target.value)
    );
    dispatch(updateValue(target.value));
    dispatch(filterPosts(filteredPosts));
  };

  return (
    <input
      className="searchbar"
      onChange={findPosts}
      placeholder="🔎 Search posts"
    ></input>
  );
};

export default SearchBar;
