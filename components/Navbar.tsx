"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const styles = {
  nav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 50,
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  flexBetween: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "900",
    letterSpacing: "-0.05em",
    color: "#0d9488",
    textDecoration: "none",
    transition: "color 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoBadge: {
    width: "2rem",
    height: "2rem",
    background: "linear-gradient(to bottom right, #0d9488, #06b6d4)",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "0.75rem",
  },
  desktopMenu: {
    display: "none",
  },
  desktopMenuShow: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "#4b5563",
    cursor: "pointer",
  },
  menuItemActive: {
    backgroundColor: "#f0fdfa",
    color: "#0d9488",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  adminButton: {
    display: "none",
    padding: "0.5rem 1.25rem",
    background: "linear-gradient(to right, #0d9488, #06b6d4)",
    color: "white",
    fontWeight: "600",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  adminButtonShow: {
    display: "inline-block",
  },
  hamburger: {
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    width: "2.5rem",
    height: "2.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  hamburgerHide: {
    display: "none",
  },
  hamburgerLine: {
    width: "1.5rem",
    height: "2px",
    backgroundColor: "#374151",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    display: "none",
  },
  mobileMenuShow: {
    display: "flex",
    marginTop: "1rem",
    paddingBottom: "1rem",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1rem",
  },
  mobileMenuContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
    width: "100%",
  },
  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "#4b5563",
  },
  mobileMenuItemActive: {
    background: "linear-gradient(to right, #f0fdfa, #cffafe)",
    color: "#0d9488",
    borderLeft: "4px solid #0d9488",
    paddingLeft: "calc(1rem - 4px)",
  },
  mobileAdminButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(to right, #0d9488, #06b6d4)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    marginTop: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "About", href: "/about", icon: "👤" },
    { label: "Projects", href: "/projects", icon: "💼" },
    { label: "Work", href: "/work", icon: "✨" },
    { label: "Contact", href: "/contact", icon: "📧" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.flexBetween}>
          {/* Logo */}
          <Link
            href="/"
            style={styles.logo}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#09725f")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
          >
            <span style={styles.logoBadge}>S</span>
            Safaat
          </Link>

          {/* Desktop Menu */}
          <div style={{ ...styles.desktopMenu, ...(isLarge && styles.desktopMenuShow) }}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    ...styles.menuItem,
                    ...(active && styles.menuItemActive),
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.color = "#0d9488";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4b5563";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.125rem" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div style={styles.rightSide}>
            {/* Desktop Admin Button */}
            <Link
              href="/admin"
              style={{ ...styles.adminButton, ...(isLarge && styles.adminButtonShow) }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Admin
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ ...styles.hamburger, ...(isLarge && styles.hamburgerHide) }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: isOpen ? "rotate(45deg) translateY(10px)" : "none",
                  backgroundColor: isOpen ? "#0d9488" : "#374151",
                }}
              ></span>
              <span
                style={{
                  ...styles.hamburgerLine,
                  opacity: isOpen ? 0 : 1,
                  backgroundColor: isOpen ? "#0d9488" : "#374151",
                }}
              ></span>
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: isOpen ? "rotate(-45deg) translateY(-10px)" : "none",
                  backgroundColor: isOpen ? "#0d9488" : "#374151",
                }}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{ ...styles.mobileMenu, ...(isOpen && styles.mobileMenuShow) }}>
          <div style={styles.mobileMenuContainer}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    ...styles.mobileMenuItem,
                    ...(active && styles.mobileMenuItemActive),
                    // make sure you only use either padding OR paddingTop/paddingRight/paddingBottom/paddingLeft
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.color = "#0d9488";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4b5563";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>



                // <Link
                //   key={item.href}
                //   href={item.href}
                //   onClick={() => setIsOpen(false)}
                //   style={{
                //     ...styles.mobileMenuItem,
                //     ...(active && styles.mobileMenuItemActive),
                //   }}
                //   onMouseEnter={(e) => {
                //     if (!active) {
                //       e.currentTarget.style.backgroundColor = "#f1f5f9";
                //       e.currentTarget.style.color = "#0d9488";
                //     }
                //   }}
                //   onMouseLeave={(e) => {
                //     if (!active) {
                //       e.currentTarget.style.backgroundColor = "transparent";
                //       e.currentTarget.style.color = "#4b5563";
                //     }
                //   }}
                // >
                //   <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                //   <span>{item.label}</span>
                // </Link>
              );
            })}
            {/* Mobile Admin Button */}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              style={styles.mobileAdminButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "1.125rem" }}>⚙️</span>
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
