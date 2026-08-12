-- ============================================================
-- MiftahCoding Portfolio — Neon PostgreSQL Schema
-- Run this file directly in the Neon SQL Editor.
-- ============================================================

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'ADMIN',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  tech_stack text[] NOT NULL DEFAULT '{}',
  live_url text,
  github_url text,
  featured boolean NOT NULL DEFAULT false,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- BLOGS
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image text,
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages (read) WHERE read = false;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Initial admin user. Password: Admin@123
INSERT INTO users (name, email, password, role)
SELECT 'Miftah', 'safaatmunajat63@gmail.com', '$2b$12$TCW0BXIcR7yet7QqRv8vw.UHWn.vIVtRVPM0axWXM962voHA5Ri3y', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'safaatmunajat63@gmail.com');

-- Sample projects
INSERT INTO projects (title, slug, description, content, tech_stack, live_url, github_url, featured, image_url) VALUES
(
  'Nexus Admin Ecosystem',
  'nexus-admin-ecosystem',
  'A glassmorphic admin dashboard powering a full personal digital ecosystem: content, messaging, analytics and media management.',
  'The Nexus Admin Ecosystem is a unified control plane built for a personal digital brand. It ships with role-based access, real-time inbox management, draft-to-publish content pipelines and Cloudinary-backed media workflows, all wrapped in a modern glassmorphic interface.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Neon DB', 'NextAuth', 'Cloudinary'],
  'https://example.com',
  'https://github.com/miftahcoding',
  true,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/nexus-admin.svg'
),
(
  'Realtime Collaboration Notes',
  'realtime-collaboration-notes',
  'Low-latency collaborative markdown editor with presence indicators, version history and offline-first sync.',
  'A collaborative notes product where multiple users edit markdown documents in real time. It layers CRDT-based sync, optimistic UI updates and a resilient reconnection strategy on top of a serverless Postgres backend.',
  ARRAY['Next.js', 'WebSockets', 'PostgreSQL', 'Framer Motion'],
  'https://example.com',
  'https://github.com/miftahcoding',
  false,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/collab-notes.svg'
),
(
  'Resume Forge',
  'resume-forge',
  'Template-driven resume builder that exports print-perfect PDFs from structured JSON data.',
  'Resume Forge turns structured data into beautiful, ATS-friendly PDFs. Users pick a template, edit sections live with a split-pane preview, and export pixel-perfect output with full print styling.',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'NextAuth'],
  'https://example.com',
  'https://github.com/miftahcoding',
  false,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/resume-forge.svg'
);

-- Sample blogs (two published, one draft)
INSERT INTO blogs (title, slug, excerpt, content, tags, published, cover_image) VALUES
(
  'Designing Glassmorphic Interfaces That Perform',
  'designing-glassmorphic-interfaces',
  'Backdrop blur is cheap — but doing it well under heavy DOM work takes care. A practical guide to glass surfaces that stay buttery.',
  '## Why Glass Works\n\nGlassmorphism plays on depth: layered translucent surfaces that sit between the user and a colorful backdrop. Done right it feels physical; done wrong it feels like a fogged-up window.\n\n## The Performance Trap\n\n`backdrop-filter` is GPU-accelerated, but every element it applies to can force a new compositing layer. The trick is to limit blur surfaces, cache them, and avoid animating them.\n\n### Rules of thumb\n\n- Keep blurred regions off the hot animation path.\n- Use `will-change` sparingly.\n- Prefer fewer, larger blurs over many small ones.\n\n## A Minimal Example\n\n```tsx\n<div className=\"rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md\">\n  <p>Hello, glass world.</p>\n</div>\n```\n\n## Wrap Up\n\nGlass is an accent, not the whole story. Pair it with generous spacing and restrained motion for interfaces that feel premium and stay fast.',
  ARRAY['Design', 'CSS', 'Performance'],
  true,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/blog-glass.svg'
),
(
  'Server Actions vs API Routes in 2026',
  'server-actions-vs-api-routes',
  'When forms mutate your Neon database, do you reach for a Server Action or a route handler? Here is the decision framework I use.',
  '## Where Mutations Live\n\nServer Actions collapse the round trip: the form posts, validation runs, the database updates, and the UI revalidates — all in one hop. For admin CRUD and contact forms this is a huge win.\n\n## When API Routes Still Win\n\nPublic webhooks, third-party callbacks, and anything that needs to be called by non-browser clients belong behind an API route.\n\n## The Framework\n\n1. Browser form → Server Action.\n2. External caller → API route.\n3. Need a webhook endpoint → API route.\n4. Long-running job → separate worker, never in a request.',
  ARRAY['Next.js', 'Architecture'],
  true,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/blog-server-actions.svg'
),
(
  'Draft: Building a Search Experience Without a Search Engine',
  'search-without-a-search-engine',
  'A case study in precomputing search indexes for a tiny blog, so results feel instant with zero infrastructure.',
  '## Precompute Everything\n\nFor a site measured in hundreds of posts, you do not need Elasticsearch. Precompute a lightweight index at write time and query it in memory at read time.',
  ARRAY['Search', 'PostgreSQL'],
  false,
  'https://res.cloudinary.com/dhmk5gejq/image/upload/portfolio/blog-search.svg'
);

-- Sample inbound message
INSERT INTO messages (name, email, subject, message) VALUES
(
  'Sara Mitchell',
  'sara.mitchell@example.com',
  'Project inquiry',
  'Hi Miftah, we are looking for a frontend engineer to help ship our SaaS dashboard redesign. Your glassmorphic work caught our eye — could we chat next week?'
);
