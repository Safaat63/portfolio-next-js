import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET message settings
export async function GET() {
  try {
    let settings = await prisma.messageSettings.findFirst();

    if (!settings) {
      settings = await prisma.messageSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching message settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST/PUT update message settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let settings = await prisma.messageSettings.findFirst();

    if (!settings) {
      settings = await prisma.messageSettings.create({
        data: body,
      });
    } else {
      settings = await prisma.messageSettings.update({
        where: { id: settings.id },
        data: body,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating message settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
