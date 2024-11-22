import { useForm } from 'react-hook-form';
import { Permission } from '../../types';

interface PermissionFormProps {
  permission?: Permission;
  onSubmit: (data: Permission) => void;
  onCancel: () => void;
}

export default function PermissionForm({
  permission,
  onSubmit,
  onCancel,
}: PermissionFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Permission>({
    defaultValues: permission || {
      id: crypto.randomUUID(),
      name: '',
      description: '',
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
        <label className="block text-sm font-medium text-gray-700">ID</label>
        <input
          {...register('id', {
            required: 'ID is required',
            pattern: {
              value: /^[a-z_]+$/,
              message: 'ID must contain only lowercase letters and underscores',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.id && (
          <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>
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
          {permission ? 'Update' : 'Create'} Permission
        </button>
      </div>
    </form>
  );
}