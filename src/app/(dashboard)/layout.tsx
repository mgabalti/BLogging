'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Header } from '@/components/header/Header';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import FontAwesomeProvider from '@/components/FontAwesomeProvider';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <FontAwesomeProvider>
        <div className="min-h-screen">
          <div className="flex h-screen ">
            {/* Desktop Sidebar */}
            <div className='p-3 h-screen'>
            <div className="hidden md:block h-full">
              <Sidebar 
                collapsed={sidebarCollapsed} 
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
              />
            </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <Sidebar 
                    collapsed={false} 
                    onToggle={() => {}} 
                  />
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </FontAwesomeProvider>
    </ProtectedRoute>
  );
} 