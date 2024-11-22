import { Users, Shield, Key, Menu } from 'lucide-react';
import { useState } from 'react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    { id: 'users' as TabType, icon: Users, label: 'Users' },
    { id: 'roles' as TabType, icon: Shield, label: 'Roles' },
    { id: 'permissions' as TabType, icon: Key, label: 'Permissions' },
  ];

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h1 className="text-xl font-bold">RBAC Admin</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-800 rounded">
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center p-4 hover:bg-gray-800 transition-colors ${
              activeTab === tab.id ? 'bg-gray-800' : ''
            }`}
          >
            <tab.icon size={20} />
            {!collapsed && <span className="ml-4">{tab.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}