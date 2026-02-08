import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET all images for a project
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const images = await prisma.projectImage.findMany({
      where: { projectId },
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching project images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// POST create new image
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await request.json();

    const image = await prisma.projectImage.create({
      data: {
        projectId,
        imageUrl: body.imageUrl,
        description: body.description,
        displayOrder: body.displayOrder || 0,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating project image:', error);
    return NextResponse.json(
      { error: 'Failed to create image' },
      { status: 500 }
    );
  }
}
