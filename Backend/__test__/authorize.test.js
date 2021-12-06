import request from "./client";

describe("Require token for access", () => {
  it("Create Post API", () => {
    return request.post("/post/createPost").expect(403);
  });
  it("Delete Post API", () => {
    return request.delete("/post/deletePost/123").expect(403);
  });
  it("Get Post API", () => {
    return request.get("/post/getPost/123").expect(403);
  });
  it("Create Comment API", () => {
    return request.put("/post/createComment").expect(403);
  });
  it("Delete Comment API", () => {
    return request.delete("/post/deleteComment/123").expect(403);
  });

  
});
