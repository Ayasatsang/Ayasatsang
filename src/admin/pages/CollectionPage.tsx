import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Settings, Trash2, Eye, Archive, Loader2 } from 'lucide-react';
import { getCollectionConfig } from '../config/collections';
import { useAdminStore, useIsCollectionLoading } from '../hooks/useAdminStore';
import StatusBadge from '../components/table/StatusBadge';
import type { CollectionName, ContentStatus } from '../types';

const CollectionPage = () => {
  const { collection } = useParams<{ collection: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContentStatus | 'all'>('all');

  const config = getCollectionConfig(collection || '');
  const store = useAdminStore();
  const { deleteItem, setStatus, fetchCollection } = store;
  const isLoading = useIsCollectionLoading(config?.name as CollectionName);

  // Fetch collection data on mount
  useEffect(() => {
    if (config) {
      fetchCollection(config.name as CollectionName);
    }
  }, [config?.name, fetchCollection]);

  if (!config) {
    return (
      <div className="flex items-center justify-center h-full text-[#a0a0a0]">
        Колекцію не знайдено
      </div>
    );
  }

  const items = store[config.name as CollectionName] || [];

  // Filter and search items
  const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const titleField = config.fields.find(f => f.name === 'title' || f.name === 'name' || f.name === 'authorName');
        if (titleField) {
          const value = item[titleField.name];
          if (value && !String(value).toLowerCase().includes(searchLower)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [items, searchQuery, statusFilter, config]);

  // Sort items by updatedAt desc
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [filteredItems]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Видалити цей елемент?')) {
      await deleteItem(config.name as CollectionName, id);
    }
  };

  const handleStatusChange = async (id: string, status: ContentStatus) => {
    await setStatus(config.name as CollectionName, id, status);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayValue = (item: any, columnKey: string) => {
    const value = item[columnKey];

    if (columnKey === 'status') {
      return <StatusBadge status={value} />;
    }

    if (columnKey === 'updatedAt' || columnKey === 'createdAt' || columnKey === 'date') {
      return value ? formatDate(value) : '-';
    }

    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }

    return value || '-';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-[#3d3d3d] bg-[#252525]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-semibold truncate">{config.pluralName}</h1>
          <Link
            to={`/admin/${config.slug}/new`}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New {config.singularName}</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
            <input
              type="text"
              placeholder={`Search ${config.pluralName.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1e1e1e] border border-[#3d3d3d] rounded-md text-sm text-white placeholder-[#6b6b6b] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ContentStatus | 'all')}
              className="flex-1 sm:flex-none px-3 py-2 bg-[#1e1e1e] border border-[#3d3d3d] rounded-md text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Всі статуси</option>
              <option value="draft">Чернетки</option>
              <option value="published">Опубліковані</option>
              <option value="archived">Архів</option>
            </select>

            <button className="p-2 bg-[#1e1e1e] border border-[#3d3d3d] rounded-md text-[#a0a0a0] hover:text-white hover:border-[#4d4d4d] transition-colors shrink-0">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#a0a0a0] p-4">
            <p className="mb-4 text-center">Немає елементів</p>
            <Link
              to={`/admin/${config.slug}/new`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Створити {config.singularName.toLowerCase()}</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-[#252525] sticky top-0">
                <tr>
                  {config.tableColumns.map((columnKey) => {
                    const field = config.fields.find(f => f.name === columnKey);
                    return (
                      <th
                        key={columnKey}
                        className="px-3 md:px-4 py-3 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider border-b border-[#3d3d3d] whitespace-nowrap"
                      >
                        {field?.label || columnKey}
                      </th>
                    );
                  })}
                  <th className="px-3 md:px-4 py-3 text-right text-xs font-medium text-[#a0a0a0] uppercase tracking-wider border-b border-[#3d3d3d] w-20">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3d3d3d]">
                {sortedItems.map((item: any) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#2d2d2d] cursor-pointer transition-colors"
                    onClick={() => navigate(`/admin/${config.slug}/${item.id}`)}
                  >
                    {config.tableColumns.map((columnKey) => (
                      <td key={columnKey} className="px-3 md:px-4 py-3 text-sm whitespace-nowrap">
                        {getDisplayValue(item, columnKey)}
                      </td>
                    ))}
                    <td className="px-3 md:px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        {item.status !== 'published' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'published')}
                            className="p-1.5 text-[#6b6b6b] hover:text-green-500 hover:bg-[#333] rounded transition-colors"
                            title="Опублікувати"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {item.status !== 'archived' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'archived')}
                            className="p-1.5 text-[#6b6b6b] hover:text-yellow-500 hover:bg-[#333] rounded transition-colors"
                            title="Архівувати"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-[#6b6b6b] hover:text-red-500 hover:bg-[#333] rounded transition-colors"
                          title="Видалити"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 md:px-6 py-3 border-t border-[#3d3d3d] bg-[#252525] text-sm text-[#6b6b6b]">
        Showing {sortedItems.length} of {items.length} items
      </div>
    </div>
  );
};

export default CollectionPage;
