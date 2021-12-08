import request from "./client";

describe("Login", () => {
  it("Login without required parameter", () => {
    return request
      .post("/user/login")
      .send({
        email: "test01@gmail.com",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual(false);
      });
  });

  it("Login with incorrect password", () => {
    return request
      .post("/user/login")
      .send({
        email: "test01@gmail.com",
        password: "1123",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual(false);
      });
  });

  it("Login success and return user token", () => {
    return request
      .post("/user/login")
      .send({
        email: "test01@gmail.com",
        password: "1234",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual(true);
        expect(response.body.token).not.toBeNull();
      });
  });
});
