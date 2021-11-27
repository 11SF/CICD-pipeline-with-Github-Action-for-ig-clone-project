import React, { useState } from "react";
import styled from "styled-components/macro";
import axios from "../axios";

function CommentBox({user, postID, setNewComment}) {
  const [comment, setComment] = useState("");
  const submitHandler = async event => {
    const newComment = {
      id: postID,
      text: comment,
      username: user.username,
    };
    event.preventDefault();
    const res = await axios.put("/post/createComment", newComment, {
      headers: {"x-access-token": sessionStorage.getItem("userToken")},
    });

    if (res.data.status) {
      setNewComment(newComment);
      setComment("");
    }
  };
  return (
    <>
      {user ? (
        <Wrapper>
          <InputComment
            value={comment}
            onChange={e => setComment(e.target.value)}
            type="text"
            placeholder="Add comment here..."
          />
          <InputButton onClick={submitHandler}>Submit</InputButton>
        </Wrapper>
      ) : (
        <Prompt>Login to comment</Prompt>
      )}
    </>
  );
}

const Prompt = styled.h4`
  text-align: center;
  padding: 10px;
  border-top: 1px solid #cacaca;
`;

const InputComment = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
`;

const InputButton = styled.button`
  flex: 0;
  border: none;
  color: #6082a3;
  padding: 10px;
  background-color: white;
`;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid #cacaca;
`;
export default CommentBox;
