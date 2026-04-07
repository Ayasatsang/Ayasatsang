import { NavLink } from 'react-router-dom';
import {
  Calendar,
  FileText,
  GraduationCap,
  Heart,
  Book,
  Video,
  Star,
  Tag,
  User,
  X,
} from 'lucide-react';
import { collections } from '../../config/collections';
import { useAdminStore } from '../../hooks/useAdminStore';
import type { CollectionName } from '../../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  FileText,
  GraduationCap,
  Heart,
  Book,
  Video,
  Star,
  Tag,
  User,
};

interface CollectionsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CollectionsSidebar = ({ isOpen = false, onClose }: CollectionsSidebarProps) => {
  const store = useAdminStore();

  const getCount = (name: CollectionName) => {
    return store[name]?.length || 0;
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay - mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-[#252525] border-r border-[#3d3d3d] flex flex-col shrink-0

          /* Mobile: fixed overlay */
          fixed md:relative
          inset-y-0 left-0
          w-72 md:w-60
          z-50 md:z-auto

          /* Slide animation */
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#3d3d3d] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider">
            CMS Collections
          </h2>
          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className="md:hidden p-1 text-[#a0a0a0] hover:text-white hover:bg-[#333] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collections List */}
        <nav className="flex-1 overflow-y-auto py-2">
          {collections.map((collection) => {
            const Icon = iconMap[collection.icon] || FileText;
            const count = getCount(collection.name);

            return (
              <NavLink
                key={collection.name}
                to={`/admin/${collection.slug}`}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 mx-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[#333] text-white'
                      : 'text-[#a0a0a0] hover:text-white hover:bg-[#2d2d2d]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{collection.pluralName}</span>
                </div>
                <span className="text-xs text-[#6b6b6b]">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default CollectionsSidebar;
