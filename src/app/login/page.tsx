"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("bpkyc_token", data.token);
      
      if (data.user.status === "pending_kyc") {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      alert("Login error: " + err.message);
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
          Welcome Back
        </h1>
        <p style={{ textAlign: "center", color: "var(--text-body)", marginBottom: "32px", fontSize: "0.9rem" }}>
          Log in to view your grant dashboard.
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

          <button
            type="submit"
            style={{
              marginTop: "16px",
              background: "var(--black)",
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
            Log In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--text-body)" }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: "var(--pink)", fontWeight: 700 }}>Apply Now</Link>
        </p>
      </div>
    </section>
  );
}
