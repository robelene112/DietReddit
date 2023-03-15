import "./App.css";
import "./App-mobile.css";
import Header from "../components/header/Header";
import PostList from "../features/postlist/PostList";
import SubReddits from "../features/subredditstate/SubReddits";

const App = () => {
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
