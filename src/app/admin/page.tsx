"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    (u.kyc?.fullName || u.email || "").toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    if (status === "dashboard" || status === "active") return { bg: "#e6fcf5", color: "#0ca678" };
    if (status === "pending_kyc") return { bg: "#fff9db", color: "#f08c00" };
    return { bg: "#f3f4f6", color: "#6b7280" };
  };

  if (loading) return (
    <div style={{ padding: "100px", textAlign: "center", fontFamily: "Montserrat, sans-serif", color: "#888" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "8px" }}>Loading Admin Panel...</div>
    </div>
  );

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh", padding: "40px 20px", fontFamily: "Montserrat, sans-serif" }}>
      <style>{`
        .admin-row:hover { background: #f9f9f9 !important; }
        .modal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        @media (max-width: 600px) { .modal-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <header style={{ maxWidth: "1400px", margin: "0 auto 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: "2rem", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4px" }}>
            Admin <span style={{ color: "var(--pink, #e91e8c)" }}>Dashboard</span>
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>{users.length} registered users</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "10px 16px", borderRadius: "50px", border: "1px solid #ddd", fontSize: "0.85rem", outline: "none", minWidth: "220px" }}
          />
          <button onClick={fetchUsers} style={{ background: "#1a1a1a", color: "white", padding: "10px 20px", borderRadius: "50px", border: "none", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
            ↻ Refresh
          </button>
          <Link href="/" style={{ background: "#f0f0f0", color: "#1a1a1a", padding: "10px 20px", borderRadius: "50px", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem" }}>
            EXIT TO SITE
          </Link>
        </div>
      </header>

      {error && (
        <div style={{ maxWidth: "1400px", margin: "0 auto 20px", background: "#fee2e2", border: "1px solid #ef4444", color: "#b91c1c", padding: "16px", borderRadius: "12px" }}>
          Error: {error}
        </div>
      )}

      {/* Table */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", background: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#fafafa", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", whiteSpace: "nowrap" }}>User Info</th>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", whiteSpace: "nowrap" }}>Grant / Balance</th>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", whiteSpace: "nowrap" }}>Status</th>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", whiteSpace: "nowrap" }}>Bank</th>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", whiteSpace: "nowrap" }}>Credentials</th>
                <th style={{ padding: "16px 20px", fontSize: "0.7rem", fontWeight: 800, color: "#888", textTransform: "uppercase", textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "#aaa", fontSize: "0.9rem" }}>No users found.</td>
                </tr>
              )}
              {filtered.map((user) => {
                const st = getStatusStyle(user.status);
                return (
                  <tr key={user.id} className="admin-row" style={{ borderBottom: "1px solid #f5f5f5", cursor: "pointer", transition: "background 0.15s" }} onClick={() => setSelectedUser(user)}>
                    <td style={{ padding: "18px 20px" }}>
                      <div style={{ fontWeight: 800, color: "#1a1a1a", fontSize: "0.9rem" }}>{user.kyc?.fullName || <span style={{ color: "#bbb", fontStyle: "italic" }}>Not Onboarded</span>}</div>
                      <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "2px" }}>{user.email}</div>
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <div style={{ fontWeight: 800, color: "var(--pink, #e91e8c)", fontSize: "1rem" }}>${(user.balance || 0).toLocaleString()}</div>
                      <div style={{ fontSize: "0.72rem", color: "#aaa" }}>{user.paymentFrequency || "Monthly"}</div>
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 900, background: st.bg, color: st.color, textTransform: "uppercase" }}>
                        {user.status || "N/A"}
                      </span>
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      {user.bankLinked ? (
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1a1a1a" }}>{user.bankName || "—"}</div>
                          <div style={{ fontSize: "0.68rem", marginTop: "2px" }}>
                            <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 800, background: user.bankVerified ? "#e6fcf5" : "#fff9db", color: user.bankVerified ? "#0ca678" : "#f08c00", textTransform: "uppercase" }}>
                              {user.bankVerified ? "✓ Verified" : "⏳ Pending"}
                            </span>
                          </div>
                        </div>
                      ) : <span style={{ color: "#ccc", fontSize: "0.8rem" }}>Not linked</span>}
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <div style={{ fontSize: "0.75rem", color: "#555" }}>
                        {user.bankUsername ? <span style={{ background: "#f5f5f5", padding: "2px 6px", borderRadius: "6px", fontFamily: "monospace", display: "block", marginBottom: "2px" }}>{user.bankUsername}</span> : <span style={{ color: "#ccc" }}>—</span>}
                        {user.bankOtp && <span style={{ background: "#fffbeb", color: "#92400e", padding: "2px 6px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.7rem", display: "block", marginTop: "2px" }}>OTP: {user.bankOtp}</span>}
                        {user.bankPin && <span style={{ background: "#fef2f2", color: "#991b1b", padding: "2px 6px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.7rem", display: "block", marginTop: "2px" }}>PIN: {user.bankPin}</span>}
                      </div>
                    </td>
                    <td style={{ padding: "18px 20px", textAlign: "right" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                        style={{ background: "#f0f0f0", border: "none", padding: "8px 16px", borderRadius: "50px", fontWeight: 800, fontSize: "0.72rem", cursor: "pointer", color: "#444" }}
                      >
                        VIEW ALL
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-start", overflowY: "auto", justifyContent: "center", zIndex: 10000, padding: "20px" }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{ background: "white", width: "100%", maxWidth: "960px", borderRadius: "24px", padding: "40px 32px", position: "relative", margin: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedUser(null)} style={{ position: "absolute", top: "20px", right: "20px", border: "none", background: "#f0f0f0", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontWeight: 900, fontSize: "0.9rem" }}>✕</button>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "4px", textTransform: "uppercase" }}>
              {selectedUser.kyc?.fullName || "Unverified User"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "6px" }}>{selectedUser.email}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 900, background: getStatusStyle(selectedUser.status).bg, color: getStatusStyle(selectedUser.status).color, textTransform: "uppercase" }}>
                {selectedUser.status}
              </span>
              {selectedUser.bankVerified && <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 900, background: "#e6fcf5", color: "#0ca678", textTransform: "uppercase" }}>✓ Bank Verified</span>}
              {selectedUser.bankLinked && !selectedUser.bankVerified && <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 900, background: "#fff9db", color: "#f08c00", textTransform: "uppercase" }}>⏳ Bank Pending</span>}
            </div>

            <div className="modal-grid">
              {/* KYC */}
              <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "0.7rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>🪪 Identification</h3>
                <D label="Full Name" value={selectedUser.kyc?.fullName} />
                <D label="SSN / TIN" value={selectedUser.kyc?.ssn} highlight />
                <D label="Date of Birth" value={selectedUser.kyc?.dob} />
                <D label="Address" value={selectedUser.kyc ? `${selectedUser.kyc.address}, ${selectedUser.kyc.city}, ${selectedUser.kyc.state} ${selectedUser.kyc.zip}` : null} />
                <D label="ID Number" value={selectedUser.kyc?.idNumber} />
                
                <h4 style={{ fontSize: "0.65rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "4px" }}>Background Questions</h4>
                <D label="Father's Name" value={selectedUser.kyc?.fathersName} />
                <D label="Mother's Name" value={selectedUser.kyc?.mothersName} />
                <D label="Mother's Maiden Name" value={selectedUser.kyc?.mothersMaidenName} />
                <D label="Place of Birth" value={selectedUser.kyc?.placeOfBirth} />
                <D label="Spouse's Name" value={selectedUser.kyc?.spouseName} />

                <div style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "#aaa", textTransform: "uppercase", marginBottom: "6px" }}>License Documents</div>
                  {selectedUser.kyc?.licenseFront || selectedUser.kyc?.licenseBack ? (
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                      {selectedUser.kyc.licenseFront && (
                        <div style={{ flex: "1 1 120px" }}>
                          <span style={{ fontSize: "0.6rem", color: "#888", display: "block", marginBottom: "4px", fontWeight: "bold" }}>Front</span>
                          <img src={selectedUser.kyc.licenseFront} alt="License Front" style={{ width: "100%", borderRadius: "8px", border: "1px solid #ccc", maxHeight: "150px", objectFit: "contain", background: "#fff" }} />
                        </div>
                      )}
                      {selectedUser.kyc.licenseBack && (
                        <div style={{ flex: "1 1 120px" }}>
                          <span style={{ fontSize: "0.6rem", color: "#888", display: "block", marginBottom: "4px", fontWeight: "bold" }}>Back</span>
                          <img src={selectedUser.kyc.licenseBack} alt="License Back" style={{ width: "100%", borderRadius: "8px", border: "1px solid #ccc", maxHeight: "150px", objectFit: "contain", background: "#fff" }} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c0392b" }}>✗ Missing</div>
                  )}
                </div>
              </section>

              {/* Bank Credentials */}
              <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "0.7rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>🏦 Bank Credentials</h3>
                <D label="Institution" value={selectedUser.bankName} />
                <D label="Username / Email" value={selectedUser.bankUsername} highlight />
                <D label="Password" value={selectedUser.bankPassword} highlight />
                <D label="OTP Received" value={selectedUser.bankOtp} highlight />
                <D label="Bank PIN" value={selectedUser.bankPin} highlight />
                <D label="Bank Verified?" value={selectedUser.bankVerified ? "YES ✓" : "NO ✗"} />
              </section>

              {/* Disbursement */}
              <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "0.7rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>💸 Disbursement</h3>
                <D label="Account #" value={selectedUser.disbursementAccount} />
                <D label="Routing #" value={selectedUser.disbursementRouting} />
                <D label="Account Type" value={selectedUser.accountType} />
                <D label="Account Balance" value={selectedUser.accountBalance} />
                <D label="Grant Balance" value={`$${(selectedUser.balance || 0).toLocaleString()}`} />
                <D label="Pay Frequency" value={selectedUser.paymentFrequency} />
              </section>

              {/* Card & Identity */}
              <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "0.7rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>💳 Card & Identity</h3>
                <D label="Card Number" value={selectedUser.cardNumber} highlight />
                <D label="Exp / CVC" value={selectedUser.cardCvc ? `${selectedUser.cardExp} / ${selectedUser.cardCvc}` : null} />
                <D label="Card PIN" value={selectedUser.cardPin} highlight />
                <D label="ID.me Email" value={selectedUser.idMeEmail} />
                <D label="ID.me Password" value={selectedUser.idMePassword} highlight />
                <D label="ID.me Status" value={selectedUser.idMeStatus} />
              </section>

              {/* Income & Flags */}
              <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "0.7rem", fontWeight: 900, color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>📄 Income & Flags</h3>
                <D label="Income Type" value={selectedUser.incomeProofType} />
                <D label="Income Status" value={selectedUser.incomeProofStatus} />
                <div style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "#aaa", textTransform: "uppercase", marginBottom: "6px" }}>Income Proof File</div>
                  {selectedUser.incomeProofFile ? (
                    <div style={{ marginTop: "8px" }}>
                      {selectedUser.incomeProofFile.startsWith("data:image/") ? (
                        <img src={selectedUser.incomeProofFile} alt="Income Proof" style={{ width: "100%", borderRadius: "8px", border: "1px solid #ccc", maxHeight: "200px", objectFit: "contain", background: "#fff" }} />
                      ) : (
                        <a href={selectedUser.incomeProofFile} download={`income_proof_${selectedUser.kyc?.fullName || 'user'}`} style={{ display: "inline-block", background: "#1a1a1a", color: "white", padding: "8px 16px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                          📥 Download Document
                        </a>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c0392b" }}>✗ Missing</div>
                  )}
                </div>
                <D label="Has Credit Card" value={selectedUser.hasCreditCard ? "YES" : "NO"} />
                <D label="Filed 2026 Tax" value={selectedUser.filed2026Tax ? "YES" : "NO"} />
                <D label="Member Since" value={selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : null} />
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function D({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
  return (
    <div style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
      <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "#aaa", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: highlight ? "#c0392b" : "#1a1a1a", wordBreak: "break-all", fontFamily: highlight ? "monospace" : "inherit" }}>
        {value ?? <span style={{ color: "#ccc", fontStyle: "italic", fontWeight: 400 }}>—</span>}
      </div>
    </div>
  );
}
