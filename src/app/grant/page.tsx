import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Grants | Beast Philanthropy",
  description: "Apply for a community grant through Beast Philanthropy to help support your local cause.",
};

export default function GrantLandingPage() {
  return (
    <>
      <section className="page-banner" style={{ background: "var(--pink)" }}>
        <h1>BEAST PHILANTHROPY GRANTS</h1>
      </section>

      <section style={{ padding: "80px 40px", background: "var(--white)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "2.5rem",
              color: "var(--black)",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Empowering Local Change
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "var(--text-body)",
              marginBottom: "32px",
            }}
          >
            We believe that the best way to make a difference is to support the people who are already doing the hard work on the ground. The Beast Philanthropy Community Grant Program offers financial assistance to individuals and organizations working to alleviate suffering and improve their communities.
          </p>
          
          <div
            style={{
              background: "var(--off-white)",
              border: "2px solid var(--cyan)",
              borderRadius: "12px",
              padding: "40px",
              marginBottom: "40px",
            }}
          >
            <h3
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--black)",
                marginBottom: "16px",
              }}
            >
              Who Can Apply?
            </h3>
            <ul style={{ textAlign: "left", marginBottom: 0, paddingLeft: "20px", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-body)" }}>
              <li>501(c)(3) Nonprofit Organizations based in the US.</li>
              <li>Individuals with a proven track record of community service.</li>
              <li>Grassroots initiatives addressing food insecurity, unhoused populations, or disaster relief.</li>
            </ul>
             <p
              style={{
                marginTop: "16px",
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "var(--text-body)",
              }}
            >
              * US Identification (KYC verification) is required for all applicants prior to receiving funds.
            </p>
          </div>

          <Link
            href="/register"
            style={{
              display: "inline-block",
              background: "var(--black)",
              color: "var(--white)",
              border: "none",
              borderRadius: "50px",
              padding: "18px 48px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "transform 0.2s, background 0.2s",
              textDecoration: "none"
            }}
          >
            APPLY FOR A GRANT NOW
          </Link>
          <div style={{ marginTop: "16px" }}>
             <Link href="/login" style={{ color: "var(--pink)", fontWeight: 700, fontSize: "0.9rem" }}>
              Already registered? Login here.
             </Link>
          </div>
        </div>
      </section>
      
      <section style={{ background: "var(--cyan)", padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "2rem", color: "var(--black)", marginBottom: "16px" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
           <div style={{ marginBottom: "24px", background: "white", padding: "24px", borderRadius: "8px" }}>
              <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.1rem", marginBottom: "8px" }}>How much funding can I request?</h4>
              <p style={{ color: "var(--text-body)", lineHeight: 1.6 }}>Grant sizes vary depending on the scope of the project, typically ranging from $1,000 to $10,000.</p>
           </div>
           <div style={{ marginBottom: "24px", background: "white", padding: "24px", borderRadius: "8px" }}>
              <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.1rem", marginBottom: "8px" }}>How long does the review process take?</h4>
              <p style={{ color: "var(--text-body)", lineHeight: 1.6 }}>Due to the high volume of applications, our review process typically takes 4-6 weeks.</p>
           </div>
        </div>
      </section>
    </>
  );
}
