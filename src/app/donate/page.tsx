import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate | Beast Philanthropy",
  description: "Make a donation to Beast Philanthropy. 100% of revenue goes to charity - MrBeast and team cover all operating costs.",
};

const donationAmounts = [10, 25, 50, 100, 250, 500];

export default function DonatePage() {
  return (
    <>
      {/* Page Banner */}
      <section className="page-banner" id="donate-banner">
        <h1>DONATE - BEAST PHILANTHROPY</h1>
      </section>

      <section style={{ padding: "80px 40px", background: "var(--white)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "2.2rem",
              color: "var(--black)",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Make Kindness Viral
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--text-body)",
              marginBottom: "40px",
            }}
          >
            100% of Beast Philanthropy&apos;s revenue goes directly to charity.
            MrBeast and his team cover all operating costs so that every dollar
            you donate can make a real impact.
          </p>

          {/* Donation Amount Selection */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginBottom: "24px",
            }}
            id="donation-amounts"
          >
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                id={`donate-${amount}`}
                className="donate-amount-btn"
                style={{
                  padding: "18px",
                  border: "2px solid var(--gray)",
                  borderRadius: "8px",
                  background: "var(--white)",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "var(--black)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div style={{ marginBottom: "32px" }}>
            <label
              htmlFor="custom-amount"
              style={{
                display: "block",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              Or enter a custom amount:
            </label>
            <input
              type="number"
              id="custom-amount"
              placeholder="$ Custom amount"
              min="1"
              style={{
                width: "100%",
                padding: "16px 20px",
                border: "2px solid var(--gray)",
                borderRadius: "8px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          <button
            className="btn-donate"
            id="btn-donate-submit"
            style={{
              width: "100%",
              padding: "20px",
              fontSize: "1rem",
              borderRadius: "8px",
            }}
          >
            DONATE NOW
          </button>

          <p
            style={{
              marginTop: "20px",
              fontSize: "0.85rem",
              color: "var(--text-body)",
              opacity: 0.7,
            }}
          >
            Beast Philanthropy is a registered 501(c)3 nonprofit organization.
            All donations are tax-deductible to the extent permitted by law.
          </p>
        </div>
      </section>
    </>
  );
}
