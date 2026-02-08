import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// POST request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the admin (assuming there's only one admin in the system)
    const admin = await prisma.admin.findFirst();

    if (!admin) {
      // Don't reveal if user exists (security best practice)
      return NextResponse.json({
        message: 'If an admin account with that email exists, a reset link has been sent.',
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        token,
        adminId: admin.id,
        expiresAt,
      },
    });

    // TODO: Send email with reset link
    console.log(`Password reset token: ${token}`);

    return NextResponse.json({
      message: 'If an admin account with that email exists, a reset link has been sent.',
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return NextResponse.json(
      { error: 'Failed to process reset request' },
      { status: 500 }
    );
  }
}
