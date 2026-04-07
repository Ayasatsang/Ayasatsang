import { Link } from 'react-router-dom';
import { Database, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminTopBarProps {
  children?: React.ReactNode;
}

const AdminTopBar = ({ children }: AdminTopBarProps) => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-14 bg-[#1e1e1e] border-b border-[#3d3d3d] flex items-center px-4 shrink-0">
      {/* Burger menu slot (mobile only) */}
      {children}

      {/* Logo */}
      <Link to="/admin" className="flex items-center gap-2 mr-4 md:mr-6">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
      </Link>

      {/* Navigation Tabs - hidden on mobile */}
      <nav className="hidden md:flex items-center gap-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-white bg-[#333]">
          <Database className="w-4 h-4" />
          <span>CMS</span>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-[#a0a0a0] hover:text-white hover:bg-[#333] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Переглянути сайт</span>
        </Link>
      </nav>

      {/* Separator - hidden on mobile */}
      <div className="hidden md:block w-px h-6 bg-[#3d3d3d] mx-4" />

      {/* Project Name - hidden on mobile */}
      <span className="hidden md:block text-sm text-[#a0a0a0]">aya cloud canvas</span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* User Info & Logout */}
        <div className="hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-[#3d3d3d]">
          {user?.email && (
            <span className="text-xs text-[#666] truncate max-w-[150px]">
              {user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="p-2 rounded-md text-[#a0a0a0] hover:text-white hover:bg-[#333] transition-colors"
            title="Вийти"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
