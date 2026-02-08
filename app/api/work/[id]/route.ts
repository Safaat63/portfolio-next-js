import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// --- Update work entry ---
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await prisma.work.update({
      where: { id: Number(id) },
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
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.work.delete({
      where: { id: Number(id) },
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
