import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const admin = await prisma.admin.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        password: "admin123",
      },
    });
    console.log("✅ Admin user created");

    // Create sample profile
    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Safaat",
        title: "Full Stack Web Developer",
        bio: "I build beautiful and scalable web experiences with modern technologies.",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "your@email.com",
      },
    });
    console.log("✅ Profile created");

    // Create sample about
    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: "About Me",
        content: "I'm a passionate full-stack developer with expertise in modern web technologies.",
      },
    });
    console.log("✅ About page created");

    // Create sample contact
    const contact = await prisma.contact.upsert({
      where: { id: 1 },
      update: {},
      create: {
        email: "contact@safaat.dev",
        phone: "+1 (555) 123-4567",
        address: "Your City, Your Country",
      },
    });
    console.log("✅ Contact info created");

    // Create sample projects
    await prisma.project.createMany({
      data: [
        {
          title: "Portfolio Website",
          description: "A Next.js portfolio powered by Neon DB with full admin dashboard",
          tech: ["Next.js", "Prisma", "Neon", "TailwindCSS"],
          github: "https://github.com/yourrepo",
          demo: "https://yourportfolio.com",
        },
        {
          title: "Shipping Platform",
          description: "A scalable shipping management system",
          tech: ["React", "Node.js", "PostgreSQL"],
          github: "https://github.com/example/shipping",
          demo: "https://shipping-demo.com",
        },
        {
          title: "Eco Brand Site",
          description: "Branding and eco-friendly strategy showcase",
          tech: ["Next.js", "TailwindCSS"],
          github: "https://github.com/example/eco",
          demo: "https://eco-demo.com",
        },
      ],
      skipDuplicates: true,
    });
    console.log("✅ Projects seeded");

    console.log("\n✨ Database seeded successfully!");
    console.log("\n📝 Admin Login Credentials:");
    console.log("   Username: admin");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n✅ Seeding complete");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
