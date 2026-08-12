import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { mapProject } from "@/lib/types";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechStack } from "@/components/TechStack";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "MiftahCoding — Frontend Developer building glassmorphic, full-stack web experiences with Next.js, Neon DB, and cloud-native tooling.",
};

export default async function HomePage() {
  const [projectRows, blogRows] = await Promise.all([
    sql`SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT 6`,
    sql`SELECT * FROM blogs WHERE published = true`,
  ]);

  const featured = projectRows.map(mapProject);
  const articleCount = blogRows.length;

  return (
    <>
      <Hero
        stats={{
          projects: featured.length,
          articles: articleCount,
          clients: featured.length + 1,
        }}
      />
      <FeaturedProjects projects={featured} />
      <TechStack />
    </>
  );
}
