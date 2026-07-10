import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      organization,
      department,
      phone,
      email,
      password,
      role,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        userData
      );

      alert("Registration Successful!");

      setName("");
      setOrganization("");
      setDepartment("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="overlay">
          <h1>ContractIQ</h1>
          <p>Create your workspace securely</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Arjun Mehta"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Organization Name</label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={organization}
                onChange={(e) =>
                  setOrganization(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Department</label>
              <input
                type="text"
                placeholder="Legal / IT / Finance"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Select Role</label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                required
              >
                <option value="">
                  Select Role
                </option>

                <option value="Administrator">
                  Administrator
                </option>

                <option value="Legal Manager">
                  Legal Manager
                </option>

                <option value="Compliance Officer">
                  Compliance Officer
                </option>

                <option value="Contract Manager">
                  Contract Manager
                </option>

                <option value="Department Head">
                  Department Head
                </option>

                <option value="Employee">
                  Employee
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;