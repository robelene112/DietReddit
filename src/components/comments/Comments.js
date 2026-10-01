import { useSelector } from "react-redux";
import "./Comments.css";

const Comments = (props) => {
  const error = useSelector(
    (state) => state.postListSlice.posts[props.postNum].commentsError
  );
  const comments = useSelector((state) => {
    return state.postListSlice.posts[props.postNum].comments;
  }).slice(0, -1);

  return (
    <>
      {error && <p role="alert">{error}</p>}
      {comments.map((comment) => {
        return (
          <div className="comment">
            <div className="comment-metadata">
              <p>{comment.author}</p>
              <p>{props.created(comment.created)}</p>
            </div>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
