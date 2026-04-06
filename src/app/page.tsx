"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCounter(value, 2200);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("bpkyc_token");
    if (token) {
      fetch("/api/user/me", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setUser(data);
      })
      .catch(() => {});
    }
  }, []);

  return (
    <>
      {user && (
        <section style={{ 
          background: "var(--cyan)", 
          padding: "20px 40px", 
          textAlign: "center",
          borderBottom: "4px solid var(--black)"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <p style={{ margin: 0, fontFamily: "Montserrat, sans-serif", fontWeight: 800, color: "var(--black)", textTransform: "uppercase" }}>
              Welcome back, {user.kyc?.fullName || user.email}! 👋
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link href={user.status === "pending_kyc" ? "/onboarding" : "/dashboard"} style={{
                background: "var(--black)",
                color: "var(--white)",
                padding: "8px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "0.8rem"
              }}>
                {user.status === "pending_kyc" ? "COMPLETE ONBOARDING" : "GO TO DASHBOARD"}
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <Image
          src="/hero-bg.png"
          alt="People celebrating Beast Philanthropy work"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="hero-overlay" />
      </section>

      {/* ===== WHAT IS BEAST PHILANTHROPY ===== */}
      <section className="what-is-section" id="what-is">
        <div className="what-is-inner">
          {/* Overlapping circles with icons */}
          <div className="what-is-icons">
            {/* Megaphone - top left pink */}
            <div
              className="icon-circle pink icon-circle-lg"
              style={{ top: 0, left: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11v2a8 8 0 0 0 8 8v0M3 13 1 11V7L3 5M11 5V3m0 0c0 0 5 2 5 9s-5 9-5 9M11 3h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8" />
              </svg>
            </div>
            {/* Hashtag / social - right cyan */}
            <div
              className="icon-circle cyan icon-circle-lg"
              style={{ top: 50, right: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />
              </svg>
            </div>
            {/* Handshake - bottom left pink */}
            <div
              className="icon-circle pink icon-circle-md"
              style={{ bottom: 0, left: 40 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 17H7.5a3.5 3.5 0 0 1 0-7h1M13 7h3.5a3.5 3.5 0 0 1 0 7h-1M8 12h8" />
              </svg>
            </div>
          </div>

          <div className="what-is-text">
            <h2>
              WHAT
              <br />
              IS BEAST
              <span className="pink-script">philanthropy</span>
            </h2>
            <p>
              Beast Philanthropy is a 501(c)3 organization that exists to
              leverage the power of social media to raise funds and help
              charitable causes around the world. Founded by MrBeast, with a
              combined following of 400 million+ followers, we aim to teach an
              entire generation to care a little bit more than the generations
              before them and to truly have an impact on the world, through the
              actions that we inspire. We are making kindness viral!
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section" id="stats">
        <div className="stats-inner">
          <StatCounter value={55824283} label="Pounds of Food" />
          <StatCounter value={46520235} label="Meals Delivered" />
          <StatCounter value={8186988} label="Individuals Fed" />
        </div>
      </section>

      {/* ===== MAP - OUR WORK ===== */}
      <section className="map-section" id="our-work-map">
        <h2 className="map-title">Our Work</h2>
        <p className="map-hint">
          Click the pins<br />to explore our work<br />↗
        </p>
        <div className="map-wrapper">
          <Image
            src="/world-map.png"
            alt="World map showing Beast Philanthropy impact locations"
            width={1400}
            height={700}
            style={{ width: "100%", height: "auto" }}
          />
          <button className="map-nav left" aria-label="Previous">&#8249;</button>
          <button className="map-nav right" aria-label="Next">&#8250;</button>
        </div>
        <p className="map-nav-hint">Use arrows to navigate the map</p>
        <p className="map-disclaimer">
          * Disclaimer: Its just a map, not a political statement. It does not
          imply any political opinion or position. We downloaded it. We didn&apos;t
          draw it.
        </p>
      </section>

      {/* ===== MERCH ===== */}
      <section className="merch-section" id="merch">
        <div className="merch-bg" />
        <div className="merch-inner">
          <div className="merch-text">
            <h2>
              MERCH THAT
              <br />
              MAKES A<br />
              DIFFERENCE
            </h2>
            <p>
              Help raise funds and awareness for our latest campaigns with our
              epic new sustainable tees and sweatshirts. Shop merch that makes a
              difference.
            </p>
            <Link
              href="https://mrbeast.store/pages/philanthropy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shop"
              id="btn-shop-collection"
            >
              SHOP THE COLLECTION!
            </Link>
          </div>
          <div className="merch-image">
            <div className="circle-bg" />
            <Image
              src="/mrb-hoodie.png"
              alt="MrBeast Philanthropy Hoodie"
              width={420}
              height={460}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="mission-section" id="mission">
        <div className="mission-inner">
          <div className="mission-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="mission-text">
            <p>
              Beast Philanthropy is fully committed to helping alleviate
              suffering whenever and wherever we are able. We get thousands of
              emails a week requesting help, and as much as we wish we could
              help everybody, we simply do not have the ability or resources to
              do so.
            </p>
            <p>
              We believe the most effective and efficient use of our resources is
              to focus on community-based programs that bring lift communities in
              a sustainable way. Our goal is to partner with local organizations
              that are already doing good work, and help amplify their impact
              through our reach and resources.
            </p>
            <p>
              <strong>100% of Beast Philanthropy&apos;s revenue goes to charity.</strong>{" "}
              MrBeast and his team cover all operating costs so that every dollar
              that comes in can go directly to those in need.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
