import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import axios from "../axios";

function Comments({postID, newComment}) {
  const [comments, setComments] = useState([]);
  const loadComment = async () => {
    const res = await axios.get(`/post/getComment/${postID}`, {
      headers: {"x-access-token": sessionStorage.getItem("userToken")},
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
    setComments(comments => [newComment, ...comments]);
  }, [newComment]);
  return (
    <div>
      {comments.map((comment, id) => (
        <Comment key={id} username={comment.username} comment={comment.text} />
      ))}
    </div>
  );
}

function Comment({username, comment}) {
  return (
    <StyledCommentContainer>
      <StyledUsername>{username}</StyledUsername>
      <StyledComment>{comment}</StyledComment>
    </StyledCommentContainer>
  );
}
export default Comments;

const StyledCommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px 10px;
`;
const StyledUsername = styled.h5``;
const StyledComment = styled.p`
  margin-left: 10px;
  font-size: 0.8em;
`;
