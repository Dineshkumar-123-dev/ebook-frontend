// src/pages/VerifyEmail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CheckCircle, XCircle, HourglassSplit } from "react-bootstrap-icons";

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid verification link.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        // ✅ Call backend verify endpoint
        const res = await axiosInstance.get(`/verify/${token}`);

        setMessage(res.data?.message || "✅ Email verified successfully!");
        setSuccess(true);

        // ✅ Force redirect to login after short delay
        setTimeout(() => {
          navigate("/login", { replace: true }); // replace avoids back button going to verify
        }, 2000);
      } catch (error: any) {
        const detail =
          error.response?.data?.detail ||
          error.message ||
          "❌ Verification failed. Try again.";
        setMessage(detail);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #f5f7fa, #fdf6fb)",
        transition: "background 0.5s",
      }}
    >
      <div
        className="card shadow-lg p-5 rounded-4 glass-card text-center animate-fade-in"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <h2 className="mb-4 fw-bold gradient-text">Email Verification</h2>

        {/* Status Icon */}
        <div className="mb-3" style={{ fontSize: "3rem" }}>
          {loading && <HourglassSplit className="text-warning animate-spin" />}
          {success === true && <CheckCircle className="text-success animate-pop" />}
          {success === false && <XCircle className="text-danger animate-pop" />}
        </div>

        <p className="fs-5">{message}</p>

        {success && !loading && (
          <p className="text-muted mt-2">Redirecting you to login...</p>
        )}

        <style>
          {`
            .glass-card {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(14px);
              border-radius: 20px;
              transition: all 0.3s ease-in-out;
            }
            .gradient-text {
              background: linear-gradient(90deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .animate-fade-in {
              animation: fadeIn 0.8s ease forwards;
            }
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(-20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-pop {
              animation: pop 0.6s ease forwards;
            }
            @keyframes pop {
              0% { transform: scale(0.5); opacity: 0; }
              70% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-spin {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default VerifyEmail;
