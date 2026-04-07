import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminTopBar from './components/layout/AdminTopBar';
import CollectionsSidebar from './components/layout/CollectionsSidebar';
import { useAdminStore } from './hooks/useAdminStore';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchAllCollections = useAdminStore((state) => state.fetchAllCollections);

  // Fetch all collections on mount to show correct counts in sidebar
  useEffect(() => {
    fetchAllCollections();
  }, [fetchAllCollections]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-root admin-theme min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* Top Bar */}
      <AdminTopBar>
        {/* Burger menu - visible only on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-[#a0a0a0] hover:text-white hover:bg-[#333] rounded-md transition-colors mr-2"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </AdminTopBar>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Collections Sidebar */}
        <CollectionsSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Area */}
        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
