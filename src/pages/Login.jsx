import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.access_token
        );

        localStorage.setItem(
          "role",
          data.role
        );

        localStorage.setItem(
          "name",
          data.name
        );

        alert("Login Successful");

        navigate("/dashboard");
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="overlay">
          <h1>ContractIQ</h1>
          <p>
            Smart Contract &
            Compliance Management
            Platform
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Login</h2>

          <form
            onSubmit={handleLogin}
          >
            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              className="login-btn"
            >
              Login
            </button>
          </form>

          <div className="bottom-text">
            Don't have an account?
            <a href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;