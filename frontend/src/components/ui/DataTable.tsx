import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Card, TableSkeleton, Pagination } from '@/components/ui';
import { EmptyState } from '@/components/feedback';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyEmoji?: string;
  onRowClick?: (item: T) => void;
  // Pagination Props
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data found!',
  emptyEmoji = '🏜️',
  onRowClick,
  meta,
  onPageChange,
  onLimitChange,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <Card noPadding className="overflow-hidden">
        <TableSkeleton rows={5} cols={columns.length} />
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="overflow-hidden border-2 border-dashed border-gray-100 dark:border-gray-800">
        <EmptyState message={emptyMessage} emoji={emptyEmoji} />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card noPadding className="overflow-hidden border-2 border-gray-100 dark:border-gray-800 shadow-sm">
        <Table>
          <Thead>
            <Tr className="bg-gray-50/50 dark:bg-gray-800/20">
              {columns.map((col, idx) => (
                <Th 
                  key={idx} 
                  className={`${col.className || ''} ${col.align === 'right' ? 'text-right' : ''} text-[10px] font-black uppercase tracking-widest text-gray-400`}
                >
                  {col.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr 
                key={item.id} 
                onClick={() => onRowClick?.(item)}
                className={onRowClick ? 'cursor-pointer hover:bg-primary/5 transition-colors' : ''}
              >
                {columns.map((col, idx) => (
                  <Td 
                    key={idx} 
                    className={`${col.className || ''} ${col.align === 'right' ? 'text-right' : ''} py-4`}
                  >
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Reusable Pagination Footer */}
      {meta && onPageChange && (
        <Pagination 
          total={meta.total}
          page={meta.page}
          limit={meta.limit}
          totalPages={meta.totalPages}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}
    </div>
  );
}
