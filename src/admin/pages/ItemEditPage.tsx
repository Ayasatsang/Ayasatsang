import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Save, Trash2, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCollectionConfig } from '../config/collections';
import { useAdminStore } from '../hooks/useAdminStore';
import StatusBadge from '../components/table/StatusBadge';
import TextField from '../components/editor/fields/TextField';
import TextareaField from '../components/editor/fields/TextareaField';
import DateField from '../components/editor/fields/DateField';
import SlugField from '../components/editor/fields/SlugField';
import ImageField from '../components/editor/fields/ImageField';
import SelectField from '../components/editor/fields/SelectField';
import MultiSelectField from '../components/editor/fields/MultiSelectField';
import RichTextField from '../components/editor/fields/RichTextField';
import type { CollectionName, ContentStatus, CollectionField } from '../types';

const ItemEditPage = () => {
  const { collection, id } = useParams<{ collection: string; id?: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const config = getCollectionConfig(collection || '');
  const { addItem, updateItem, deleteItem, getItem, fetchCollection, tags, authors } = useAdminStore();

  // Check if collection has status field
  const hasStatusField = config?.fields.some(f => f.name === 'status');

  const [formData, setFormData] = useState<Record<string, any>>(
    hasStatusField ? { status: 'draft' } : {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Fetch reference collections (tags, authors)
  useEffect(() => {
    fetchCollection('tags');
    fetchCollection('authors');
  }, [fetchCollection]);

  // Fetch and load existing item
  useEffect(() => {
    const loadItem = async () => {
      if (!isNew && config && id) {
        setIsLoading(true);
        // Fetch the collection first
        await fetchCollection(config.name as CollectionName);
        const item = getItem(config.name as CollectionName, id);
        if (item) {
          setFormData(item as Record<string, any>);
        }
        setIsLoading(false);
      }
    };
    loadItem();
  }, [id, isNew, config?.name, fetchCollection]);

  if (!config) {
    return (
      <div className="flex items-center justify-center h-full text-[#a0a0a0]">
        Колекцію не знайдено
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const statusLabels: Record<ContentStatus, string> = {
    draft: 'Чернетка',
    published: 'Опубліковано',
    archived: 'Архів',
  };

  const handleSave = async (status?: ContentStatus) => {
    setIsSaving(true);
    try {
      const finalStatus = status || formData.status || 'draft';
      const dataToSave = {
        ...formData,
        ...(hasStatusField && { status: finalStatus }),
      };

      if (isNew) {
        const newId = await addItem(config.name as CollectionName, dataToSave as any);
        if (newId) {
          toast.success('Створено');
          navigate(`/admin/${config.slug}/${newId}`);
        } else {
          const storeError = useAdminStore.getState().error;
          toast.error(storeError || 'Не вдалося створити');
        }
      } else {
        const success = await updateItem(config.name as CollectionName, id!, dataToSave);
        if (success) {
          if (status) {
            setFormData(prev => ({ ...prev, status: finalStatus }));
            toast.success(`Статус: ${statusLabels[finalStatus as ContentStatus]}`);
          } else {
            toast.success('Збережено');
          }
        } else {
          const storeError = useAdminStore.getState().error;
          toast.error(storeError || 'Помилка збереження');
        }
      }
    } catch (err: any) {
      toast.error(err?.message || 'Щось пішло не так');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Видалити цей елемент?')) {
      const success = await deleteItem(config.name as CollectionName, id!);
      if (success) {
        toast.success('Видалено');
        navigate(`/admin/${config.slug}`);
      } else {
        toast.error('Не вдалося видалити');
      }
    }
  };

  const handlePublish = () => {
    setShowStatusMenu(false);
    handleSave('published');
  };

  const handleUnpublish = () => {
    setShowStatusMenu(false);
    handleSave('draft');
  };

  const handleArchive = () => {
    setShowStatusMenu(false);
    handleSave('archived');
  };

  // Group fields by section
  const fieldsBySection = config.fields.reduce((acc, field) => {
    const section = field.section || 'basic';
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {} as Record<string, CollectionField[]>);

  const renderField = (field: CollectionField) => {
    const value = formData[field.name];

    const commonProps = {
      label: field.label,
      value: value,
      onChange: (val: any) => handleFieldChange(field.name, val),
      required: field.required,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'text':
        return <TextField key={field.name} {...commonProps} />;

      case 'textarea':
        return <TextareaField key={field.name} {...commonProps} />;

      case 'richtext':
        return <RichTextField key={field.name} {...commonProps} />;

      case 'date':
        return <DateField key={field.name} {...commonProps} />;

      case 'slug':
        return (
          <SlugField
            key={field.name}
            {...commonProps}
            sourceValue={formData[field.generateFrom || 'title']}
          />
        );

      case 'image':
        return <ImageField key={field.name} {...commonProps} />;

      case 'select':
        if (field.referenceCollection === 'authors') {
          return (
            <SelectField
              key={field.name}
              {...commonProps}
              options={authors.map((a) => ({ value: a.id, label: a.name }))}
            />
          );
        }
        return (
          <SelectField
            key={field.name}
            {...commonProps}
            options={field.options || []}
          />
        );

      case 'multiselect':
        if (field.referenceCollection === 'tags') {
          return (
            <MultiSelectField
              key={field.name}
              {...commonProps}
              options={tags.map((t) => ({ value: t.id, label: t.name }))}
              max={field.max}
            />
          );
        }
        return (
          <MultiSelectField
            key={field.name}
            {...commonProps}
            options={field.options || []}
            max={field.max}
          />
        );

      case 'number':
        return (
          <TextField
            key={field.name}
            {...commonProps}
            type="number"
          />
        );

      case 'color':
        return (
          <TextField
            key={field.name}
            {...commonProps}
            type="color"
          />
        );

      case 'toggle':
        return (
          <div key={field.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div
                onClick={() => handleFieldChange(field.name, !value)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  background: value ? '#6ab4ff' : '#3a3a3a',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: value ? '22px' : '2px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s',
                }} />
              </div>
              <span style={{ fontSize: '14px', color: '#c0c0c0' }}>{field.label}</span>
            </label>
          </div>
        );

      default:
        return <TextField key={field.name} {...commonProps} />;
    }
  };

  const sectionLabels: Record<string, string> = {
    basic: 'Basic info',
    content: 'Content',
    meta: 'SEO / Meta',
    settings: 'Settings',
  };

  const getTitleValue = () => {
    const titleField = config.fields.find(f => f.name === 'title' || f.name === 'name' || f.name === 'authorName');
    return formData[titleField?.name || 'title'] || 'Untitled';
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#3d3d3d] bg-[#252525] flex items-center gap-4">
        <Link
          to={`/admin/${config.slug}`}
          className="p-2 text-[#a0a0a0] hover:text-white hover:bg-[#333] rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <h1 className="text-lg font-medium flex-1 truncate">
          {isNew ? `New ${config.singularName}` : getTitleValue()}
        </h1>

        {!isNew && <StatusBadge status={formData.status || 'draft'} />}

        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              onClick={handleDelete}
              className="p-2 text-[#a0a0a0] hover:text-red-500 hover:bg-[#333] rounded-md transition-colors"
              title="Видалити"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-[#333] hover:bg-[#444] text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Зберегти</span>
          </button>

          {formData.status !== 'published' ? (
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span>Опублікувати</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                disabled={isSaving}
                className="flex items-center gap-2 px-3 py-2 bg-[#333] hover:bg-[#444] text-[#a0a0a0] rounded-md text-sm transition-colors disabled:opacity-50"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {showStatusMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md shadow-lg z-10">
                  <button
                    onClick={handleUnpublish}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#333] flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                    Зняти з публікації
                  </button>
                  <button
                    onClick={handleArchive}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#333] flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-yellow-500" />
                    Архівувати
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 overflow-auto p-6 pb-40">
        <div className="max-w-3xl mx-auto space-y-8">
          {Object.entries(fieldsBySection).map(([section, fields]) => (
            <div key={section} className="space-y-4">
              <h2 className="text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">
                {sectionLabels[section] || section}
              </h2>
              <div className="space-y-4">
                {fields
                  .filter((f) => f.name !== 'status')
                  .map(renderField)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemEditPage;
