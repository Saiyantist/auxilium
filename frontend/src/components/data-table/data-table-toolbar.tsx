'use client';

import React from 'react';
import { ChevronDown, Eye, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DataTableColumn, FilterConfig } from './data-table';
import { toTitleCase } from '@/utils/string';

interface DataTableToolbarProps<T> {
  searchKeys: Array<keyof T | string>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterConfig: FilterConfig<T>;
  filters: Record<string, string | number | undefined>;
  setFilters: (filters: Record<string, string | number | undefined>) => void;
  columns: DataTableColumn<T>[];
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export function DataTableToolbar<T>({
  searchKeys,
  searchTerm,
  setSearchTerm,
  filterConfig,
  filters,
  setFilters,
  columns,
  columnVisibility,
  setColumnVisibility,
}: DataTableToolbarProps<T>) {
  const hasActiveFilters = Object.keys(filterConfig).some(
    (key) => filters[key] && filters[key] !== 'all'
  );

  const activeFilterCount = Object.keys(filterConfig).reduce((count, key) => {
    const value = filters[key];
    return count + (value && value !== 'all' ? 1 : 0);
  }, 0);

  const handleResetFilters = () => {
    const cleared = Object.keys(filterConfig).reduce(
      (acc, key) => ({ ...acc, [key]: 'all' as const }),
      {} as Record<string, string>
    );
    setFilters(cleared);
  };

  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex items-center gap-4 flex-1'>
        {searchKeys.length > 0 && (
          <div className='relative flex-1 max-w-sm'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-9 pr-9'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>
        )}

        {Object.entries(filterConfig).map(([key, config]) => (
          <DropdownMenu key={key}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                {config.label}
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuLabel>Filter by {config.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={!filters[key] || filters[key] === 'all'}
                onCheckedChange={() => {
                  setFilters({ ...filters, [key]: 'all' });
                }}
              >
                All
              </DropdownMenuCheckboxItem>
              {config.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={filters[key] === option}
                  onCheckedChange={() => {
                    setFilters({ ...filters, [key]: option });
                  }}
                >
                  {toTitleCase(option)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {Object.keys(filterConfig).length > 0 && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            className='hover:text-red-600'
          >
            {activeFilterCount > 0
              ? `Reset filters (${activeFilterCount})`
              : 'Reset filters'}
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm'>
            <Eye className='mr-2 h-4 w-4' />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={String(column.key)}
              checked={columnVisibility[String(column.key)]}
              onCheckedChange={(checked) => {
                setColumnVisibility((prev) => ({
                  ...prev,
                  [String(column.key)]: checked,
                }));
              }}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
