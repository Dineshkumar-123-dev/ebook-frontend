import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  role: "user" | "admin" | "superadmin";
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post<LoginResponse>("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      if (res.data.role === "user") navigate("/user");
      else if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "superadmin") navigate("/superadmin");

    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #f5f7fa, #fdf6fb)",
      }}
    >
      <div
        className="card shadow-lg p-5 rounded-4 glass-card"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 fw-bold gradient-text">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control mb-3 shadow-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-control mb-4 shadow-sm"
            required
          />
          <button
            type="submit"
            className="btn btn-gradient-primary w-100 fw-bold shadow-lg"
          >
            Login
          </button>
        </form>
      </div>

      <style>
        {`
          /* Glass effect card */
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 20px;
          }

          /* Gradient text */
          .gradient-text {
            background: linear-gradient(90deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* Gradient button */
          .btn-gradient-primary {
            background: linear-gradient(90deg, #667eea, #764ba2);
            border: none;
            color: #fff;
            transition: all 0.3s ease;
            border-radius: 50px;
            padding: 0.6rem 1.5rem;
          }
          .btn-gradient-primary:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
