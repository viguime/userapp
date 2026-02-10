'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, PaginatedResponse } from '@/types/api';
import { UserTable } from '@/components/user-table';
import { UserFilters } from '@/components/user-filters';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get state from URL params
  const search = searchParams.get('search') || '';
  const activeFilter = searchParams.get('active') || 'all';
  const skillFilter = searchParams.get('skill') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Local state for data
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update URL with new params
  const updateURL = useCallback((params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all') {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [router, searchParams]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (activeFilter !== 'all') params.set('active', activeFilter);
        if (skillFilter !== 'all') params.set('skill', skillFilter);
        params.set('page', currentPage.toString());
        params.set('limit', '10');
        
        const response = await fetch(`/api/users?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const data: PaginatedResponse<User> = await response.json();
        setUsers(data.data);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, activeFilter, skillFilter, currentPage]);

  // Fetch available skills for filter
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/users?limit=1000');
        if (!response.ok) return;
        
        const data: PaginatedResponse<User> = await response.json();
        const skills = Array.from(new Set(data.data.map(u => u.main_skill))).sort();
        setAvailableSkills(skills);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      }
    };

    fetchSkills();
  }, []);

  // Handler functions
  const handleSearchChange = (value: string) => {
    updateURL({ search: value, page: '1' });
  };

  const handleActiveFilterChange = (value: string) => {
    updateURL({ active: value, page: '1' });
  };

  const handleSkillFilterChange = (value: string) => {
    updateURL({ skill: value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page.toString() });
  };

  const handleClearFilters = () => {
    router.push('/', { scroll: false });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Our Users
          </h1>
        </div>

        <div className="space-y-6">
          <UserFilters
            search={search}
            onSearchChange={handleSearchChange}
            activeFilter={activeFilter}
            onActiveFilterChange={handleActiveFilterChange}
            skillFilter={skillFilter}
            onSkillFilterChange={handleSkillFilterChange}
            onClearFilters={handleClearFilters}
            availableSkills={availableSkills}
          />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading users...</div>
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
              Error: {error}
            </div>
          ) : (
            <UserTable
              users={users}
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </main>
  );
}
