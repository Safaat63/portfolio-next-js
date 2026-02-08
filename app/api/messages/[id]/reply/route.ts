import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// POST reply to a message in a conversation
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const conversationId = parseInt(id);
    const body = await request.json();
    const { content, attachments = [] } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Create admin reply
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderName: 'Admin',
        senderEmail: 'admin@portfolio.local',
        content,
        contactMethod: 'admin-reply',
        hasReply: true,
        attachments: {
          create: attachments.map((att: any) => ({
            fileName: att.fileName,
            fileUrl: att.fileUrl,
            fileType: att.fileType,
            fileSize: att.fileSize,
          })),
        },
      },
      include: {
        attachments: true,
      },
    });

    // Mark original message as replied
    await prisma.message.updateMany({
      where: {
        conversationId,
        hasReply: false,
        contactMethod: { not: 'admin-reply' },
      },
      data: {
        hasReply: true,
      },
    });

    // Update conversation
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        updatedAt: new Date(),
      },
    });

    // TODO: Send reply via configured channel (email, WhatsApp, LinkedIn)

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    );
  }
}
