import React from "react";
import {
  render,
  screen,
  fireEvent,
  wait,
  waitFor,
  act,
  debug,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
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
    expect(screen.getByText("test01").textContent).toBe("test01");
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
});

describe("Test UI for Sign-up flows", () => {
  const mockUser = {
    email: "test04@gmail.com",
    username: "test03",
    password: "1234",
    cf_password: "1234",
  };
  afterEach(() => {
    window.sessionStorage.removeItem("userToken");
  });
  it("TC005: Show error message if an invalid email", async () => {
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
  it("TC006: Show error message if sign up with duplicate email", async () => {
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

    const errorMsg = await screen.findByText("email is already registered");
    expect(errorMsg).toBeInTheDocument();
  });
  it("TC007: Show error message if sign up with password and confirm password does not match", async () => {
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
  it("TC008: Sign Up and Sign In complate", async () => {
    render(<App />);

    const signUpBtn = screen.getByText(/SignUp/);
    expect(signUpBtn).toBeInTheDocument();
    fireEvent.click(signUpBtn);

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
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockUser.cf_password },
    });

    const submitSignUpBtn = screen.getByText("Sign Up");
    fireEvent.click(submitSignUpBtn);

    await waitForElementToBeRemoved(() => screen.getByText(/Sign Up/));

    const signInBtn = screen.getByText(/SignIn/);
    expect(signInBtn).toBeInTheDocument();
    fireEvent.click(signInBtn);

    const emailInput_1 = screen.getByPlaceholderText("email");
    const passwordInput_1 = screen.getByPlaceholderText("password");
    expect(emailInput_1).toBeInTheDocument();
    expect(passwordInput_1).toBeInTheDocument();

    fireEvent.change(emailInput_1, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput_1, { target: { value: mockUser.password } });

    const submitLoginBtn = screen.getByText("Sign In");
    fireEvent.click(submitLoginBtn);

    await waitForElementToBeRemoved(() => screen.getByText(/Sign In/));
    expect(screen.getByText(mockUser.username).textContent).toBe(
      mockUser.username
    );
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
});
