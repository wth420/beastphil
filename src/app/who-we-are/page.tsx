import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Who We Are | Beast Philanthropy",
  description: "MrBeast wants to make the world a better place. Learn about Beast Philanthropy's story, mission, and the team behind our charitable work.",
};

const helpItems = [
  {
    id: "donate",
    label: "Donate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: "volunteer",
    label: "Volunteer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "sponsor",
    label: "Sponsorships",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "merch",
    label: "Merchandise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "content",
    label: "Content Engagement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

const teamMembers = [
  { name: "MrBeast", title: "Founder", initials: "MB" },
  { name: "James Donahue", title: "Executive Director", initials: "JD" },
  { name: "Sarah Johnson", title: "Director of Programs", initials: "SJ" },
  { name: "Mike Chen", title: "Operations Manager", initials: "MC" },
  { name: "Aisha Williams", title: "Community Outreach", initials: "AW" },
  { name: "Carlos Rivera", title: "Partnership Lead", initials: "CR" },
];

export default function WhoWeArePage() {
  return (
    <>
      {/* Page Banner */}
      <section className="page-banner" id="who-we-are-banner">
        <h1>WHO WE ARE - BEAST PHILANTHROPY</h1>
      </section>

      {/* Our Story */}
      <section className="story-section" id="our-story">
        <div className="story-inner">
          <div className="story-image">
            <Image
              src="/hero-bg.png"
              alt="MrBeast Philanthropy team at work"
              width={480}
              height={380}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
          <div className="story-content">
            <h2>MrBeast wants to make the world a better place.</h2>
            <p>
              With this goal, he founded Beast Philanthropy, a 501(c)3
              organization that harnesses the power of social media to raise
              funds and support charitable causes around the globe. We exist to
              be a force for good; sharing real stories from real people making a
              difference in the world in ways that inspire the next generation to
              care more.
            </p>
            <p>Since our inception, we have:</p>
            <ul>
              <li>
                Alongside our partners, we distributed millions of meals through
                large-scale food distribution initiatives.
              </li>
              <li>Funded life-saving medical initiatives for those in need.</li>
              <li>Provided disaster relief assistance.</li>
              <li>
                Supported animal welfare initiatives worldwide, providing
                resources, shelter, and medical care to animals in need,
                including rescue operations, habitat conservation, and
                rehabilitation efforts.
              </li>
              <li>
                Built and restored wells in Africa, providing clean and safe
                drinking water to communities in need.
              </li>
              <li>
                Supported education by funding schools, supplying resources, and
                improving access to learning opportunities for underprivileged
                children.
              </li>
              <li>
                Saved an orphanage from closure, ensuring continued care and
                support for vulnerable children.
              </li>
            </ul>
            <p>
              One of our core initiatives is the Beast Philanthropy Food Pantry,
              located in MrBeast&apos;s hometown of Eastern North Carolina. This
              facility helps combat hunger by distributing over 100,000 meals
              every month to families in need.
            </p>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="help-section" id="how-you-can-help">
        <h2>How You Can Help</h2>
        <div className="help-grid">
          {helpItems.map((item) => (
            <div className="help-card" key={item.id} id={`help-${item.id}`}>
              <div className="icon">{item.icon}</div>
              <h3>{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section id="team" style={{ padding: "80px 40px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "2.2rem",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            Meet the Team
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.name}
                id={`team-${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  background: "var(--off-white)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--pink)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    margin: "0 auto 16px",
                  }}
                >
                  {member.initials}
                </div>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--black)",
                    marginBottom: "6px",
                  }}
                >
                  {member.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-body)" }}>
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
