import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all conversations for admin
export async function GET(request: NextRequest) {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            attachments: true,
          },
        },
        autoReplyTemplate: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// POST new message/conversation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      senderName,
      senderEmail,
      senderPhone,
      content,
      contactMethod,
      subject,
      attachments = [],
    } = body;

    // Validation
    if (!senderName || !senderEmail || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        senderEmail: senderEmail,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          senderEmail,
          subject: subject || 'No Subject',
        },
      });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderName,
        senderEmail,
        senderPhone,
        content,
        contactMethod: contactMethod || 'email',
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

    // TODO: Send email notification and auto-reply if enabled
    // TODO: Send WhatsApp message if selected
    // TODO: Send LinkedIn message if selected

    return NextResponse.json(
      { message, conversationId: conversation.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
