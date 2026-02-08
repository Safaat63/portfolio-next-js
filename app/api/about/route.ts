import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Get about page ---
export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    if (!about) {
      return NextResponse.json(
        { error: "About page not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(about);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch about page" },
      { status: 500 }
    );
  }
}

// --- Update about page ---
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields: title, content" },
        { status: 400 }
      );
    }

    let about = await prisma.about.findFirst();

    if (!about) {
      about = await prisma.about.create({
        data: {
          title: body.title,
          content: body.content,
        },
      });
    } else {
      about = await prisma.about.update({
        where: { id: about.id },
        data: {
          title: body.title,
          content: body.content,
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about page:", error);
    return NextResponse.json(
      { error: "Failed to update about page" },
      { status: 500 }
    );
  }
}
