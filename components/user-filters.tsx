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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="inline-flex rounded-md" role="group">
            <Button
              type="button"
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('all')}
              className="rounded-r-none h-10"
            >
              All
            </Button>
            <Button
              type="button"
              variant={activeFilter === 'true' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('true')}
              className="rounded-none border-l-0 h-10"
            >
              Active
            </Button>
            <Button
              type="button"
              variant={activeFilter === 'false' ? 'default' : 'outline'}
              onClick={() => onActiveFilterChange('false')}
              className="rounded-l-none border-l-0 h-10"
            >
              Inactive
            </Button>
          </div>

          <Select value={skillFilter} onValueChange={onSkillFilterChange}>
            <SelectTrigger className="w-[200px]">
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
