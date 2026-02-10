'use client';

import { User } from '@/types/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { Pagination } from './pagination';

interface UserTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  currentSearchParams?: string;
}

export function UserTable({ users, currentPage, totalPages, totalItems, onPageChange, currentSearchParams = '' }: UserTableProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getDetailUrl = (userId: number) => {
    const baseUrl = `/users/${userId}`;
    return currentSearchParams ? `${baseUrl}?${currentSearchParams}` : baseUrl;
  };

  return (
    <div className="rounded-lg border bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Mobile-friendly table with horizontal scroll */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-12">
              <TableHead className="uppercase">User</TableHead>
              <TableHead className="hidden sm:table-cell uppercase">Email</TableHead>
              <TableHead className="hidden md:table-cell uppercase">Phone Number</TableHead>
              <TableHead className="w-[100px] sm:w-[120px] uppercase">Status</TableHead>
              <TableHead className="w-[80px] sm:w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-[140px]">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm sm:text-base">
                          {user.first_name} {user.last_name}
                        </span>
                        {/* Show email on mobile when column is hidden */}
                        <span className="text-xs text-muted-foreground sm:hidden truncate max-w-[120px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {user.phone_number || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.active ? 'success' : 'destructive'} className="text-xs">
                      {user.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={getDetailUrl(user.id)}>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 bg-white text-muted-foreground hover:text-foreground">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
