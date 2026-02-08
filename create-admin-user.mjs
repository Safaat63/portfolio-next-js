import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createAdmin() {
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
    console.log("✅ Admin user created/updated!");
    console.log("Login with: admin / admin123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
