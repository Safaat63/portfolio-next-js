import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET specific conversation with all messages
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const conversationId = parseInt(id);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            attachments: true,
          },
        },
        autoReplyTemplate: true,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Mark as read
    await prisma.message.updateMany({
      where: {
        conversationId: conversationId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}

// PUT to update conversation settings (auto-reply, notifications, etc.)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const conversationId = parseInt(id);
    const body = await request.json();

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: body,
      include: {
        messages: {
          include: {
            attachments: true,
          },
        },
        autoReplyTemplate: true,
      },
    });

    return NextResponse.json(updatedConversation);
  } catch (error) {
    console.error('Error updating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}

// DELETE conversation or messages based on retention policy
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const conversationId = parseInt(id);

    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    return NextResponse.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}
