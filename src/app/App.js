import "./App.css";
import "./App-mobile.css";
import Header from "../components/header/Header";
import PostList from "../features/postlist/PostList";
import SubReddits from "../features/subreddits/SubReddits";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {}, [window.innerWidth]);

  return (
    <div className="App">
      <Header />
      <div className="main-content-flex-div">
        <div className="main-content-div">
          <PostList />
          <SubReddits />
        </div>
      </div>
    </div>
  );
};

export default App;
