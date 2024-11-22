import { useForm } from 'react-hook-form';
import { User } from '../../types';
import { useStore } from '../../store/useStore';

interface UserFormProps {
  user?: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const roles = useStore((state) => state.roles);
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: user || {
      id: crypto.randomUUID(),
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      roleId: roles[0]?.id || '',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    },
  });

  const onFormSubmit = (data: User) => {
    // Ensure we're passing all required fields
    const formattedData: User = {
      ...data,
      id: user?.id || crypto.randomUUID(),
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      createdAt: user?.createdAt || new Date().toISOString().split('T')[0],
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          {...register('roleId', { required: 'Role is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
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
          {user ? 'Update' : 'Create'} User
        </button>
      </div>
    </form>
  );
}