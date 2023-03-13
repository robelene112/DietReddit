import { useSelector } from "react-redux";
import { commentsSelector } from "./commentsSlice";

const Comments = () => {
  const comments = useSelector(commentsSelector);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="comment">
            <div className="comment-metadata">
              <p>robelene112</p>
              <p>7 hours ago</p>
            </div>
            <p>This is a hecking wholesome comment!! Updoots for everyone!</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
