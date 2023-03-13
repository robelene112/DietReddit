import Post from "../post/Post";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../features/postlist/postListSlice";

const PostContainer = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [voted, setVoted] = useState("");
  const [upVotes, setUpVotes] = useState(props.upvotes);
  const dispatch = useDispatch();

  const toggleComments = () => {
    setShowComments(!showComments);
    dispatch(fetchComments(props.postNum));
  };

  const showMedia = () => {
    if (props.isVideo) {
      return (
        <video className="post-media" controls>
          <source
            src={props.secureMedia.reddit_video.fallback_url}
            type="video/mp4"
          ></source>
          no browser support
        </video>
      );
    }
    if (props.url.slice(-4)[0] === ".") {
      return <img src={props.url} className="post-media"></img>;
    }

    return <p className="post-media">No media</p>;
  };

  const upVote = ({ target }) => {
    const up =
      document.getElementsByClassName("upvote-button up")[props.postNum];
    const down =
      document.getElementsByClassName("upvote-button down")[props.postNum];
    const count =
      document.getElementsByClassName("upvote-count")[props.postNum];

    if (target.className === "upvote-button up") {
      switch (voted) {
        case "up":
          setVoted(() => "");
          setUpVotes((upVotes) => upVotes - 1);
          up.style = "";
          count.style = "";
          break;
        case "down":
          setVoted(() => "up");
          setUpVotes((upVotes) => upVotes + 2);
          down.style = "";
          up.style = "color: green";
          count.style = "color: green";
          break;
        default:
          setVoted(() => "up");
          setUpVotes((upVotes) => upVotes + 1);
          up.style = "color: green";
          count.style = "color: green";
          break;
      }
    } else {
      switch (voted) {
        case "up":
          setVoted(() => "down");
          setUpVotes((upVotes) => upVotes - 2);
          up.style = "";
          down.style = "color: red";
          count.style = "color: red";
          break;
        case "down":
          setVoted(() => "");
          setUpVotes((upVotes) => upVotes + 1);
          down.style = "";
          count.style = "";
          break;
        default:
          setVoted(() => "down");
          setUpVotes((upVotes) => upVotes - 1);
          down.style = "color: red";
          count.style = "color: red";
          break;
      }
    }
  };

  const createdBy = (arg) => {
    const created = arg ? new Date(arg * 1000) : new Date(props.created * 1000);
    const todaysDate = new Date();
    const timeElapsed = todaysDate.getTime() - created.getTime();
    const timeElapsedInSeconds = timeElapsed / 1000;

    if (timeElapsedInSeconds < 60) {
      return "Just now";
    } else if (timeElapsedInSeconds < 3600) {
      const minutesAgo = Math.floor(timeElapsedInSeconds / 60);
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else if (timeElapsedInSeconds < 86400) {
      const hoursAgo = Math.floor(timeElapsedInSeconds / 3600);
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (timeElapsedInSeconds < 604800) {
      const daysAgo = Math.floor(timeElapsedInSeconds / 86400);
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (timeElapsedInSeconds < 2592000) {
      const weeksAgo = Math.floor(timeElapsedInSeconds / 604800);
      return weeksAgo === 1 ? "1 week ago" : `${weeksAgo} weeks ago`;
    } else {
      const monthsAgo = Math.floor(timeElapsedInSeconds / 2592000);
      return monthsAgo === 1 ? "1 month ago" : `${monthsAgo} months ago`;
    }
  };

  return (
    <Post
      key={props.postNum}
      postNum={props.postNum}
      title={props.title}
      media={showMedia()}
      upvotes={upVotes}
      upVote={upVote}
      author={props.author}
      created={createdBy}
      commentcount={props.commentcount}
      toggleComments={toggleComments}
      showComments={showComments}
    />
  );
};

export default PostContainer;
