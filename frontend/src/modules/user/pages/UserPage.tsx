import { useState, useMemo } from 'react';
import { useUserSearch, useDeleteUser, useUpdateUserRole } from '../hooks/useUsers';
import { User, UserRole } from '../types';
import { Card, Badge, DataTable, Column, SearchToolbar, Pagination } from '@/components/ui';
import { ErrorState, EmptyState, ConfirmDialog } from '@/components/feedback';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: response, isLoading, isError } = useUserSearch({ search, page, limit });
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateRole } = useUpdateUserRole();

  const users = response?.data ?? [];
  const meta = response?.meta;

  const columns = useMemo<Column<User>[]>(() => [
    {
      header: 'USER ACCOUNT',
      accessor: (u) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-lg shadow-sm">
            {u.role === 'ADMIN' ? '🔑' : u.role === 'MENTOR' ? '👨‍🏫' : '🎓'}
          </div>
          <div>
            <p className="font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{u.email.split('@')[0]}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'ACCESS ROLE',
      accessor: (u) => {
        const variants: Record<UserRole, any> = {
          ADMIN: 'danger',
          MENTOR: 'primary',
          STUDENT: 'success'
        };
        return <Badge variant={variants[u.role]}>{u.role}</Badge>;
      },
    },
    {
      header: 'JOINED DATE',
      accessor: (u) => (
        <span className="font-bold text-gray-400 font-mono tracking-widest text-xs uppercase">
          {new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
        </span>
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (u) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => updateRole({ id: u.id, role: u.role === 'MENTOR' ? 'ADMIN' : 'MENTOR' })}
            className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
            title="Switch Mentor/Admin"
          >
            🔄
          </button>
          <button
            onClick={() => setDeleteId(u.id)}
            className="w-9 h-9 bg-danger/10 text-danger rounded-lg flex items-center justify-center hover:bg-danger hover:text-white transition-all active:scale-90 shadow-sm"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ], [updateRole]);

  if (isError) return <ErrorState message="Authentication database is unreachable!" />;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">IDENTITY MANAGEMENT 🔑</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-danger rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            {meta?.total ?? 0} Shielded Identities Active
          </p>
        </div>
      </div>

      <SearchToolbar 
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="Search users by email or role..."
      />

      {users.length === 0 && !isLoading ? (
        <EmptyState message="No users found in the arena!" emoji="👤" />
      ) : (
        <div className="space-y-10">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {users.map((u: User) => (
                <Card key={u.id} className="group hover:-translate-y-2 transition-all duration-500 rounded-[24px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-2xl p-6 text-center flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-xl mb-6 group-hover:rotate-6 transition-transform duration-500 ${u.role === 'ADMIN' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                    {u.role === 'ADMIN' ? '🔑' : u.role === 'MENTOR' ? '👨‍🏫' : '🎓'}
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight truncate w-full">{u.email.split('@')[0]}</h3>
                  <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest mb-4">{u.email}</p>
                  
                  <Badge variant={u.role === 'ADMIN' ? 'danger' : u.role === 'MENTOR' ? 'primary' : 'success'}>
                    {u.role}
                  </Badge>

                  <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 w-full flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => updateRole({ id: u.id, role: u.role === 'MENTOR' ? 'ADMIN' : 'MENTOR' })}
                        className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                      >
                        🔄
                      </button>
                      <button 
                        onClick={() => setDeleteId(u.id)}
                        className="w-8 h-8 bg-danger/5 text-danger rounded-lg flex items-center justify-center hover:bg-danger hover:text-white transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <DataTable 
              data={users} 
              columns={columns} 
              isLoading={isLoading}
            />
          )}

          {meta && (
            <div className="py-8 border-t border-gray-100 dark:border-gray-800">
              <Pagination 
                total={meta.total}
                page={meta.page}
                limit={meta.limit}
                totalPages={meta.totalPages}
                onPageChange={(p) => setPage(p)}
                onLimitChange={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteUser(deleteId);
          setDeleteId(null);
        }}
        title="REVOKE ACCESS?"
        description="This will permanently delete the user account. They will lose all access to the system immediately."
        confirmText="YES, REVOKE"
        variant="danger"
      />
    </div>
  );
}
