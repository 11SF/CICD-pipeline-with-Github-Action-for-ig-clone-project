import React from "react";
import {
  render,
  screen,
  fireEvent,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";
describe("Test UI for Sign-in flows", () => {
  afterEach(() => {
    window.sessionStorage.removeItem("userToken");
  });
  it("TC001: Sign in with incorrect account", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "123@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText(
      "email or password incorrect. please try again."
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("TC002: Show error message if press submit with a blank email", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "1234" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText(
      "Please enter email and password."
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("TC003: Show error message if press submit with a blank password", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "123@gmail.com" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText(
      "Please enter email and password."
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("TC004: Sign in with correct account", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test01@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    await waitForElementToBeRemoved(() => screen.getByText(/SignIn/));
    expect(screen.getAllByText("test01")).not.toBe(null);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
});

describe("Test UI for Sign-up flows", () => {
  let mockUser = {
    email: "test**@gmail.com",
    username: "test**",
    password: "1234",
    cf_password: "1234",
  };
  afterEach(() => {
    window.sessionStorage.removeItem("userToken");
  });
  it("TC005: should show error message if an invalid email", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignUp/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("confirm password");
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test02gmail.com" } });
    fireEvent.change(usernameInput, { target: { value: mockUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockUser.cf_password },
    });

    const submitLoginBtn = screen.getByText("Sign Up");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText(
      "Invalid email. Please try again!"
    );
    expect(errorMsg).toBeInTheDocument();
  });
  it("TC006: should show error message if sign up with duplicate email", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignUp/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("confirm password");
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test01@gmail.com" } });
    fireEvent.change(usernameInput, { target: { value: mockUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockUser.cf_password },
    });

    const submitLoginBtn = screen.getByText("Sign Up");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText("This email has already been registered. Please sign in");
    expect(errorMsg).toBeInTheDocument();
  });
  it("TC007: should show error message if sign up with password and confirm password does not match", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignUp/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("confirm password");
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(usernameInput, { target: { value: mockUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.change(confirmPasswordInput, { target: { value: "1111" } });

    const submitLoginBtn = screen.getByText("Sign Up");
    fireEvent.click(submitLoginBtn);

    const errorMsg = await screen.findByText(
      "Password and confirm password does not match"
    );
    expect(errorMsg).toBeInTheDocument();
  });
  // it.only("TC008: Sign Up and Sign In complate", async () => {
  //   let id = 2;

  //   render(<App />);

  //   const signUpBtn = screen.getByText(/SignUp/);
  //   expect(signUpBtn).toBeInTheDocument();
  //   fireEvent.click(signUpBtn);

  //   const emailInput = screen.getByPlaceholderText("email");
  //   const usernameInput = screen.getByPlaceholderText("username");
  //   const passwordInput = screen.getByPlaceholderText("password");
  //   const confirmPasswordInput =
  //     screen.getByPlaceholderText("confirm password");
  //   expect(emailInput).toBeInTheDocument();
  //   expect(usernameInput).toBeInTheDocument();
  //   expect(passwordInput).toBeInTheDocument();
  //   expect(confirmPasswordInput).toBeInTheDocument();

  //   while (true) {
  //     // try {
  //       mockUser.email = mockUser.email.replace("**", id);
  //       mockUser.username = mockUser.username.replace("**", id);
  //       console.log(mockUser.email);
  //       fireEvent.change(emailInput, { target: { value: mockUser.email } });
  //       fireEvent.change(usernameInput, {
  //         target: { value: mockUser.username },
  //       });
  //       fireEvent.change(passwordInput, {
  //         target: { value: mockUser.password },
  //       });
  //       fireEvent.change(confirmPasswordInput, {
  //         target: { value: mockUser.cf_password },
  //       });

  //       const submitSignUpBtn = screen.getByText("Sign Up");
  //       fireEvent.click(submitSignUpBtn);

  //       const errorMsg = await screen.findByText("email is already registered");
  //       console.log(errorMsg);
  //       // await waitForElementToBeRemoved(() => screen.getByText("Sign Up"));
  //       if (errorMsg) {
  //         id += 1;
  //         mockUser = {
  //           email: "test**@gmail.com",
  //           username: "test**",
  //           password: "1234",
  //           cf_password: "1234",
  //         };
  //       } else {
  //         // await waitForElementToBeRemoved(() => screen.getByText("Sign Up"));
  //         break;
  //       }
  //     // } catch (err) {
  //       // await waitForElementToBeRemoved(() => screen.getByText("Sign Up"));
  //       // break;
  //     // }
  //   }

  //   // await waitForElementToBeRemoved(() => screen.getByText("Sign Up"));

  //   const signInBtn = await screen.findByText(/SignIn/);
  //   expect(signInBtn).toBeInTheDocument();
  //   fireEvent.click(signInBtn);

  //   const emailInput_1 = screen.getByPlaceholderText("email");
  //   const passwordInput_1 = screen.getByPlaceholderText("password");
  //   expect(emailInput_1).toBeInTheDocument();
  //   expect(passwordInput_1).toBeInTheDocument();

  //   fireEvent.change(emailInput_1, { target: { value: mockUser.email } });
  //   fireEvent.change(passwordInput_1, { target: { value: mockUser.password } });

  //   const submitLoginBtn = screen.getByText("Sign In");
  //   fireEvent.click(submitLoginBtn);

  //   await waitForElementToBeRemoved(() => screen.getByText(/Sign In/));
  //   expect(screen.getByText(mockUser.username).textContent).toBe(
  //     mockUser.username
  //   );
  //   expect(screen.getByText("Log Out")).toBeInTheDocument();
  // });
});

describe("Test for Create Posts", () => {
  const file = new File(["(⌐□_□)"], "photo.png", {
    type: "image/png",
  });
  beforeEach(async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(emailInput, { target: { value: "test01@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    await waitForElementToBeRemoved(() => screen.getByText(/SignIn/));
  });
  afterEach(() => window.sessionStorage.removeItem("userToken"));
  it("TC008: should disable the upload button when the image is not choose", () => {
    const uploadBtn = screen.getByText(/Upload/i);
    expect(uploadBtn).toBeDisabled();
  });
  it("TC009: should enable the upload button when the image is chosen", async () => {
    const uploadBtn = screen.getByText(/Upload/i);
    expect(uploadBtn).toBeDisabled();

    const selectimg = screen.getByTestId("fileinput");
    await wait(() => {
      fireEvent.change(selectimg, { target: { files: [file] } });
    });

    expect(uploadBtn).toBeEnabled();
  });
});

describe("Test authorization", () => {
  it("TC010: actions without authentication", async () => {
    render(<App />);
    expect(screen.getByText(/SignUp/)).toBeInTheDocument();
    expect(screen.getByText(/SignIn/)).toBeInTheDocument();
    expect(screen.getByText("Login to post")).toBeInTheDocument();
    expect(await screen.findAllByText("Login to comment")).not.toBeNull();
  });
  it("TC011: actions within authentication", async () => {
    render(<App />);

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test01@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    await waitForElementToBeRemoved(() => screen.getByText(/SignIn/));
    expect(screen.getByText("Select Image")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("write your caption here")
    ).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("Add comment here...")
    ).not.toBeNull();
  });
});
