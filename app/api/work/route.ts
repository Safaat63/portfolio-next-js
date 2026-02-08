import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Get all work entries ---
export async function GET() {
  try {
    const workEntries = await prisma.work.findMany();
    return NextResponse.json(workEntries);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch work entries" },
      { status: 500 }
    );
  }
}

// --- Add new work entry ---
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.company || !body.role || !body.duration) {
      return NextResponse.json(
        { error: "Missing required fields: company, role, duration" },
        { status: 400 }
      );
    }

    const work = await prisma.work.create({
      data: {
        company: body.company,
        role: body.role,
        duration: body.duration,
        description: body.description ?? "",
      },
    });

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error("Error adding work entry:", error);
    return NextResponse.json(
      { error: "Failed to add work entry" },
      { status: 500 }
    );
  }
}
