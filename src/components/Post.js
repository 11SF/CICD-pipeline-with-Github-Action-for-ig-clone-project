import {Avatar} from "@material-ui/core";
import React, {useState} from "react";
import "../css/Post.css";
import CommentBox from "./CommentBox";
import Comments from "./Comments";

function Post({postID, user, username, caption, imageURL}) {
  const [newComment, setNewComment] = useState({});
  let baseImageURL = `${window.location.protocol}//${window.location.hostname}:3001`;
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h4 className="post__username">{username}</h4>
      </div>
      <img
        src={baseImageURL + imageURL.replace("public", "")}
        alt={username}
        className="post__image"
      />
      <h4 className="post__caption">
        <strong>{username}</strong> {caption}
      </h4>
      <Comments postID={postID} newComment={newComment} />
      <CommentBox user={user} postID={postID} setNewComment={setNewComment} />
    </div>
  );
}

export default Post;
