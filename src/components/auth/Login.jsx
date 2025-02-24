import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dummyUser = { email: "admin@example.com", password: "password123" };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to the Employee Dashboard!",
      }).then(() => {
        navigate("/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please check your email and password.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-4 text-primary"> Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FaUser />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="email-input"
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="password-input"
            />
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            data-testid="login-button"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          <a href="#" className="text-secondary">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
