/**
 * Seed or upsert the admin user in whatever DATABASE_URL is configured.
 *
 * Usage (local — reads .env automatically):
 *   node scripts/seed-admin.mjs
 *
 * Usage (custom connection string):
 *   DATABASE_URL="postgresql://..." node scripts/seed-admin.mjs
 *
 * Override email / password via CLI args:
 *   node scripts/seed-admin.mjs admin@example.com MyPass123
 */

import postgres from "postgres";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return {};
  const content = readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length > 0) {
      env[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

const localEnv = loadEnv();
const connectionString = process.env.DATABASE_URL || localEnv.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

const email = process.argv[2] || "safaatmunajat63@gmail.com";
const password = process.argv[3] || "Admin@123";
const name = process.argv[4] || "Safaat Munazat";

const requiresSsl = connectionString.includes("sslmode=require");
const sql = postgres(connectionString, {
  ssl: requiresSsl ? "require" : false,
  connect_timeout: 10,
});

async function seed() {
  try {
    console.log(`\n🔗 Connecting to: ${connectionString.replace(/:([^@]+)@/, ':***@')}`);

    // Ensure users table exists (idempotent)
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        role text NOT NULL DEFAULT 'ADMIN',
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const hash = await bcrypt.hash(password, 12);

    // Upsert: insert if not exists, update password if already there
    const result = await sql.unsafe(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, 'ADMIN')
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, name = EXCLUDED.name
       RETURNING id, name, email, role`,
      [name, email, hash]
    );

    if (result.length > 0) {
      const u = result[0];
      console.log(`\n✅ Admin user ready:`);
      console.log(`   ID:    ${u.id}`);
      console.log(`   Name:  ${u.name}`);
      console.log(`   Email: ${u.email}`);
      console.log(`   Role:  ${u.role}`);
      console.log(`\n🔑 Password: ${password}`);
      console.log("\nYou can now log in at /admin/login\n");
    }
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

seed();
