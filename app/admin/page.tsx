"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
};

type Work = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

type Profile = {
  id: number;
  name: string;
  title: string;
  bio: string;
  github?: string;
  linkedin?: string;
  email?: string;
  image?: string;
};

type About = {
  id: number;
  title: string;
  content: string;
};

type Contact = {
  id: number;
  email: string;
  phone?: string;
  address?: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    image: "",
  });

  // Work
  const [workEntries, setWorkEntries] = useState<Work[]>([]);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workFormData, setWorkFormData] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  // Profile
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    title: "",
    bio: "",
    github: "",
    linkedin: "",
    email: "",
    image: "",
  });

  // About
  const [about, setAbout] = useState<About | null>(null);
  const [aboutFormData, setAboutFormData] = useState({
    title: "",
    content: "",
  });

  // Contact
  const [contact, setContact] = useState<Contact | null>(null);
  const [contactFormData, setContactFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        setIsAuthenticated(true);
        await loadAllData();
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadAllData() {
    await Promise.all([
      fetchProjects(),
      fetchWorkEntries(),
      fetchProfile(),
      fetchAbout(),
      fetchContact(),
    ]);
  }

  // ============ LOGIN ============
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage({ type: "error", text: error.error });
        return;
      }

      setIsAuthenticated(true);
      setLoginData({ username: "", password: "" });
      setMessage({ type: "success", text: "Login successful!" });
      await loadAllData();
    } catch (err) {
      setMessage({ type: "error", text: "Login failed" });
    }
  }

  // ============ LOGOUT ============
  async function handleSignOut() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setActiveTab("projects");
      setMessage(null);
      setProjects([]);
      setWorkEntries([]);
      setProfile(null);
      setAbout(null);
      setContact(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  // ============ PROJECTS ============
  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        setProjects(await res.json());
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }

  function resetProjectForm() {
    setProjectFormData({ title: "", description: "", tech: "", github: "", demo: "", image: "" });
    setEditingProject(null);
  }

  function openProjectEdit(project: Project) {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      github: project.github || "",
      demo: project.demo || "",
      image: project.image || "",
    });
    setShowProjectForm(true);
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: projectFormData.title,
      description: projectFormData.description,
      tech: projectFormData.tech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      github: projectFormData.github || null,
      demo: projectFormData.demo || null,
      image: projectFormData.image || null,
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save project");
      }

      setMessage({ type: "success", text: editingProject ? "Project updated!" : "Project created!" });
      resetProjectForm();
      setShowProjectForm(false);
      await fetchProjects();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save project" });
    }
  }

  async function deleteProject(id: number) {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          setMessage({ type: "success", text: "Project deleted!" });
          await fetchProjects();
        }
      } catch (err) {
        setMessage({ type: "error", text: "Failed to delete project" });
      }
    }
  }

  // ============ WORK ============
  async function fetchWorkEntries() {
    try {
      const res = await fetch("/api/work");
      if (res.ok) {
        setWorkEntries(await res.json());
      }
    } catch (err) {
      console.error("Error fetching work entries:", err);
    }
  }

  function resetWorkForm() {
    setWorkFormData({ company: "", role: "", duration: "", description: "" });
    setEditingWork(null);
  }

  function openWorkEdit(work: Work) {
    setEditingWork(work);
    setWorkFormData(work);
    setShowWorkForm(true);
  }

  async function handleWorkSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingWork ? `/api/work/${editingWork.id}` : "/api/work";
      const method = editingWork ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to save work");
      }

      setMessage({ type: "success", text: editingWork ? "Work entry updated!" : "Work entry created!" });
      resetWorkForm();
      setShowWorkForm(false);
      await fetchWorkEntries();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save work entry" });
    }
  }

  async function deleteWork(id: number) {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`/api/work/${id}`, { method: "DELETE" });
        if (res.ok) {
          setMessage({ type: "success", text: "Work entry deleted!" });
          await fetchWorkEntries();
        }
      } catch (err) {
        setMessage({ type: "error", text: "Failed to delete work entry" });
      }
    }
  }

  // ============ PROFILE ============
  async function fetchProfile() {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setProfileFormData(data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await res.json();
      setProfile(data);
      setMessage({ type: "success", text: "Profile updated!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile" });
    }
  }

  // ============ ABOUT ============
  async function fetchAbout() {
    try {
      const res = await fetch("/api/about");
      if (res.ok) {
        const data = await res.json();
        setAbout(data);
        setAboutFormData(data);
      }
    } catch (err) {
      console.error("Error fetching about:", err);
    }
  }

  async function handleAboutSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to save about");
      }

      const data = await res.json();
      setAbout(data);
      setMessage({ type: "success", text: "About page updated!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update about page" });
    }
  }

  // ============ CONTACT ============
  async function fetchContact() {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setContact(data);
        setContactFormData(data);
      }
    } catch (err) {
      console.error("Error fetching contact:", err);
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to save contact");
      }

      const data = await res.json();
      setContact(data);
      setMessage({ type: "success", text: "Contact info updated!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update contact info" });
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        // ============ LOGIN PAGE ============
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">Admin Login</h2>

            {message && (
              <div
                className={`p-3 rounded text-sm ${message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {message.text}
              </div>
            )}

            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        // ============ DASHBOARD ============
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0 md:relative`}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-indigo-600">safaat.dev</h2>
            </div>

            <nav className="p-4 space-y-2">
              {["projects", "work", "profile", "about", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded capitalize transition ${activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {tab}
                </button>
              ))}

              <hr className="my-4" />

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50 transition"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded bg-indigo-600 text-white"
              >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
              <div className="w-10" />
            </div>

            {/* Notification */}
            {message && (
              <div
                className={`px-6 py-3 text-sm font-medium ${message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {message.text}
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6">
              <h1 className="hidden md:block text-3xl font-bold mb-6 capitalize text-gray-900">
                {activeTab}
              </h1>

              {/* PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <button
                    onClick={() => {
                      resetProjectForm();
                      setShowProjectForm(!showProjectForm);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
                  >
                    {showProjectForm ? "Close Form" : "+ Add Project"}
                  </button>

                  {showProjectForm && (
                    <form onSubmit={handleProjectSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 max-w-2xl">
                      <input
                        type="text"
                        placeholder="Title"
                        value={projectFormData.title}
                        onChange={(e) =>
                          setProjectFormData({ ...projectFormData, title: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                      <textarea
                        placeholder="Description"
                        value={projectFormData.description}
                        onChange={(e) =>
                          setProjectFormData({
                            ...projectFormData,
                            description: e.target.value,
                          })
                        }
                        className="w-full border rounded px-4 py-2 h-24"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Tech (comma separated)"
                        value={projectFormData.tech}
                        onChange={(e) =>
                          setProjectFormData({ ...projectFormData, tech: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                      />
                      <input
                        type="url"
                        placeholder="GitHub URL (optional)"
                        value={projectFormData.github}
                        onChange={(e) =>
                          setProjectFormData({ ...projectFormData, github: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                      />
                      <input
                        type="url"
                        placeholder="Demo URL (optional)"
                        value={projectFormData.demo}
                        onChange={(e) =>
                          setProjectFormData({ ...projectFormData, demo: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                      />
                      <input
                        type="url"
                        placeholder="Image URL (optional)"
                        value={projectFormData.image}
                        onChange={(e) =>
                          setProjectFormData({ ...projectFormData, image: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                          {editingProject ? "Update" : "Save"} Project
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            resetProjectForm();
                            setShowProjectForm(false);
                          }}
                          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid gap-4">
                    {projects.length === 0 ? (
                      <p className="text-gray-600">No projects yet.</p>
                    ) : (
                      projects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white p-6 rounded shadow hover:shadow-lg transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                              {project.tech.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {project.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {(project.github || project.demo) && (
                                <div className="flex gap-2 mt-2">
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      className="text-sm text-indigo-600 hover:underline"
                                    >
                                      GitHub
                                    </a>
                                  )}
                                  {project.demo && (
                                    <a
                                      href={project.demo}
                                      target="_blank"
                                      className="text-sm text-indigo-600 hover:underline"
                                    >
                                      Demo
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openProjectEdit(project)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* WORK TAB */}
              {activeTab === "work" && (
                <div className="space-y-6">
                  <button
                    onClick={() => {
                      resetWorkForm();
                      setShowWorkForm(!showWorkForm);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
                  >
                    {showWorkForm ? "Close Form" : "+ Add Work Entry"}
                  </button>

                  {showWorkForm && (
                    <form onSubmit={handleWorkSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 max-w-2xl">
                      <input
                        type="text"
                        placeholder="Company"
                        value={workFormData.company}
                        onChange={(e) =>
                          setWorkFormData({ ...workFormData, company: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={workFormData.role}
                        onChange={(e) =>
                          setWorkFormData({ ...workFormData, role: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                        value={workFormData.duration}
                        onChange={(e) =>
                          setWorkFormData({ ...workFormData, duration: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                      <textarea
                        placeholder="Description"
                        value={workFormData.description}
                        onChange={(e) =>
                          setWorkFormData({ ...workFormData, description: e.target.value })
                        }
                        className="w-full border rounded px-4 py-2 h-24"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                          {editingWork ? "Update" : "Save"} Entry
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            resetWorkForm();
                            setShowWorkForm(false);
                          }}
                          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid gap-4">
                    {workEntries.length === 0 ? (
                      <p className="text-gray-600">No work entries yet.</p>
                    ) : (
                      workEntries.map((work) => (
                        <div
                          key={work.id}
                          className="bg-white p-6 rounded shadow hover:shadow-lg transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{work.role}</h3>
                              <p className="text-sm text-gray-600">{work.company}</p>
                              <p className="text-xs text-gray-500 mt-1">{work.duration}</p>
                              {work.description && (
                                <p className="text-sm text-gray-700 mt-2">{work.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openWorkEdit(work)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteWork(work.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Name"
                    value={profileFormData.name}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, name: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Title/Job Role"
                    value={profileFormData.title}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, title: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <textarea
                    placeholder="Bio"
                    value={profileFormData.bio}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, bio: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2 h-24"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileFormData.email}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, email: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={profileFormData.github}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, github: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={profileFormData.linkedin}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, linkedin: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="url"
                    placeholder="Profile Image URL"
                    value={profileFormData.image}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, image: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition w-full font-semibold"
                  >
                    Save Profile
                  </button>
                </form>
              )}

              {/* ABOUT TAB */}
              {activeTab === "about" && (
                <form onSubmit={handleAboutSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={aboutFormData.title}
                    onChange={(e) =>
                      setAboutFormData({ ...aboutFormData, title: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                    required
                  />
                  <textarea
                    placeholder="About Content (you can use HTML)"
                    value={aboutFormData.content}
                    onChange={(e) =>
                      setAboutFormData({ ...aboutFormData, content: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2 h-40"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition w-full font-semibold"
                  >
                    Save About Page
                  </button>
                </form>
              )}

              {/* CONTACT TAB */}
              {activeTab === "contact" && (
                <form onSubmit={handleContactSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 max-w-2xl">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, email: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={contactFormData.phone}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, phone: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2"
                  />
                  <textarea
                    placeholder="Address (optional)"
                    value={contactFormData.address}
                    onChange={(e) =>
                      setContactFormData({ ...contactFormData, address: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2 h-24"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition w-full font-semibold"
                  >
                    Save Contact Info
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
