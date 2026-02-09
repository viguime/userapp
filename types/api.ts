import { User } from '@prisma/client';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  success: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query Parameters Types
export interface UsersQueryParams {
  search?: string;
  active?: string | boolean;
  skill?: string;
  page?: string | number;
  limit?: string | number;
}

// Re-export Prisma User type
export type { User };
