import "./App.css";
import { testSliceSelector, increment } from "../features/testSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const count = useSelector(testSliceSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increment());
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>{count}</p>
      <button onClick={handleClick}>increment</button>
    </div>
  );
};

export default App;
