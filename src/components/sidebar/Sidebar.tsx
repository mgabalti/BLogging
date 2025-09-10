'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import {
  faHome,
  faFileAlt,
  faUser,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from '@/components/ui/FontAwesomeIcon';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeDropdown from '@/components/ThemeDropdown';

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
      icon: <HomeIcon className='w-4 text-blue-500 dark:text-gray-100' />
    },
    {
      name: 'Blog',
      href: '/dashboard/blog',
      icon:  <ArticleIcon  className='w-3 text-blue-500 dark:text-gray-100' style={{width:'18px'}}  />
    },
    {
      name: 'Category',
      href: '/dashboard/category',
      icon:  <CategoryIcon className='w-3 text-blue-500 dark:text-gray-100' style={{width:'18px'}} />
    },
    {
      name: 'User Settings',
      href: '/dashboard/settings',
      icon:  <SettingsIcon className='w-3 text-blue-500 dark:text-gray-100'  style={{width:'18px'}} />
    },
  ];

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-sm rounded-lg h-full border-gray-200 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'
      }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Blog Portal</h1>
          )}
          <button
            onClick={onToggle}
            onKeyDown={(e) => handleKeyDown(e, onToggle)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FontAwesomeIcon
              icon={collapsed ? faChevronRight : faChevronLeft}
              className="h-5 w-5 text-gray-600 dark:text-gray-500"
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
                  className={`group flex items-center px-2 py-2 text-sm font-medium transition-all duration-200 ${isActive
                      ? 'bg-blue-500 dark:bg-gray-900 text-white'
                      : 'text-gray-600 dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  title={collapsed ? item.name : undefined}
                >
                  <span className={` border border-dashed border-blue-500 dark:border-gray-400 rounded flex items-center justify-center  ${isActive ? 'border-white ' : ' '
                    }`} style={{ width: '30px', height: '30px' }}>
                    {item.icon}
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {/* Theme Dropdown */}
          
          
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