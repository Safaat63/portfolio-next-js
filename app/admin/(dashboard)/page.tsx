"use client";

import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiImage,
  FiFileText,
  FiBriefcase,
  FiBook,
  FiMail,
} from "react-icons/fi";
import AdminMessaging from "@/components/AdminMessaging";
import AdminSettings from "@/components/AdminSettings";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import AdminAbout from "@/components/AdminAbout";
import AdminProjects from "@/components/AdminProjects";
import AdminWork from "@/components/AdminWork";
import AdminContact from "@/components/AdminContact";

type AdminTab =
  | "messages"
  | "about"
  | "projects"
  | "work"
  | "contact"
  | "profile"
  | "settings";

const styles = {
  container: {
    display: "flex" as const,
    height: "100vh",
    backgroundColor: "#f8fafc",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
    display: "flex" as const,
    flexDirection: "column" as const,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  sidebarOpen: {
    width: "16rem",
  },
  sidebarClosed: {
    width: "5rem",
  },
  sidebarHeader: {
    padding: "1rem",
    borderBottom: "1px solid #e2e8f0",
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sidebarTitle: {
    fontWeight: "700",
    fontSize: "1.25rem",
    color: "#0d9488",
  },
  sidebarToggle: {
    padding: "0.5rem",
    hover: "#f1f5f9",
    borderRadius: "0.5rem",
    transition: "background-color 0.3s ease",
    color: "#4b5563",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  statsContainer: {
    padding: "1rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.75rem",
    borderBottom: "1px solid #e2e8f0",
  },
  statBox: {
    backgroundImage: "linear-gradient(to bottom right, #f0fdfa, #a7f3d0)",
    borderRadius: "0.5rem",
    padding: "1rem",
    border: "1px solid #99f6e4",
  },
  statLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "0.25rem",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0d9488",
  },
  navbar: {
    flex: 1,
    padding: "1rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.5rem",
    overflowY: "auto" as const,
  },
  menuButton: {
    width: "100%",
    display: "flex" as const,
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  menuButtonActive: {
    backgroundColor: "#0d9488",
    color: "white",
    boxShadow: "0 3px 10px rgba(13, 148, 136, 0.2)",
  },
  menuButtonInactive: {
    color: "#374151",
    backgroundColor: "transparent",
  },
  logoutButton: {
    margin: "1rem",
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
    border: "1px solid #fecaca",
    cursor: "pointer",
  },
  mainContent: {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    overflowY: "auto" as const,
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "1.5rem 2rem",
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
  },
  headerButtons: {
    display: "flex" as const,
    alignItems: "center",
    gap: "0.75rem",
  },
  refreshButton: {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #a7f3d0",
    color: "#0d9488",
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  headerLogoutButton: {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#dc2626",
    color: "white",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.875rem",
    border: "none",
  },
  content: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "2rem",
  },
  contentContainer: {
    maxWidth: "96rem",
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#ffffff",
  },
  loadingContent: {
    textAlign: "center" as const,
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
    borderRadius: "50%",
    height: "2rem",
    width: "2rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#0d9488",
    borderTopColor: "transparent",
    marginBottom: "1rem",
  },
  loadingText: {
    color: "#4b5563",
  },
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("messages");
  const [isMd, setIsMd] = useState(false);
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/messages");
        if (response.ok) {
          setIsAuthenticated(true);
          fetchStats();
        } else {
          window.location.href = "/admin?login=true";
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = "/admin?login=true";
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  async function fetchStats() {
    try {
      const response = await fetch("/api/messages");
      if (response.ok) {
        const conversations = await response.json();
        const totalMessages = conversations.reduce(
          (acc: number, conv: any) => acc + conv.messages.length,
          0
        );
        const unreadMessages = conversations.reduce(
          (acc: number, conv: any) =>
            acc +
            conv.messages.filter(
              (m: any) => !m.isRead && m.contactMethod !== "admin-reply"
            ).length,
          0
        );

        setStats({
          totalMessages,
          unreadMessages,
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const menuItems = [
    { id: "messages", label: "Messages", icon: FiMessageSquare },
    { id: "about", label: "About", icon: FiFileText },
    { id: "projects", label: "Projects", icon: FiBriefcase },
    { id: "work", label: "Work", icon: FiBook },
    { id: "contact", label: "Contact", icon: FiMail },
    { id: "profile", label: "Profile", icon: FiImage },
    { id: "settings", label: "Settings", icon: FiSettings },
  ] as const;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed) }}>
        {/* Header */}
        <div style={styles.sidebarHeader}>
          <h1 style={{ ...styles.sidebarTitle, ...(sidebarOpen ? {} : { display: "none" }) }}>
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ ...styles.sidebarToggle }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Stats */}
        {sidebarOpen && (
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Total Messages</p>
              <p style={styles.statValue}>{stats.totalMessages}</p>
            </div>
            <div style={{ ...styles.statBox, backgroundImage: "linear-gradient(to bottom right, #fffbeb, #fcd34d)" }}>
              <p style={styles.statLabel}>Unread</p>
              <p style={{ ...styles.statValue, color: "#b45309" }}>{stats.unreadMessages}</p>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav style={styles.navbar}>
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                ...styles.menuButton,
                ...(activeTab === id ? styles.menuButtonActive : styles.menuButtonInactive),
              }}
              onMouseEnter={(e) => {
                if (activeTab !== id) {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              title={!sidebarOpen ? label : ""}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fecaca")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
        >
          <FiLogOut size={20} />
          {sidebarOpen && "Logout"}
        </button>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>
              {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
            </h2>
            <p style={styles.headerSubtitle}>
              {activeTab === "messages" && "Manage customer messages and support"}
              {activeTab === "about" && "Edit your about section"}
              {activeTab === "projects" && "Manage your projects"}
              {activeTab === "work" && "Manage your work experience"}
              {activeTab === "contact" && "Update contact information"}
              {activeTab === "profile" && "Manage profile images"}
              {activeTab === "settings" && "Admin settings and preferences"}
            </p>
          </div>
          <div style={styles.headerButtons}>
            <button
              onClick={fetchStats}
              style={styles.refreshButton}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdfa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              style={styles.headerLogoutButton}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={styles.content}>
          <div style={styles.contentContainer}>
            {activeTab === "messages" && <AdminMessaging />}
            {activeTab === "about" && <AdminAbout />}
            {activeTab === "projects" && <AdminProjects />}
            {activeTab === "work" && <AdminWork />}
            {activeTab === "contact" && <AdminContact />}
            {activeTab === "profile" && <ProfileImageUpload />}
            {activeTab === "settings" && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
}

// Add animation styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}

