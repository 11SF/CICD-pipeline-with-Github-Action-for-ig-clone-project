import request from "./client";

describe("test Create, Read and Delete actions for Comment", () => {
  let userToken;
  let post_id;
  let comment_id;
  it("should create a comment successfully", async () => {
    let logInResponse = await request.post("/user/login").send({
      email: "test01@gmail.com",
      password: "1234",
    });
    expect(logInResponse.body.status).toBe(true);
    userToken = logInResponse.body.token;

    let createPostResponse = await request
      .post("/post/createPost")
      .set({
        "Content-Type": "multipart/form-data",
        "x-access-token": userToken,
      })
      .field({ caption: "test create post" })
      .attach("file", "./public/images/test_photo.jpg");
    expect(createPostResponse.body.status).toBe(true);
    post_id = createPostResponse.body.post._id;

    let createCommentResponse = await request
      .put("/post/createComment")
      .set({
        "x-access-token": userToken,
      })
      .send({ id: post_id, text: "test comment 1" });
    expect(createCommentResponse.body.status).toBe(true);
    expect(createCommentResponse.body.msg).toBe("Add comment successfully");
  });
  it("should read a comment successfully", async () => {
    let getCommentResponse = await request.get(
      "/post/getComment/" + post_id
    );
    comment_id = getCommentResponse.body.comments[0]._id

    expect(getCommentResponse.body.status).toBe(true);
    expect(getCommentResponse.body.comments[0].text).toBe("test comment 1");
  });
  it("should delete a comment successfully", async () => {
    let deleteCommentResponse = await request
      .delete("/post/deleteComment/" + comment_id)
      .set({
        "x-access-token": userToken,
      });

    expect(deleteCommentResponse.body.status).toBe(true);
    expect(deleteCommentResponse.body.msg).toBe("Delete comment successfully");
  });
  it("should return 'not found comment' when get comment after delete the last comment", async () => {
    let getCommentResponse = await request.get(
      "/post/getComment/" + post_id
    );

    expect(getCommentResponse.body.status).toBe(false);
    expect(getCommentResponse.body.msg).toBe(
      `Comment of post id:${post_id} is not found`
    );

    await request.delete("/post/deletePost/" + post_id).set({
      "x-access-token": userToken,
    });
  });
});
