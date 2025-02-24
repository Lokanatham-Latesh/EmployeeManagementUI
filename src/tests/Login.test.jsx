import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";

describe("Login Component", () => {
  test("should render login form with email and password inputs and login button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

   
    expect(screen.getByTestId("email-input")).toBeInTheDocument();

    
    expect(screen.getByTestId("password-input")).toBeInTheDocument();

    
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  test("should update email and password input fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    
    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

   
    expect(emailInput.value).toBe("admin@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("should attempt login when clicking login button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

 
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

  
    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    
    fireEvent.click(loginButton);

  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    expect(storedUser).toEqual({ email: "admin@example.com" });
  });
});
