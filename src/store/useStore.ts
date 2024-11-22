import { create } from 'zustand';
import { User, Role, Permission } from '../types';
import { users as initialUsers, roles as initialRoles, permissions as initialPermissions } from '../data/mockData';

interface Store {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Permission) => void;
  updatePermission: (permission: Permission) => void;
  deletePermission: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  users: initialUsers,
  roles: initialRoles,
  permissions: initialPermissions,
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  addUser: (user) => set((state) => ({ 
    users: [...state.users, { ...user, id: crypto.randomUUID() }] 
  })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (role) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === role.id ? role : r)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== id),
    })),
  addPermission: (permission) =>
    set((state) => ({ permissions: [...state.permissions, permission] })),
  updatePermission: (permission) =>
    set((state) => ({
      permissions: state.permissions.map((p) => (p.id === permission.id ? permission : p)),
    })),
  deletePermission: (id) =>
    set((state) => ({
      permissions: state.permissions.filter((p) => p.id !== id),
    })),
}));