import postgres from "postgres";
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
  console.error("❌ Error: DATABASE_URL is not set in environment or .env file.");
  process.exit(1);
}

const schemaPath = resolve(process.cwd(), "schema.sql");
if (!existsSync(schemaPath)) {
  console.error("❌ Error: schema.sql file not found at", schemaPath);
  process.exit(1);
}

const sqlContent = readFileSync(schemaPath, "utf-8");

console.log("⏳ Connecting to database...");
const requiresSsl = connectionString.includes("sslmode=require");
const sql = postgres(connectionString, {
  ssl: requiresSsl ? "require" : false,
  connect_timeout: 10,
});

async function main() {
  try {
    console.log("🚀 Applying schema.sql to the database...");
    await sql.unsafe(sqlContent);
    console.log("✅ Database initialized successfully! All tables, indexes, and initial seed data are applied.");
  } catch (error) {
    console.error("❌ Migration failed with error:", error);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

main();
