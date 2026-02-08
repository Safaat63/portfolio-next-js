import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET profile with all images
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT update profile image
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, mainImage = false } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Get or create profile
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'Portfolio Owner',
          title: 'Developer',
          bio: 'Welcome to my portfolio',
          image: imageUrl,
          profileImages: [imageUrl],
        },
      });
    } else {
      // Add to profile images if not already there
      const profileImages = profile.profileImages || [];
      if (!profileImages.includes(imageUrl)) {
        profileImages.push(imageUrl);
      }

      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          image: mainImage ? imageUrl : profile.image,
          profileImages,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile image:', error);
    return NextResponse.json(
      { error: 'Failed to update profile image' },
      { status: 500 }
    );
  }
}
