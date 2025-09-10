'use client';

import { useState } from 'react';
import { 
  BellIcon, 
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAuth } from '@/hooks/useAuth';
import ThemeDropdown from '@/components/ThemeDropdown';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';
interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const notificationsRef = useClickOutside(() => setNotificationsOpen(false));
  const userMenuRef = useClickOutside(() => setUserMenuOpen(false));

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New comment on your post',
      message: 'Someone commented on "Getting Started with Blogging"',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'Post published successfully',
      message: 'Your post "Web Development Tips" has been published',
      time: '1 hour ago',
      unread: false
    },
    {
      id: 3,
      title: 'Weekly analytics report',
      message: 'Your blog views increased by 15% this week',
      time: '3 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 mt-3 mr-3 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 rounded-md">
      <div className="px-4 md:px-6 py-2 ">
        <div className="flex items-center justify-between">
          {/* Left side - Mobile menu button and title */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onMobileMenuToggle}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white ml-2 md:ml-0">Dashboard</h2>
          </div>

          {/* Right side - user info and notifications */}
          <div className="flex items-center space-x-4">
            {/* Theme Dropdown */}
            <ThemeDropdown variant="icon" size="medium" />
            
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <IconButton
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <NotificationsIcon className="h-6 w-6 dark:text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </IconButton>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border-gray-700 rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${
                            notification.unread ? 'bg-blue-50 dark:bg-gray-900' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                notification.unread ? 'text-blue-900 dark:text-gray-200' : 'text-gray-900 dark:text-gray-300'
                              }`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-200 rounded-full ml-2 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <AccountCircleOutlinedIcon className=" text-gray-400" style={{width: '35px', height: '35px'}} />
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 