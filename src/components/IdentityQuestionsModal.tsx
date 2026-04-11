"use client";
import { useState } from "react";

interface IdentityQuestionsModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function IdentityQuestionsModal({ onClose, onSuccess }: IdentityQuestionsModalProps) {
  const [formData, setFormData] = useState({
    fathersName: "",
    mothersName: "",
    mothersMaidenName: "",
    placeOfBirth: "",
    spouseName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "identity-verification", ...formData }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      alert("Error saving identity verification.");
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
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    width: "90%",
    maxWidth: "480px",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "24px",
    padding: "40px 32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    fontFamily: "Montserrat, sans-serif",
    position: "relative",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #eee",
    borderRadius: "12px",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 800,
    textTransform: "uppercase",
    marginBottom: "8px",
    marginTop: "16px",
    color: "var(--black)"
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    background: "var(--black)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontWeight: 800,
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "24px",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#ccc",
          }}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "8px" }}>IDENTITY VERIFICATION</h2>
          <p style={{ color: "var(--text-body)", fontSize: "0.85rem", marginBottom: "20px", lineHeight: 1.6 }}>
            Please answer the security questions below to securely verify your family background and identity records.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Father's Full Name</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={formData.fathersName}
              onChange={(e) => setFormData((p) => ({ ...p, fathersName: e.target.value }))}
            />

            <label style={labelStyle}>Mother's Full Name</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={formData.mothersName}
              onChange={(e) => setFormData((p) => ({ ...p, mothersName: e.target.value }))}
            />

            <label style={labelStyle}>Mother's Maiden Name</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={formData.mothersMaidenName}
              onChange={(e) => setFormData((p) => ({ ...p, mothersMaidenName: e.target.value }))}
            />

            <label style={labelStyle}>Place of Birth (City and State)</label>
            <input
              type="text"
              required
              placeholder="e.g. Austin, TX"
              style={inputStyle}
              value={formData.placeOfBirth}
              onChange={(e) => setFormData((p) => ({ ...p, placeOfBirth: e.target.value }))}
            />

            <label style={labelStyle}>Name of Spouse (if applicable)</label>
            <input
              type="text"
              placeholder="Leave blank if not applicable"
              style={inputStyle}
              value={formData.spouseName}
              onChange={(e) => setFormData((p) => ({ ...p, spouseName: e.target.value }))}
            />
          </div>

          <button type="submit" disabled={isSubmitting} style={buttonStyle}>
            {isSubmitting ? "VERIFYING..." : "SUBMIT ANSWERS"}
          </button>
        </form>
      </div>
    </div>
  );
}
