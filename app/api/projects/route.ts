import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Get all projects ---
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// --- Add new project ---
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: title and description" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        // ✅ Ensure tech is always an array
        tech: Array.isArray(body.tech)
          ? body.tech
          : typeof body.tech === "string"
            ? body.tech.split(",").map((t: string) => t.trim())
            : [],
        image: body.image ?? null,
        github: body.github ?? null,
        demo: body.demo ?? null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}




























// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import "dotenv/config"; // ✅ ensures DATABASE_URL is loaded

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const projects = await prisma.project.findMany();
//     return NextResponse.json(projects);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const project = await prisma.project.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         tech: body.tech,
//         github: body.github,
//         demo: body.demo,
//       },
//     });
//     return NextResponse.json(project);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
//   }
// }
