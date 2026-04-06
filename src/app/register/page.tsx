"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("bpkyc_token", data.token);
      router.push("/onboarding");
    } catch (err: any) {
      alert("Registration error: " + err.message);
    }
  };

  return (
    <section style={{ padding: "clamp(40px, 10vw, 80px) 20px", background: "var(--off-white)", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "500px", width: "100%", margin: "0 auto", background: "var(--white)", padding: "clamp(24px, 5vw, 40px)", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", boxSizing: "border-box" }}>
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            color: "var(--black)",
            marginBottom: "8px",
            textAlign: "center",
            textTransform: "uppercase"
          }}
        >
          Create Account
        </h1>
        <p style={{ textAlign: "center", color: "var(--text-body)", marginBottom: "32px", fontSize: "0.9rem" }}>
          Join Beast Philanthropy to apply for community grants.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px", border: "2px solid var(--gray)", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px", border: "2px solid var(--gray)", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "8px" }}>
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px", border: "2px solid var(--gray)", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "16px",
              background: "var(--pink)",
              color: "white",
              padding: "16px",
              border: "none",
              borderRadius: "50px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            Create Account & Continue
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--text-body)" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--pink)", fontWeight: 700 }}>Log In</Link>
        </p>
      </div>
    </section>
  );
}
