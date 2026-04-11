"use client";
import { useState } from "react";

interface IncomeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function IncomeModal({ onClose, onSuccess }: IncomeModalProps) {
  const [formData, setFormData] = useState({ type: "Bank Statement", file: null as any });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, file: event.target?.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert("Please upload a file");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: formData.type, file: formData.file }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      alert("Error saving income proof.");
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
    maxWidth: "440px",
    borderRadius: "24px",
    padding: "40px 24px",
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
    marginTop: "12px",
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
          <h2 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "8px" }}>PROOF OF INCOME</h2>
          <p style={{ color: "var(--text-body)", fontSize: "0.85rem", marginBottom: "32px", lineHeight: 1.6 }}>
            Please upload a valid bank statement to confirm eligibility for this grant program. <br/><br/>
            <strong>Note:</strong> This must be a bank statement from the last three months till date.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "8px" }}>Document Type</label>
              <select
                style={inputStyle}
                value={formData.type}
                onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
              >
                <option value="Bank Statement">Bank Statement</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "8px" }}>Upload Proof</label>
              <div
                style={{
                  border: "2px dashed var(--gray)",
                  padding: "40px 20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  position: "relative",
                  background: "#fafafa",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px", color: "#888" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p style={{ fontSize: "0.85rem", color: "var(--text-body)", marginBottom: "4px" }}>
                  {formData.file ? "File selected!" : "Click to select your file"}
                </p>
                <p style={{ fontSize: "0.7rem", color: "#999" }}>PDF, DOCX, DOC, JPG, or PNG (Max 5MB)</p>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,image/png,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required 
                  onChange={handleFileChange}
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} 
                />
              </div>
            </div>
            
            <p style={{ fontSize: "0.75rem", color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.5, marginBottom: "8px" }}>
               Our team will manually review your document to confirm income eligibility within 48-72 hours.
            </p>
          </div>

          <button type="submit" disabled={isSubmitting} style={buttonStyle}>
            {isSubmitting ? "UPLOADING..." : "SUBMIT DOCUMENTS"}
          </button>
        </form>
      </div>
    </div>
  );
}
