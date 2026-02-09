import { NextRequest, NextResponse } from 'next/server';
import { PaginatedResponse, ApiError } from '@/types/api';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('search') || undefined;
    const activeParam = searchParams.get('active');
    const skill = searchParams.get('skill') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Parse active filter
    let active: boolean | undefined;
    if (activeParam !== null) {
      active = activeParam === 'true';
    }

    // Build Prisma where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { first_name: { contains: search, mode: 'insensitive' } },
        { last_name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (active !== undefined) {
      where.active = active;
    }
    
    if (skill) {
      where.main_skill = skill;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count and data
    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    const response: PaginatedResponse<any> = {
      data: users,
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    
    const errorResponse: ApiError = {
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
