import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work | Active Campaigns | Beast Philanthropy",
  description: "Explore Beast Philanthropy's active campaigns and all past philanthropic work around the world. From feeding millions to rescuing animals.",
};

const campaigns = [
  {
    id: "save-1000-animals",
    title: "I Saved 1000 Animals",
    description:
      "The Mission Isn't Over. We're not stopping at 1,000. Now, we're raising funds to save the next 1,000 animals — continuing to support trusted wildlife organizations, rescue operations, and rehabilitation efforts around the world.",
    image: "/campaign-animals.png",
    tag: "Active",
  },
  {
    id: "food-distribution",
    title: "55M+ Pounds of Food",
    description:
      "Our food distribution initiatives have delivered over 55 million pounds of food to families in need across the United States and around the world. The Beast Philanthropy Food Pantry in Eastern NC distributes 100,000+ meals per month.",
    image: "/campaign-food.png",
    tag: "Ongoing",
  },
  {
    id: "clean-water-africa",
    title: "Clean Water for Africa",
    description:
      "We've built and restored wells in communities across Africa, providing clean and safe drinking water to thousands of families. This initiative continues to expand to new communities in need.",
    image: "/campaign-water.png",
    tag: "Ongoing",
  },
  {
    id: "toys-for-children",
    title: "We Gave Away $1 Million of Toys",
    description:
      "We distributed over $1 million worth of toys to children who would have otherwise gone without gifts. The joy on their faces reminded us why we do what we do — making kindness viral.",
    image: "/campaign-toys.png",
    tag: "Completed",
  },
  {
    id: "empowering-girls",
    title: "Empowering Girls in India",
    description:
      "We partnered with local organizations in India to support education access and empowerment programs for girls from underprivileged communities, funding schools and learning resources.",
    image: "/hero-bg.png",
    tag: "Completed",
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief Fund",
    description:
      "When disasters strike, we respond. Our disaster relief fund has provided immediate assistance to communities affected by natural disasters, including food, shelter supplies, and emergency aid.",
    image: "/campaign-food.png",
    tag: "Ongoing",
  },
];

const tagColors: Record<string, string> = {
  Active: "#E41E63",
  Ongoing: "#4DC8E8",
  Completed: "#333333",
};

export default function OurWorkPage() {
  return (
    <>
      {/* Page Banner */}
      <section className="page-banner" id="our-work-banner">
        <h1>ACTIVE CAMPAIGNS - BEAST PHILANTHROPY</h1>
      </section>

      {/* Sub-nav */}
      <div
        id="work-subnav"
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          padding: "28px 40px",
          background: "var(--white)",
          borderBottom: "1px solid var(--gray)",
        }}
      >
        <Link
          href="/our-work"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 800,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            textDecoration: "underline",
            color: "var(--black)",
          }}
          id="link-active-campaigns"
        >
          Active Campaigns
        </Link>
        <Link
          href="/our-work/all"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 800,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            color: "var(--text-body)",
          }}
          id="link-all-work"
        >
          All Work
        </Link>
      </div>

      {/* Work Grid */}
      <section className="work-section" id="work-grid">
        <div className="work-grid">
          {campaigns.map((c) => (
            <article className="work-card" key={c.id} id={`campaign-${c.id}`}>
              <div style={{ position: "relative" }}>
                <Image
                  src={c.image}
                  alt={c.title}
                  width={600}
                  height={340}
                  className="work-card-img"
                  style={{ objectFit: "cover", width: "100%", height: "220px" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: tagColors[c.tag] ?? "#333",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "4px 12px",
                    borderRadius: "50px",
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <div className="work-card-body">
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <button className="btn-learn-more" id={`learn-more-${c.id}`}>
                  LEARN MORE →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="load-more-wrap">
          <button className="btn-load-more" id="btn-load-more">
            LOAD MORE
          </button>
        </div>
      </section>
    </>
  );
}
