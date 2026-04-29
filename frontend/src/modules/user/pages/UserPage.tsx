import { useState, useMemo } from 'react';
import { useUserSearch, useDeleteUser, useUpdateUser, useCreateUser } from '../hooks/useUsers';
import { User, UserRole } from '../types';
import { Card, Badge, DataTable, Column, SearchToolbar, Pagination, Button, Input, Modal, PageSkeleton, CardGridSkeleton, TableSkeleton } from '@/components/ui';
import { ErrorState, EmptyState, ConfirmDialog } from '@/components/feedback';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [roleChangeData, setRoleChangeData] = useState<{ id: string, newRole: UserRole, email: string } | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'STUDENT' as UserRole });
  const [editFormData, setEditFormData] = useState({ email: '', password: '' });

  const { data: response, isLoading, isFetching, isError } = useUserSearch({ search, page, limit });
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setFormData({ email: '', password: '', role: 'STUDENT' });
      }
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser({ id: editingUser.id, ...editFormData }, {
      onSuccess: () => {
        setEditingUser(null);
        setEditFormData({ email: '', password: '' });
      }
    });
  };

  const handleRoleToggle = (user: User) => {
    let nextRole: UserRole = 'STUDENT';
    if (user.role === 'STUDENT') nextRole = 'MENTOR';
    else if (user.role === 'MENTOR') nextRole = 'ADMIN';
    else if (user.role === 'ADMIN') nextRole = 'STUDENT';

    setRoleChangeData({ id: user.id, newRole: nextRole, email: user.email });
  };

  const confirmRoleChange = () => {
    if (roleChangeData) {
      updateUser({ id: roleChangeData.id, role: roleChangeData.newRole }, {
        onSuccess: () => setRoleChangeData(null)
      });
    }
  };

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
          {new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).toUpperCase()}
        </span>
      ),
    },
    {
      header: 'ACTIONS',
      align: 'right',
      accessor: (u) => (
        <div className="flex justify-end gap-2">
           <button 
            onClick={() => {
              setEditingUser(u);
              setEditFormData({ email: u.email, password: '' });
            }}
            className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-warning hover:text-white transition-all shadow-sm"
            title="Edit Identity"
          >
            ✏️
          </button>
          <button 
            onClick={() => handleRoleToggle(u)}
            className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
            title="Change Access Level"
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
  ], [updateUser]);

  if (isLoading && !response) {
    return <PageSkeleton viewMode={viewMode} />;
  }

  if (isError) return <ErrorState message="Authentication database is unreachable!" />;

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">IDENTITY MANAGEMENT 🔑</h2>
          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
            {meta?.total ?? 0} Shielded Identities Active
          </p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all uppercase tracking-widest text-xs"
        >
          + Add New Identity
        </Button>
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

      {isFetching ? (
        viewMode === 'card' ? <CardGridSkeleton count={limit} /> : <TableSkeleton />
      ) : users.length === 0 ? (
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
                         onClick={() => {
                          setEditingUser(u);
                          setEditFormData({ email: u.email, password: '' });
                        }}
                        className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-warning hover:text-white transition-all"
                      >
                        ✏️
                      </button>
                       <button 
                        onClick={() => handleRoleToggle(u)}
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

      {/* Manual Creation Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="GENERATE NEW IDENTITY"
      >
        <form onSubmit={handleCreate} className="space-y-6 pt-4">
          <Input 
            label="EMAIL ADDRESS"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. mentor.baru@kodein.com"
            required
          />
          <Input 
            label="INITIAL PASSWORD"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Min. 8 characters"
            required
          />
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SELECT ACCESS LEVEL</p>
            <div className="grid grid-cols-3 gap-3">
              {(['ADMIN', 'MENTOR', 'STUDENT'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`py-3 rounded-xl text-xs font-black transition-all border ${
                    formData.role === r 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white dark:bg-dark-card border-gray-100 dark:border-dark-border text-gray-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <Button 
            disabled={isCreating}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20"
          >
            {isCreating ? 'GENERATING...' : 'CREATE IDENTITY Now'}
          </Button>
        </form>
      </Modal>

       {/* Edit Identity Modal */}
       <Modal 
        isOpen={editingUser !== null} 
        onClose={() => setEditingUser(null)}
        title="UPDATE IDENTITY"
      >
        <form onSubmit={handleUpdate} className="space-y-6 pt-4">
          <Input 
            label="EMAIL ADDRESS"
            type="email"
            value={editFormData.email}
            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
            placeholder="Identity Email"
            required
          />
          <Input 
            label="RESET PASSWORD (OPTIONAL)"
            type="password"
            value={editFormData.password}
            onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
            placeholder="Leave blank to keep current"
          />
          <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
            <p className="text-[10px] font-black text-warning uppercase tracking-widest leading-loose text-center">
              ⚠️ Warning: Changing email may prevent the user from logging in until they use the new credentials.
            </p>
          </div>
          <Button 
            className="w-full bg-warning hover:bg-warning/90 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-warning/20"
          >
            Update Identity
          </Button>
        </form>
      </Modal>

      {/* Role Change Confirmation */}
      <ConfirmDialog
        isOpen={roleChangeData !== null}
        onClose={() => setRoleChangeData(null)}
        onConfirm={confirmRoleChange}
        title="UPGRADE/DOWNGRADE ACCESS?"
        description={`Are you sure you want to change ${roleChangeData?.email.split('@')[0]}'s role to ${roleChangeData?.newRole}?`}
        confirmText="YES, CHANGE ROLE"
        variant="primary"
      />

      {/* Delete Confirmation */}
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
