import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Loaded" : "❌ NOT FOUND");

const prisma = new PrismaClient();

async function run() {
  try {
    console.log("Creating admin user...");
    const admin = await prisma.admin.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        password: "admin123",
      },
    });
    console.log("✅ Admin created!");
    console.log("Login: admin / admin123");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

run();
