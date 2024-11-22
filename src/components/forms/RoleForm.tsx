import { useForm } from 'react-hook-form';
import { Role, Permission } from '../../types';
import { useStore } from '../../store/useStore';

interface RoleFormProps {
  role?: Role;
  onSubmit: (data: Role) => void;
  onCancel: () => void;
}

export default function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const permissions = useStore((state) => state.permissions);
  const { register, handleSubmit, formState: { errors } } = useForm<Role>({
    defaultValues: role || {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      permissions: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {permissions.map((permission) => (
            <label key={permission.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('permissions')}
                value={permission.id}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{permission.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {role ? 'Update' : 'Create'} Role
        </button>
      </div>
    </form>
  );
}