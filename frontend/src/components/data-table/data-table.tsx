'use client';

import React, { useMemo, useState } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableHeader } from './data-table-header';
import { DataTablePagination } from './data-table-pagination';
// import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export type FilterConfig<T> = Record<
  keyof Partial<T> | string,
  { label: string; options: Array<string | number> }
>;

interface DataTableProps<T extends { id: string | number }> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchKeys?: Array<keyof T | string>;
  filterConfig?: FilterConfig<T>;
  initialPageSize?: number;
  initialColumnVisibility?: Partial<Record<string, boolean>>;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchKeys = [],
  filterConfig = {} as FilterConfig<T>,
  initialPageSize = 5,
  initialColumnVisibility = {},
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<T['id']>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(() =>
    columns.reduce(
      (acc, col) => ({
        ...acc,
        [String(col.key)]: initialColumnVisibility[String(col.key)] ?? true,
      }),
      {} as Record<string, boolean>
    )
  );
  const [filters, setFilters] = useState<
    Record<string, string | number | undefined>
  >({});

  const visibleColumns = useMemo(
    () => columns.filter((col) => columnVisibility[String(col.key)]),
    [columns, columnVisibility]
  );

  const normalizeSearchValue = (value: unknown) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }

    // Basic object support (e.g., user objects with first/last name)
    if (typeof value === 'object') {
      const maybeUser = value as {
        first_name?: string;
        last_name?: string;
        email?: string;
      };
      const name = `${maybeUser.first_name ?? ''} ${
        maybeUser.last_name ?? ''
      }`.trim();
      if (name) return name;
      if (maybeUser.email) return maybeUser.email;
    }

    return '';
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm && searchKeys.length > 0) {
      result = result.filter((row) =>
        searchKeys.some((key) => {
          const value = (row as Record<string, any>)[key as string];
          const searchValue = normalizeSearchValue(value);
          return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(
          (row) => (row as Record<string, any>)[key] === value
        );
      }
    });

    return result;
  }, [data, searchTerm, searchKeys, filters]);

  const sortedData = useMemo(() => {
    if (!sorting.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, any>)[sorting.key as string];
      const bVal = (b as Record<string, any>)[sorting.key as string];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sorting.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sorting]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;

  const handleSort = (key: string) => {
    setSorting((prev) => {
      if (prev.key !== key) {
        // first click on a new column -> ascending
        return { key, direction: 'asc' };
      }

      if (prev.direction === 'asc') {
        // second click -> descending
        return { key, direction: 'desc' };
      }

      // third click -> clear sorting
      return { key: null, direction: 'asc' };
    });
  };

  // const toggleRowSelection = (id: T['id']) => {
  //   const newSelected = new Set(selectedRows);
  //   if (newSelected.has(id)) {
  //     newSelected.delete(id);
  //   } else {
  //     newSelected.add(id);
  //   }
  //   setSelectedRows(newSelected);
  // };

  const toggleAllRows = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    }
  };

  const getSortIcon = (key: string) => {
    if (sorting.key !== key) return <ChevronsUpDown className='ml-2 h-4 w-4' />;
    return sorting.direction === 'asc' ? (
      <ChevronUp className='ml-2 h-4 w-4' />
    ) : (
      <ChevronDown className='ml-2 h-4 w-4' />
    );
  };

  return (
    <div className='w-full space-y-4'>
      <DataTableToolbar<T>
        searchKeys={searchKeys}
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        filterConfig={filterConfig}
        filters={filters}
        setFilters={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
        columns={columns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />

      {selectedRows.size > 0 && (
        <div className='text-sm text-gray-600'>
          {selectedRows.size} of {sortedData.length} row(s) selected
        </div>
      )}

      <div className='rounded-md border bg-white'>
        <Table>
          <DataTableHeader<T>
            visibleColumns={visibleColumns}
            toggleAllRows={toggleAllRows}
            allSelected={
              selectedRows.size === paginatedData.length &&
              paginatedData.length > 0
            }
            handleSort={handleSort}
            getSortIcon={getSortIcon}
          />
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 1}
                  className='text-center py-8 text-gray-500'
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={selectedRows.has(row.id) ? 'selected' : undefined}
                  className={selectedRows.has(row.id) ? 'bg-gray-50' : ''}
                >
                  {/* <TableCell className='p-4'>
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                    />
                  </TableCell> */}
                  {visibleColumns.map((column) => (
                    <TableCell key={String(column.key)} className='p-4'>
                      {column.render
                        ? column.render(
                            (row as Record<string, any>)[column.key as string],
                            row
                          )
                        : (row as Record<string, any>)[column.key as string]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        totalResults={sortedData.length}
      />
    </div>
  );
}
