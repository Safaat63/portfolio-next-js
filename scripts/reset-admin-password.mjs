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

// Neon or current DATABASE_URL
const connectionString =
  "postgresql://neondb_owner:npg_u95lGzUKXhFN@ep-red-sea-a1rvzkh8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const email = process.argv[2] || "safaatmunajat63@gmail.com";
const newPassword = process.argv[3] || "Admin@123";

const sql = postgres(connectionString, { ssl: "require" });

async function reset() {
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await sql`
      UPDATE users
      SET password = ${hash}
      WHERE email = ${email}
      RETURNING id, name, email
    `;

    if (result.length > 0) {
      console.log(`✅ Success! Password for ${email} has been reset to: ${newPassword}`);
    } else {
      console.log(`⚠️ No user found with email: ${email}`);
    }
  } catch (error) {
    console.error("❌ Failed to reset password:", error);
  } finally {
    await sql.end();
  }
}

reset();
