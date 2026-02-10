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
}

export function UserTable({ users, currentPage, totalPages, totalItems, onPageChange }: UserTableProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="rounded-lg border bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[100px]"></TableHead>
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
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                      <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {user.first_name} {user.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.phone_number || 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge variant={user.active ? 'success' : 'destructive'}>
                    {user.active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${user.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
