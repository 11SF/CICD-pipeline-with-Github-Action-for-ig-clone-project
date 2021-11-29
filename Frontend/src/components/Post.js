import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../css/Post.css";
import CommentBox from "./CommentBox";
import Comments from "./Comments";
import { baseImageURL } from "../servicesURL";
import axios from "../axios";

function Post({
  postID,
  post_owner_id,
  user,
  username,
  caption,
  like_count,
  imageURL,
  deletePost,
}) {
  const [likeArr, setLikeArr] = useState(like_count);
  const [isLike, setIsLike] = useState(false);
  const [newComment, setNewComment] = useState({});
  const likePress = async () => {
    let result = await axios.put(
      "/post/likePress/" + postID,
      { owner_id: user.id },
      {
        headers: { "x-access-token": sessionStorage.getItem("userToken") },
      }
    );
    if (result.data.status) {
      setLikeArr(result.data.like_count);
    }
  };
  useEffect(() => {
    if (user !== null) {
      let result = likeArr.filter((e) => e === user.id);
      if (result.length > 0) {
        return setIsLike(true);
      } else {
        return setIsLike(false);
      }
    }
    return setIsLike(false);
  }, [likeArr]);
  return (
    <div className="post">
      <div className="post__header_section">
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h4 className="post__username">{username}</h4>
        </div>
        {user ? (
          post_owner_id === user.id ? (
            <Button onClick={() => deletePost(postID)}>🗑️</Button>
          ) : null
        ) : null}
      </div>
      <img
        src={baseImageURL + imageURL.replace("public", "")}
        alt={username}
        className="post__image"
      />
      <div className="like_section">
        {user ? (
          <Button
            onClick={likePress}
            style={
              isLike
                ? {
                    backgroundColor: "#55C6FF",
                    border: "1px solid #f1f1f1",
                    color: "white",
                  }
                : null
            }
          >
            👍 {likeArr.length}{" "}
          </Button>
        ) : (
          <Button disabled >👍 {likeArr.length} </Button>
        )}
      </div>
      <h4 className="post__caption">
        <strong>{username}</strong> {caption}
      </h4>
      <Comments user={user} postID={postID} newComment={newComment} />
      <CommentBox user={user} postID={postID} setNewComment={setNewComment} />
    </div>
  );
}

export default Post;
