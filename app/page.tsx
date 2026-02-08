"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
};

const styles = {
  main: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
  },
  heroSection: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1.5rem",
    paddingTop: "6rem",
    paddingBottom: "6rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4rem",
  },
  heroSectionLg: {
    flexDirection: "row" as const,
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingTop: "8rem",
    paddingBottom: "8rem",
    gap: "6rem",
  },
  leftContent: {
    width: "100%",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "2rem",
    order: 2 as const,
  },
  leftContentLg: {
    width: "50%",
    order: 1 as const,
  },
  textGroup: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  headline: {
    color: "#1f2937",
    fontSize: "3rem",
    fontWeight: "800",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  headlineLg: {
    fontSize: "4.5rem",
  },
  accent: {
    color: "#0d9488",
  },
  bio: {
    color: "#4b5563",
    fontSize: "1.125rem",
    fontWeight: "400",
    lineHeight: "1.6",
    maxWidth: "28rem",
  } as React.CSSProperties,
  bioLg: {
    fontSize: "1.25rem",
  },
  buttonContainer: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: "1rem",
    paddingTop: "1rem",
  },
  buttonPrimary: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    height: "3rem",
    padding: "0 2rem",
    backgroundColor: "#0d9488",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  buttonPrimaryLg: {
    height: "3.5rem",
  },
  buttonSecondary: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    height: "3rem",
    padding: "0 2rem",
    border: "2px solid #a7f3d0",
    color: "#0d9488",
    fontSize: "1rem",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
    cursor: "pointer",
  } as React.CSSProperties,
  buttonSecondaryLg: {
    height: "3.5rem",
  },
  rightContent: {
    width: "100%",
    order: 1 as const,
  },
  rightContentLg: {
    width: "50%",
    order: 2 as const,
  },
  imageContainer: {
    position: "relative" as const,
    aspectRatio: "1 / 1",
    overflow: "hidden",
    borderRadius: "1rem",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(to bottom right, #f0fdfa, #cffafe)",
  } as React.CSSProperties,
  imageOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(to top right, rgba(13, 148, 136, 0.2), transparent)",
    zIndex: 10,
  } as React.CSSProperties,
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5rem",
  },
  aboutSection: {
    width: "100%",
    backgroundColor: "#f8fafc",
    paddingTop: "6rem",
    paddingBottom: "6rem",
    borderTop: "1px solid #e2e8f0",
  } as React.CSSProperties,
  aboutContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem paddingLeft: 5rem",
    paddingRight: "5rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "4rem",
  },
  aboutContainerLg: {
    flexDirection: "row" as const,
  },
  aboutTitle: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.75rem",
  },
  aboutTitleLg: {
    width: "33.333%",
  },
  aboutLabel: {
    color: "#0d9488",
    fontSize: "0.875rem",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    marginBottom: "1rem",
  } as React.CSSProperties,
  aboutHeading: {
    fontSize: "2.25rem",
    fontWeight: "800",
    color: "#1f2937",
    lineHeight: "1.2",
  } as React.CSSProperties,
  aboutContent: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "2rem",
  },
  aboutContentLg: {
    width: "66.666%",
  },
  aboutText: {
    color: "#4b5563",
    fontSize: "1.125rem",
    lineHeight: "1.6",
  } as React.CSSProperties,
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  } as React.CSSProperties,
  skillsGridMd: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  skillItem: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  skillItemTitle: {
    color: "#1f2937",
    fontWeight: "700",
    fontSize: "1.125rem",
  } as React.CSSProperties,
  skillItemSubtitle: {
    color: "#6b7280",
    fontSize: "0.875rem",
  } as React.CSSProperties,
  projectsSection: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingTop: "6rem",
    paddingBottom: "6rem",
  } as React.CSSProperties,
  projectsHeader: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "1.5rem",
    marginBottom: "4rem",
  },
  projectsHeaderLg: {
    flexDirection: "row" as const,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  projectsTitle: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.75rem",
  },
  projectsLabel: {
    color: "#0d9488",
    fontSize: "0.875rem",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
  } as React.CSSProperties,
  projectsHeading: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1f2937",
  } as React.CSSProperties,
  viewAllLink: {
    color: "#0d9488",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.3s ease",
  } as React.CSSProperties,
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "3rem",
  } as React.CSSProperties,
  projectsGridMd: {
    gridTemplateColumns: "1fr 1fr",
  },
  projectCard: {
    cursor: "pointer",
  } as React.CSSProperties,
  projectImageContainer: {
    position: "relative" as const,
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: "0.75rem",
    backgroundColor: "#e5e7eb",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "box-shadow 0.3s ease",
  } as React.CSSProperties,
  projectImageGradient: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(to bottom right, #0d9488, #06b6d4)",
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.75rem",
  },
  projectTags: {
    display: "flex" as const,
    gap: "0.5rem",
    flexWrap: "wrap" as const,
    marginBottom: "0.75rem",
  },
  projectTag: {
    fontSize: "0.6875rem",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "#0d9488",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.25rem",
    border: "1px solid #a7f3d0",
    backgroundColor: "#f0fdfa",
  } as React.CSSProperties,
  projectTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1f2937",
    transition: "color 0.3s ease",
  } as React.CSSProperties,
  projectDescription: {
    color: "#6b7280",
    fontSize: "1rem",
    lineHeight: "1.6",
  } as React.CSSProperties,
  ctaSection: {
    width: "100%",
    background: "linear-gradient(to right, #0d9488, #06b6d4)",
    paddingTop: "6rem",
    paddingBottom: "6rem",
    padding: "0 1.5rem",
  } as React.CSSProperties,
  ctaContainer: {
    maxWidth: "56rem",
    margin: "0 auto",
    textAlign: "center" as const,
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "2rem",
    alignItems: "center",
  },
  ctaHeading: {
    fontSize: "2.25rem",
    fontWeight: "800",
    color: "white",
    lineHeight: "1.2",
  } as React.CSSProperties,
  ctaHeadingLg: {
    fontSize: "3rem",
  },
  ctaText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1.125rem",
    fontWeight: "400",
    maxWidth: "32rem",
    lineHeight: "1.6",
  } as React.CSSProperties,
  ctaHeadingLgText: {
    fontSize: "1.25rem",
  },
  ctaButton: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    height: "3.5rem",
    padding: "0 2.5rem",
    backgroundColor: "white",
    color: "#0d9488",
    fontSize: "1rem",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "none",
  } as React.CSSProperties,
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLg, setIsLg] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
      setIsMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    <main style={styles.main}>
      {/* Hero Section */}
      <section style={{ ...styles.heroSection, ...(isLg && styles.heroSectionLg) }}>
        {/* Left Content */}
        <div style={{ ...styles.leftContent, ...(isLg && styles.leftContentLg) }}>
          <div style={styles.textGroup}>
            {!loading && profile ? (
              <>
                <h1 style={{ ...styles.headline, ...(isMd && styles.headlineLg) }}>
                  Hi, I'm {profile.name}.<br />
                  <span style={styles.accent}>I build digital experiences.</span>
                </h1>
                <p style={{ ...styles.bio, ...(isMd && styles.bioLg) }}>{profile.bio}</p>
              </>
            ) : loading ? (
              <p style={{ color: "#4b5563" }}>Loading profile...</p>
            ) : (
              <>
                <h1 style={{ ...styles.headline, ...(isMd && styles.headlineLg) }}>
                  Hi, I'm Safaat.<br />
                  <span style={styles.accent}>I build digital experiences.</span>
                </h1>
                <p style={{ ...styles.bio, ...(isMd && styles.bioLg) }}>
                  Specializing in modern web design and development. I create functional and beautiful interfaces that solve real-world problems with precision.
                </p>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div style={styles.buttonContainer}>
            <Link href="/projects" style={{ ...styles.buttonPrimary, ...(isMd && styles.buttonPrimaryLg) }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#099268"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d9488"}>
              View Work
            </Link>
            <Link href="/contact" style={{ ...styles.buttonSecondary, ...(isMd && styles.buttonSecondaryLg) }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Image/Avatar */}
        <div style={{ ...styles.rightContent, ...(isLg && styles.rightContentLg) }}>
          <div style={styles.imageContainer}>
            <div style={styles.imageOverlay}></div>
            {profile?.avatar ? (
              <img alt={profile?.name} src={profile.avatar} style={styles.image} />
            ) : (
              <div style={styles.imagePlaceholder}>💻</div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection} id="about">
        <div style={{ ...styles.aboutContainer, ...(isLg && styles.aboutContainerLg) }}>
          <div style={{ ...styles.aboutTitle, ...(isLg && styles.aboutTitleLg) }}>
            <h2 style={styles.aboutLabel}>About Me</h2>
            <h3 style={styles.aboutHeading}>Crafting experiences that matter.</h3>
          </div>
          <div style={{ ...styles.aboutContent, ...(isLg && styles.aboutContentLg) }}>
            <p style={styles.aboutText}>
              {profile?.bio || "I am a passionate Full-Stack Developer with expertise in modern web technologies. My approach combines technical precision with aesthetic elegance to deliver high-quality digital products."}
            </p>
            <div style={{ ...styles.skillsGrid, ...(isMd && styles.skillsGridMd) }}>
              <div style={styles.skillItem}>
                <span style={styles.skillItemTitle}>Frontend</span>
                <span style={styles.skillItemSubtitle}>React, Next.js</span>
              </div>
              <div style={styles.skillItem}>
                <span style={styles.skillItemTitle}>Backend</span>
                <span style={styles.skillItemSubtitle}>Node.js, Prisma</span>
              </div>
              <div style={styles.skillItem}>
                <span style={styles.skillItemTitle}>Database</span>
                <span style={styles.skillItemSubtitle}>PostgreSQL, APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section style={styles.projectsSection} id="projects">
        <div style={{ ...styles.projectsHeader, ...(isLg && styles.projectsHeaderLg) }}>
          <div style={styles.projectsTitle}>
            <h2 style={styles.projectsLabel}>Portfolio</h2>
            <h3 style={styles.projectsHeading}>Featured Work</h3>
          </div>
          <Link href="/projects" style={styles.viewAllLink}>
            View All Projects →
          </Link>
        </div>

        {/* Projects Grid */}
        <div style={{ ...styles.projectsGrid, ...(isMd && styles.projectsGridMd) }}>
          {/* Project Card 1 */}
          <div style={styles.projectCard}>
            <div style={styles.projectImageContainer}>
              <div style={styles.projectImageGradient}>💼</div>
            </div>
            <div>
              <div style={styles.projectTags}>
                <span style={styles.projectTag}>Project</span>
                <span style={styles.projectTag}>Web</span>
              </div>
              <h4 style={styles.projectTitle}>Featured Project</h4>
              <p style={styles.projectDescription}>A comprehensive modern web development project showcasing best practices.</p>
            </div>
          </div>

          {/* Project Card 2 */}
          <div style={styles.projectCard}>
            <div style={styles.projectImageContainer}>
              <div style={styles.projectImageGradient}>✨</div>
            </div>
            <div>
              <div style={styles.projectTags}>
                <span style={styles.projectTag}>Design</span>
                <span style={styles.projectTag}>React</span>
              </div>
              <h4 style={styles.projectTitle}>Another Project</h4>
              <p style={styles.projectDescription}>Real-time platform with modern technologies and beautiful UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <h2 style={{ ...styles.ctaHeading, ...(isMd && styles.ctaHeadingLg) }}>Ready to bring your next project to life?</h2>
          <p style={{ ...styles.ctaText, ...(isMd && styles.ctaHeadingLgText) }}>
            I'm currently available for freelance projects and full-time opportunities. Let's build something amazing together.
          </p>
          <Link href="/contact" style={styles.ctaButton} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}>
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
