import { useState } from 'react';
import { TabType, User, Role, Permission } from './types';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import UserTable from './components/UserTable';
import RoleTable from './components/RoleTable';
import PermissionTable from './components/PermissionTable';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import UserForm from './components/forms/UserForm';
import RoleForm from './components/forms/RoleForm';
import PermissionForm from './components/forms/PermissionForm';
import { Plus } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<User | Role | Permission | null>(null);
  
  const store = useStore();
  const searchTerm = useStore((state) => state.searchTerm);
  const setSearchTerm = useStore((state) => state.setSearchTerm);

  const handleAdd = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: User | Role | Permission) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    switch (activeTab) {
      case 'users':
        store.deleteUser(id);
        break;
      case 'roles':
        store.deleteRole(id);
        break;
      case 'permissions':
        store.deletePermission(id);
        break;
    }
  };

  const handleSubmit = (data: User | Role | Permission) => {
    switch (activeTab) {
      case 'users':
        if (editItem) {
          store.updateUser(data as User);
        } else {
          store.addUser(data as User);
        }
        break;
      case 'roles':
        if (editItem) {
          store.updateRole(data as Role);
        } else {
          store.addRole(data as Role);
        }
        break;
      case 'permissions':
        if (editItem) {
          store.updatePermission(data as Permission);
        } else {
          store.addPermission(data as Permission);
        }
        break;
    }
    setIsModalOpen(false);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'users':
        return (
          <UserForm
            user={editItem as User}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
      case 'roles':
        return (
          <RoleForm
            role={editItem as Role}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
      case 'permissions':
        return (
          <PermissionForm
            permission={editItem as Permission}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserTable onEdit={handleEdit} onDelete={handleDelete} />;
      case 'roles':
        return <RoleTable onEdit={handleEdit} onDelete={handleDelete} />;
      case 'permissions':
        return <PermissionTable onEdit={handleEdit} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-64">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder={`Search ${activeTab}...`}
                />
              </div>
              <button
                onClick={handleAdd}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                Add {activeTab.slice(0, -1)}
              </button>
            </div>
          </div>
          {renderContent()}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editItem ? 'Edit' : 'Add'} ${activeTab.slice(0, -1)}`}
      >
        {renderForm()}
      </Modal>
    </div>
  );
}