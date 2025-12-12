'use client';

import React from 'react';
// import { Checkbox } from '@/components/ui/checkbox';
import { TableHeader, TableHead, TableRow } from '@/components/ui/table';
import type { DataTableColumn } from './data-table';

interface DataTableHeaderProps<T> {
  visibleColumns: DataTableColumn<T>[];
  toggleAllRows: () => void;
  allSelected: boolean;
  handleSort: (key: string) => void;
  getSortIcon: (key: string) => React.ReactNode;
}

export function DataTableHeader<T>({
  visibleColumns,
  // toggleAllRows,
  // allSelected,
  handleSort,
  getSortIcon,
}: DataTableHeaderProps<T>) {
  return (
    <TableHeader className="bg-gradient-to-r from-purple-400 to-purple-500 [&_tr]:hover:bg-transparent">
      <TableRow>
        {/* <TableHead className='w-12 p-4'>
          <Checkbox checked={allSelected} onCheckedChange={toggleAllRows} />
        </TableHead> */}
        {visibleColumns.map((column) => (
          <TableHead key={String(column.key)} className="p-4 text-white">
            {column.sortable !== false ? (
              <button
                onClick={() => handleSort(String(column.key))}
                className="flex items-center font-medium"
              >
                {column.label}
                {getSortIcon(String(column.key))}
              </button>
            ) : (
              <span className="font-medium">{column.label}</span>
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
