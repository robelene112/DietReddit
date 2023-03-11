import React, { useState } from "react";
import "./Post.css";
import "./Post-mobile.css";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);

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

  return (
    <div className="grid-container">
      <div className="upvotes">
        <button className="upvote-button">⇧</button>
        <p>
          {props.updoots > 999
            ? (props.updoots / 1000).toFixed(1) + "k"
            : props.updoots}
        </p>
        <button className="upvote-button">⇩</button>
      </div>
      <div className="content">
        <div className="title">
          <h3 className="">{props.title}</h3>
        </div>
        <div className="media">{showMedia()}</div>
        <div className="metadata">
          <p className="author">{props.author}</p>
          <p className="created">17 hours ago</p>
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

  {
    /*
    <div className="grid-container">
      <div className="post-div">
        <div className="updoot-div">
          <button className="updoot"></button>
          <div className="updoot-count">
            {props.updoots > 999
              ? (props.updoots / 1000).toFixed(1) + "k"
              : props.updoots}
          </div>
          <button className="updoot"></button>
        </div>
        <div className="content-div">
          <div className="post-title">
            <h3>{props.title}</h3>
          </div>
          {showMedia()}
          <div className="metadata-div">
            <p className="author">{props.author}</p>
            <p className="upload-time">17 hours ago</p>
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
                <p>
                  This is a hecking wholesome comment!! Updoots for everyone!
                </p>
              </div>

              <div className="comment">
                <div className="comment-metadata">
                  <p>robelene112</p>
                  <p>7 hours ago</p>
                </div>
                <p>
                  Frankly i don't agree how this can be heckin wholesome to
                  anyone. As a long time redditooor with over 6 gorillian karma
                  i don't think this fits within the Our democracy and bla bla
                  bla bla
                </p>
              </div>
              <div className="comment">
                <div className="comment-metadata">
                  <p>robelene112</p>
                  <p>7 hours ago</p>
                </div>
                <p>
                  This is a hecking wholesome comment!! Updoots for everyone!
                </p>
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
    </div>
        */
  }
};

export default Post;
