import request from "./client";
describe("test Create, Read, UpdateLikeCount and Delete actions for Post", () => {
  let userToken;
  let post_id;
  it("should create a post successfully", async () => {
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

    post_id = createPostResponse.body.post._id;
    expect(createPostResponse.body.status).toBe(true);
    expect(createPostResponse.body.msg).toBe("Created Post Success");
  });

  it("should get this post successfully", async () => {
    let getPostResponse = await request.get("/post/getPost/" + post_id).set({
      "x-access-token": userToken,
    });
    expect(getPostResponse.body.status).toBe(true);
    expect(getPostResponse.body.post._id).toBe(post_id);
  });

  it("should increase like count + 1 for this post when calling API", async () => {
    let likeResponse = await request.put("/post/likePress/" + post_id).set({
      "x-access-token": userToken,
    });
    expect(likeResponse.body.status).toBe(true);
    expect(likeResponse.body.like_count.length).toBe(1);
  });

  it("should decrease like count - 1 for this post with the same user when calling API again", async () => {
    let likeResponse = await request.put("/post/likePress/" + post_id).set({
      "x-access-token": userToken,
    });
    expect(likeResponse.body.status).toBe(true);
    expect(likeResponse.body.like_count.length).toBe(0);
  });

  it("should delete this post successfully", async () => {
    let deletePostResponse = await request
      .delete("/post/deletePost/" + post_id)
      .set({
        "x-access-token": userToken,
      });
    expect(deletePostResponse.body.status).toBe(true);
    expect(deletePostResponse.body.msg).toBe("Delete post successfully");

    let deletePostResponse2 = await request
      .delete("/post/deletePost/" + post_id)
      .set({
        "x-access-token": userToken,
      });
    expect(deletePostResponse2.body.status).toBe(false);
  });
});
