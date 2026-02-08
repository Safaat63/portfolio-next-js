import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const prisma = new PrismaClient();

async function test() {
  try {
    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { username: "admin" },
    });
    
    console.log("✅ Admin found in database:");
    console.log("  Username:", admin?.username);
    console.log("  Password:", admin?.password);
    console.log("  ID:", admin?.id);
    
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
