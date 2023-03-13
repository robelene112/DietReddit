import "./Post.css";
import "./Post-mobile.css";
import Comments from "../comments/Comments";

const Post = (props) => {
  return (
    <div className="grid-container">
      <div className="upvotes">
        <button className="upvote-button up" onClick={props.upVote}>
          ⇧
        </button>
        <p className="upvote-count">
          {props.upvotes > 999
            ? (props.upvotes / 1000).toFixed(1) + "k"
            : props.upvotes}
        </p>
        <button className="upvote-button down" onClick={props.upVote}>
          ⇩
        </button>
      </div>
      <div className="content">
        <div className="title">
          <h3 className="">{props.title}</h3>
        </div>
        <div className="media">{props.media}</div>
        <div className="metadata">
          <p className="author">{props.author}</p>
          <p className="created">{props.created()}</p>
          <p className="comments" onClick={props.toggleComments}>
            💬 {props.commentcount}
          </p>
        </div>
      </div>
      {props.showComments ? (
        <div className="comments-div">
          <div className="comments-header-container">
            <h3>Comments</h3>
          </div>
          <div className="comments-container">
            <Comments
              key={props.postNum}
              postNum={props.postNum}
              created={props.created}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
