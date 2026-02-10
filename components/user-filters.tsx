'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onActiveFilterChange: (value: string) => void;
  skillFilter: string;
  onSkillFilterChange: (value: string) => void;
  onClearFilters: () => void;
  availableSkills: string[];
}

export function UserFilters({
  search,
  onSearchChange,
  activeFilter,
  onActiveFilterChange,
  skillFilter,
  onSkillFilterChange,
  availableSkills,
}: UserFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search Input - Full width on mobile, constrained on desktop */}
        <div className="relative w-full md:flex-1 md:max-w-sm">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters - Stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {/* Active Filter Button Group */}
          <div className="inline-flex rounded-md w-full sm:w-auto" role="group">
            <Button
              type="button"
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('all')}
              className="rounded-r-none h-10 flex-1 sm:flex-none"
            >
              All
            </Button>
            <Button
              type="button"
              variant={activeFilter === 'true' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('true')}
              className="rounded-none border-l-0 h-10 flex-1 sm:flex-none"
            >
              Active
            </Button>
            <Button
              type="button"
              variant={activeFilter === 'false' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('false')}
              className="rounded-l-none border-l-0 h-10 flex-1 sm:flex-none"
            >
              Inactive
            </Button>
          </div>

          {/* Skill Filter Dropdown */}
          <Select value={skillFilter} onValueChange={onSkillFilterChange}>
            <SelectTrigger className="w-full sm:w-[200px] h-10">
              <SelectValue placeholder="Main Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {availableSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
