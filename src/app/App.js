import "./App.css";
import "./App-mobile.css";
import { testSliceSelector, increment } from "../features/testSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/Header";
import PostList from "../features/postlist/PostList";
import SubReddits from "../components/subreddits/SubReddits";

const App = () => {
  const count = useSelector(testSliceSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increment());
  };

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
