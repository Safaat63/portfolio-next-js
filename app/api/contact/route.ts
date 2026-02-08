import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Get contact info ---
export async function GET() {
  try {
    const contact = await prisma.contact.findFirst();
    if (!contact) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(contact);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// --- Update contact info ---
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }

    let contact = await prisma.contact.findFirst();

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          email: body.email,
          phone: body.phone ?? null,
          address: body.address ?? null,
        },
      });
    } else {
      contact = await prisma.contact.update({
        where: { id: contact.id },
        data: {
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}
