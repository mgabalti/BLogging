'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Users, Folder, Shield, Settings, Menu, X, LogOut, Bell } from 'lucide-react';
import './globals.css';

// Mock auth hook - TEMPORARILY DISABLED for testing
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => { 
      setUser({ 
        role: 'Admin', 
        name: 'John Smith',
        email: 'john.smith@thechronicle.com'
      }); 
      setLoading(false); 
    }, 500);
  }, []);
  return { user, loading };
};

interface AdminLayoutProps { 
  children: React.ReactNode; 
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { /* TEMPORARILY DISABLED: Skip auth check for testing */ }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  // TEMPORARILY DISABLED: Skip auth check for testing
  // if (!user || user.role !== 'Admin') { return null; }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Categories', href: '/admin/categories', icon: Folder },
    { name: 'Moderation', href: '/admin/moderation', icon: Shield },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <AdminSidebar navigation={navigation} onLogout={handleLogout} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <AdminSidebar navigation={navigation} onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="md:pl-72 flex flex-col min-h-screen">
        {/* Mobile menu button */}
        <div className="sticky top-0 z-10 md:hidden  pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            className="-ml-0.5 -mt-0.5  h-12 w-12 inline-flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Admin Header with User Info and Notifications */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {(user?.name || 'Admin').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</div>
                  <div className="text-xs text-gray-500">{user?.email || 'admin@thechronicle.com'}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

interface AdminSidebarProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: any;
  }>;
  onLogout: () => void;
}

function AdminSidebar({ navigation, onLogout }: AdminSidebarProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Brand header with blue accent */}
        <div className="flex items-center flex-shrink-0 px-4 pb-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">The Chronicle</h2>
              <span className="text-xs text-gray-500">Admin Panel</span>
            </div>
          </div>
        </div>
        
        {/* Navigation menu */}
        <nav className="mt-6 flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-100"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-blue-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Logout section with blue theme */}
      <div className="flex-shrink-0 flex bg-gray-50 p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500 hover:text-red-500" />
          Sign out
        </button>
      </div>
    </div>
  );
}