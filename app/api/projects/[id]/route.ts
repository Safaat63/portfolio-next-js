import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Update project ---
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.project.update({
      where: { id: Number(params.id) },
      data: {
        title: body.title,
        description: body.description,
        tech: body.tech,
        github: body.github,
        demo: body.demo,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// --- Delete project ---
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
