"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Grants", href: "/grant" },
  {
    label: "Who We Are",
    href: "/who-we-are",
    children: [
      { label: "Our Story", href: "/who-we-are" },
      { label: "Meet the Team", href: "/who-we-are#team" },
    ],
  },
  { label: "Supporters", href: "/supporters" },
  {
    label: "Our Work",
    href: "/our-work",
    children: [
      { label: "Active Campaigns", href: "/our-work" },
      { label: "All Work", href: "/our-work/all" },
    ],
  },
  { label: "Store", href: "https://mrbeast.store/pages/philanthropy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("bpkyc_token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("bpkyc_token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="navbar" id="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo" id="navbar-logo">
          <div className="navbar-logo-text">
            <span className="logo-beast">BEAST™</span>
            <span className="logo-philanthropy">philanthropy</span>
          </div>
        </Link>

        {/* Nav links */}
        <nav>
          <ul className={`navbar-nav ${mobileOpen ? "open" : ""}`} id="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={isActive(link.href) ? "active" : ""}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "active" : ""}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
                {link.children && (
                  <div className="dropdown-menu">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={isActive(child.href) ? "active" : ""}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {!isLoggedIn && (
              <li className="mobile-signin">
                <Link
                  href="/login"
                  className={isActive("/login") ? "active" : ""}
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isLoggedIn ? (
            <div className="nav-actions" style={{ display: "flex", gap: 8 }}>
               <Link href="/dashboard" style={{ 
                  fontFamily: "Montserrat, sans-serif", 
                  fontWeight: 800, 
                  fontSize: "0.75rem", 
                  color: "var(--black)",
                  textDecoration: "none",
                  background: "var(--cyan)",
                  padding: "8px 12px",
                  borderRadius: "50px"
               }}>
                  DASHBOARD
               </Link>
            </div>
          ) : (
            <Link href="/register" className="nav-actions" style={{ 
              fontFamily: "Montserrat, sans-serif", 
              fontWeight: 800, 
              fontSize: "0.75rem", 
              color: "var(--black)",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "50px",
              border: "1px solid #ddd"
            }}>
              SIGN UP
            </Link>
          )}
          <Link href="/donate" className="btn-donate" style={{ padding: "10px 20px", fontSize: "0.75rem" }}>
            DONATE
          </Link>
          <button
            className="hamburger"
            id="hamburger-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
