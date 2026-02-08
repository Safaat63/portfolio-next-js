import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: Promise<{
    id: string;
    imageId: string;
  }>;
}

// DELETE project image
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id, imageId } = await params;

    await prisma.projectImage.delete({
      where: { id: parseInt(imageId) },
    });

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Error deleting project image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
