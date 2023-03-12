import React, { useState } from "react";
import "./Post.css";
import "./Post-mobile.css";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [voted, setVoted] = useState("");
  const [upVotes, setUpVotes] = useState(props.updoots);

  const toggleComments = () => {
    setShowComments(!showComments);
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
    if (props.media.slice(-4)[0] === ".") {
      return <img src={props.media} className="post-media"></img>;
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

  const createdBy = () => {
    const created = new Date(props.created * 1000);
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
    <div className="grid-container">
      <div className="upvotes">
        <button className="upvote-button up" onClick={upVote}>
          ⇧
        </button>
        <p className="upvote-count">
          {upVotes > 999 ? (upVotes / 1000).toFixed(1) + "k" : upVotes}
        </p>
        <button className="upvote-button down" onClick={upVote}>
          ⇩
        </button>
      </div>
      <div className="content">
        <div className="title">
          <h3 className="">{props.title}</h3>
        </div>
        <div className="media">{showMedia()}</div>
        <div className="metadata">
          <p className="author">{props.author}</p>
          <p className="created">{createdBy()}</p>
          <p className="comments" onClick={toggleComments}>
            💬 {props.commentcount}
          </p>
        </div>
      </div>
      {showComments ? (
        <div className="comments-div">
          <div className="comments-header-container">
            <h3>Comments</h3>
          </div>
          <div className="comments-container">
            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>This is a hecking wholesome comment!! Updoots for everyone!</p>
            </div>

            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>
                Frankly i don't agree how this can be heckin wholesome to
                anyone. As a long time redditooor with over 6 gorillian karma i
                don't think this fits within the Our democracy and bla bla bla
                bla
              </p>
            </div>
            <div className="comment">
              <div className="comment-metadata">
                <p>robelene112</p>
                <p>7 hours ago</p>
              </div>
              <p>This is a hecking wholesome comment!! Updoots for everyone!</p>
            </div>
            <div className="comment">
              <div className="comment-metadata">
                <p>ballsaque</p>
                <p>10 hours ago</p>
              </div>
              <p>word</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
