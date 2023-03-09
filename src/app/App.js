import "./App.css";
import "./App-mobile.css";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/Header";
import PostList from "../features/postlist/PostList";
import SubReddits from "../features/subredditstate/SubReddits";
import { fetchPosts } from "../features/postlist/postListSlice";

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Header />
      <div className="main-content-flex-div">
        <div className="main-content-div">
          <PostList />
          <SubReddits />
        </div>
      </div>
      {/*
      <h1>Hello World</h1>
      <p>{count}</p>
      <button onClick={handleClick}>increment</button>
      */}
    </div>
  );
};

export default App;
