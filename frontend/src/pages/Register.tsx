import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axiosInstance.post("/register", form);
      setMessage("✅ Registration successful! Please check your email to verify your account.");
      setForm({ username: "", email: "", password: "" });
    } catch (error: any) {
      setMessage(error.response?.data?.detail || "❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #e0f7fa, #f5f7fa, #fdf6fb)" }}
    >
      <div
        className="card shadow-lg p-5 rounded-4 glass-card"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4 fw-bold gradient-text">Register</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="form-control mb-3 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-3 shadow-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="form-control mb-4 shadow-sm"
            required
          />
          <button
            type="submit"
            className="btn btn-gradient-primary w-100 fw-bold shadow-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <style>
          {`
            .glass-card {
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(10px);
              border-radius: 20px;
            }
            .gradient-text {
              background: linear-gradient(90deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .btn-gradient-primary {
              background: linear-gradient(90deg, #667eea, #764ba2);
              border: none;
              color: #fff;
              transition: all 0.3s ease;
              border-radius: 50px;
              padding: 0.6rem 1.5rem;
            }
            .btn-gradient-primary:hover { opacity: 0.9; }
          `}
        </style>
      </div>
    </div>
  );
};

export default Register;
