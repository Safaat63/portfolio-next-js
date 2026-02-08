import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// --- Get profile ---
export async function GET() {
  try {
    const prisma = new PrismaClient();
    const profile = await prisma.profile.findFirst();
    await prisma.$disconnect();
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// --- Update profile ---
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const prisma = new PrismaClient();
    
    // Update existing profile or create if it doesn't exist
    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });
    await prisma.$disconnect();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
