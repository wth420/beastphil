import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Sponsors | Beast Philanthropy",
  description: "We thank the supporters whose generosity enables us to share kindness and provide relief and encouragement to our marginalized and vulnerable friends around the world.",
};

const sponsors = [
  "Amazon",
  "YouTube",
  "Google",
  "Microsoft",
  "DraftKings",
  "Experian",
  "Shopify",
  "Honey",
  "Raycon",
  "Current",
  "Beast Burger",
  "Feastables",
  "MrBeast Burger",
  "Apex Legends",
  "Lunchly",
  "Airbnb",
  "PayPal",
  "SeatGeek",
  "Crocs",
  "Omaha Steaks",
];

export default function SupportersPage() {
  return (
    <>
      {/* Page Banner */}
      <section className="page-banner" id="supporters-banner">
        <h1>OUR SPONSORS | BEAST PHILANTHROPY</h1>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section" id="sponsors">
        <p className="sponsors-intro">
          We would like to thank the supporters that are listed on this page,
          whose generosity enables us to share kindness and provide relief and
          encouragement to our marginalized and vulnerable friends around the
          world.
        </p>

        <h2>Our Valued Supporters</h2>

        <div className="sponsors-grid">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="sponsor-card"
              id={`sponsor-${sponsor.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {sponsor}
            </div>
          ))}
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section
        style={{
          background: "var(--cyan)",
          padding: "80px 40px",
          textAlign: "center",
        }}
        id="become-sponsor"
      >
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "2.5rem",
            color: "var(--white)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Want to Become a Sponsor?
        </h2>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--white)",
            maxWidth: "600px",
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          Join us in making kindness viral. Partner with Beast Philanthropy and
          help us change the world, one act of generosity at a time.
        </p>
        <a
          href="mailto:sponsors@beastphilanthropy.org"
          className="btn-donate"
          id="btn-contact-sponsor"
          style={{ display: "inline-block" }}
        >
          CONTACT US
        </a>
      </section>
    </>
  );
}
