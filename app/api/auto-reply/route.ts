import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all auto-reply templates
export async function GET() {
  try {
    const templates = await prisma.autoReplyTemplate.findMany();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching auto-reply templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST create or update auto-reply template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, subject, message, isActive } = body;

    let template;

    if (id) {
      template = await prisma.autoReplyTemplate.update({
        where: { id },
        data: { name, subject, message, isActive },
      });
    } else {
      template = await prisma.autoReplyTemplate.create({
        data: {
          name: name || 'Auto Reply',
          subject,
          message,
          isActive: isActive !== false,
        },
      });
    }

    return NextResponse.json(template, { status: id ? 200 : 201 });
  } catch (error) {
    console.error('Error managing auto-reply template:', error);
    return NextResponse.json(
      { error: 'Failed to manage template' },
      { status: 500 }
    );
  }
}
