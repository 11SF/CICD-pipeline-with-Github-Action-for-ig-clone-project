import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components/macro";
import axios from "../axios";

function Comments({ user, postID, newComment }) {
  const [comments, setComments] = useState([]);
  const loadComment = async () => {
    const res = await axios.get(`/post/getComment/${postID}`, {
      headers: { "x-access-token": sessionStorage.getItem("userToken") },
    });
    if (res.data.status) {
      setComments(res.data.comments);
    }
  };
  useEffect(() => {
    loadComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postID]);
  useEffect(() => {
    // setComments((comments) => [...comments, newComment]);
    loadComment()
  }, [newComment]);

  const deleteComment = async (commentId) => {
    let result = await axios.delete("/post/deleteComment/" + commentId, {
      headers: { "x-access-token": sessionStorage.getItem("userToken") },
    });
    if (result.data.status) {
      setComments(comments.filter((e) => e._id !== commentId));
    }
  };
  return (
    <div>
      {comments.map((comment, id) => (
        <Comment
          key={id}
          commentId={comment._id}
          username={comment.username}
          comment={comment.text}
          ownerId={comment.owner_id}
          user={user}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}

function Comment({
  commentId,
  username,
  comment,
  ownerId,
  user,
  deleteComment,
}) {
  return (
    <StyledCommentContainer>
      <StyledCommentContent>
        <StyledUsername>{username}</StyledUsername>
        <StyledComment>{comment}</StyledComment>
      </StyledCommentContent>
      {user ? (
        ownerId === user.id ? (
          <Button onClick={() => deleteComment(commentId)}>🗑️</Button>
        ) : null
      ) : null}
    </StyledCommentContainer>
  );
}
export default Comments;

const StyledCommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 10px;
`;
const StyledCommentContent = styled.div`
  display: flex;
  align-items: center;
`;
const StyledUsername = styled.h5``;
const StyledComment = styled.p`
  margin-left: 10px;
  font-size: 0.8em;
`;
