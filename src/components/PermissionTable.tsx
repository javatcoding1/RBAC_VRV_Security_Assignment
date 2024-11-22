import { Permission } from '../types';
import { useStore } from '../store/useStore';
import { Edit, Trash2 } from 'lucide-react';

interface PermissionTableProps {
  onEdit: (permission: Permission) => void;
  onDelete: (permissionId: string) => void;
}

export default function PermissionTable({ onEdit, onDelete }: PermissionTableProps) {
  const permissions = useStore((state) => state.permissions);
  const searchTerm = useStore((state) => state.searchTerm);

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPermissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                <div className="text-xs text-gray-500">{permission.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{permission.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(permission)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(permission.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}