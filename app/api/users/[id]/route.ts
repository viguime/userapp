import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, ApiError } from '@/types/api';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      const errorResponse: ApiError = {
        success: false,
        error: 'INVALID_ID',
        message: 'User ID must be a valid number',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const errorResponse: ApiError = {
        success: false,
        error: 'NOT_FOUND',
        message: `User with ID ${userId} not found`,
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: ApiResponse<any> = {
      data: user,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    
    const errorResponse: ApiError = {
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Failed to fetch user',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
