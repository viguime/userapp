'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t px-3 sm:px-4 py-3 text-xs sm:text-sm">
      <div className="text-muted-foreground order-2 sm:order-1">
        Showing {startItem}-{endItem} of {totalItems}
      </div>
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 sm:w-auto sm:px-3"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Prev</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 sm:w-auto sm:px-3"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
