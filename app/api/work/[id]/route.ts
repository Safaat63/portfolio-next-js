import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Update work entry ---
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.work.update({
      where: { id: Number(params.id) },
      data: {
        company: body.company,
        role: body.role,
        duration: body.duration,
        description: body.description,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update work entry" },
      { status: 500 }
    );
  }
}

// --- Delete work entry ---
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.work.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Work entry deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete work entry" },
      { status: 500 }
    );
  }
}
