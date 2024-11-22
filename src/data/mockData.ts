import { Permission, Role, User } from '../types';

export const permissions: Permission[] = [
  { id: 'read_users', name: 'Read Users', description: 'View user information' },
  { id: 'write_users', name: 'Write Users', description: 'Create and edit users' },
  { id: 'delete_users', name: 'Delete Users', description: 'Remove users from the system' },
  { id: 'manage_roles', name: 'Manage Roles', description: 'Create and modify roles' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access system analytics' },
];

export const roles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['read_users', 'write_users', 'delete_users', 'manage_roles', 'view_analytics'],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'User management and analytics',
    permissions: ['read_users', 'write_users', 'view_analytics'],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['read_users'],
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    roleId: 'admin',
    status: 'active',
    createdAt: '2024-02-15',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.r@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    roleId: 'manager',
    status: 'active',
    createdAt: '2024-02-16',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    roleId: 'viewer',
    status: 'inactive',
    createdAt: '2024-02-17',
  },
];