'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  faHome, 
  faFileAlt, 
  faUser, 
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from '@/components/ui/FontAwesomeIcon';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: faHome 
    },
    { 
      name: 'Blog', 
      href: '/dashboard/blog', 
      icon: faFileAlt 
    },
    { 
      name: 'User Settings', 
      href: '/dashboard/settings', 
      icon: faUser 
    },
  ];

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className={`bg-white shadow-sm rounded-lg h-full border-gray-200 transition-all duration-300 ease-in-out ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">Blog Portal</h1>
          )}
          <button
            onClick={onToggle}
            onKeyDown={(e) => handleKeyDown(e, onToggle)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FontAwesomeIcon 
              icon={collapsed ? faChevronRight : faChevronLeft}
              className="h-5 w-5 text-gray-600"
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <span className={` border border-dashed border-blue-500 rounded flex items-center justify-center  ${
                      isActive ? 'border-white ' : ' '
                    }`} style={{width:'30px', height:'30px'}}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    size='lg'
                    className={` ${
                      isActive ? 'text-white ' : 'text-blue-500  p-2 '
                    }`}
                  />
                  </span>
                  {!collapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <div className="text-xs text-gray-500">
              <p>© 2024 Blog Portal</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 