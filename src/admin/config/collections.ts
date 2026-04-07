import type { CollectionConfig } from '../types';

export const collections: CollectionConfig[] = [
  // ============================================
  // Events
  // ============================================
  {
    name: 'events',
    singularName: 'Подія',
    pluralName: 'Події',
    icon: 'Calendar',
    slug: 'events',
    fields: [
      { name: 'title', type: 'text', label: 'Назва', required: true, section: 'basic', placeholder: 'Введіть назву події' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'description', type: 'textarea', label: 'Короткий опис', section: 'basic', placeholder: 'Опис для картки' },
      { name: 'image', type: 'image', label: 'Зображення', required: true, section: 'content' },
      { name: 'content', type: 'richtext', label: 'Детальний опис', section: 'content' },
      { name: 'date', type: 'date', label: 'Дата', required: true, section: 'basic' },
      { name: 'time', type: 'text', label: 'Час', section: 'basic', placeholder: '20:00' },
      { name: 'format', type: 'text', label: 'Формат', section: 'basic', placeholder: 'Онлайн / офлайн' },
      { name: 'location', type: 'text', label: 'Локація', section: 'basic', placeholder: 'Київ, Україна' },
      { name: 'quote', type: 'textarea', label: 'Цитата', section: 'content', placeholder: 'Важливо не питати себе: «Ким я маю бути?»' },
      { name: 'tags', type: 'multiselect', label: 'Теги', referenceCollection: 'tags', section: 'settings', max: 2 },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['title', 'date', 'time', 'format', 'status', 'updatedAt'],
    defaultSort: '-date',
  },

  // ============================================
  // Articles
  // ============================================
  {
    name: 'articles',
    singularName: 'Стаття',
    pluralName: 'Статті',
    icon: 'FileText',
    slug: 'articles',
    fields: [
      { name: 'title', type: 'text', label: 'Заголовок', required: true, section: 'basic', placeholder: 'Введіть заголовок' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'description', type: 'textarea', label: 'Анонс', section: 'basic', placeholder: 'Короткий опис для картки' },
      { name: 'image', type: 'image', label: 'Головне зображення', required: true, section: 'content' },
      { name: 'content', type: 'richtext', label: 'Контент', required: true, section: 'content' },
      { name: 'date', type: 'date', label: 'Дата публікації', required: true, section: 'basic' },
      { name: 'tags', type: 'multiselect', label: 'Теги', referenceCollection: 'tags', section: 'settings' },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['title', 'date', 'status', 'updatedAt'],
    defaultSort: '-date',
  },

  // ============================================
  // Academy
  // ============================================
  {
    name: 'academy',
    singularName: 'Матеріал Академії',
    pluralName: 'Академія',
    icon: 'GraduationCap',
    slug: 'academy',
    fields: [
      { name: 'title', type: 'text', label: 'Заголовок', required: true, section: 'basic', placeholder: 'Введіть заголовок' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'description', type: 'textarea', label: 'Анонс', section: 'basic', placeholder: 'Короткий опис для картки' },
      { name: 'image', type: 'image', label: 'Головне зображення', required: true, section: 'content' },
      { name: 'content', type: 'richtext', label: 'Контент', required: true, section: 'content' },
      { name: 'date', type: 'date', label: 'Дата публікації', required: true, section: 'basic' },
      { name: 'author', type: 'select', label: 'Автор', referenceCollection: 'authors', section: 'settings' },
      { name: 'tags', type: 'multiselect', label: 'Теги', referenceCollection: 'tags', section: 'settings' },
      { name: 'showOnIndex', type: 'toggle', label: 'Показувати на головній сторінці', section: 'settings' },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['title', 'date', 'author', 'status', 'updatedAt'],
    defaultSort: '-date',
  },

  // ============================================
  // Meditation Blocks
  // ============================================
  {
    name: 'meditation_blocks',
    singularName: 'Блок медитацій',
    pluralName: 'Блоки медитацій',
    icon: 'Heart',
    slug: 'meditation-blocks',
    fields: [
      { name: 'blockNumber', type: 'number', label: 'Номер блоку', required: true, section: 'basic' },
      { name: 'title', type: 'text', label: 'Назва', required: true, section: 'basic', placeholder: 'ПРОБУДЖЕННЯ' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'image', type: 'image', label: 'Зображення', required: true, section: 'content' },
      { name: 'duration', type: 'text', label: 'Тривалість', section: 'basic', placeholder: '30:41 хв' },
      { name: 'accessUrl', type: 'text', label: 'Посилання для доступу', section: 'content', placeholder: 'https://...' },
      { name: 'order', type: 'number', label: 'Порядок', section: 'settings' },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['blockNumber', 'title', 'duration', 'status', 'updatedAt'],
    defaultSort: 'order',
  },

  // ============================================
  // Books
  // ============================================
  {
    name: 'books',
    singularName: 'Книга',
    pluralName: 'Книги',
    icon: 'Book',
    slug: 'books',
    fields: [
      { name: 'title', type: 'text', label: 'Назва', required: true, section: 'basic', placeholder: 'Назва книги' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'subtitle', type: 'text', label: 'Підзаголовок', section: 'basic' },
      { name: 'description', type: 'richtext', label: 'Опис', section: 'content' },
      { name: 'coverImage', type: 'image', label: 'Обкладинка', required: true, section: 'content' },
      { name: 'format', type: 'select', label: 'Формат', section: 'settings', options: [
        { value: 'audio', label: 'Аудіо' },
        { value: 'print', label: 'Друкована' },
        { value: 'both', label: 'Обидва' },
      ]},
      { name: 'audioSampleUrl', type: 'text', label: 'URL аудіо зразка', section: 'content' },
      { name: 'purchaseUrl', type: 'text', label: 'URL для покупки', section: 'settings' },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['title', 'format', 'status', 'updatedAt'],
    defaultSort: '-createdAt',
  },

  // ============================================
  // Videos
  // ============================================
  {
    name: 'videos',
    singularName: 'Відео',
    pluralName: 'Відео',
    icon: 'Video',
    slug: 'videos',
    fields: [
      { name: 'title', type: 'text', label: 'Назва', required: true, section: 'basic', placeholder: 'Назва відео' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'title' },
      { name: 'videoUrl', type: 'text', label: 'YouTube посилання', required: true, section: 'basic', placeholder: 'https://youtu.be/...' },
      { name: 'coverImage', type: 'image', label: 'Обкладинка', section: 'content' },
      { name: 'category', type: 'select', label: 'Категорія', required: true, section: 'basic', options: [
        { value: 'podcasts', label: 'Подкасти' },
        { value: 'meditations', label: 'Медитації, молитви, мантри' },
        { value: 'streams', label: 'Прямі ефіри' },
      ]},
      { name: 'order', type: 'number', label: 'Порядок', section: 'settings' },
      { name: 'metaTitle', type: 'text', label: 'Meta Title', section: 'meta', placeholder: 'SEO заголовок' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Description', section: 'meta', placeholder: 'SEO опис' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['title', 'category', 'status', 'updatedAt'],
    defaultSort: 'order',
  },

  // ============================================
  // Reviews
  // ============================================
  {
    name: 'reviews',
    singularName: 'Відгук',
    pluralName: 'Відгуки',
    icon: 'Star',
    slug: 'reviews',
    fields: [
      { name: 'authorName', type: 'text', label: "Ім'я автора", required: true, section: 'basic', placeholder: 'Анастасія Г.' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'authorName' },
      { name: 'text', type: 'textarea', label: 'Текст відгуку', required: true, section: 'content' },
      { name: 'sunImage', type: 'image', label: 'Зображення сонця', section: 'content' },
      { name: 'rating', type: 'number', label: 'Рейтинг (1-5)', section: 'settings' },
      { name: 'status', type: 'select', label: 'Статус', section: 'settings', options: [
        { value: 'draft', label: 'Чернетка' },
        { value: 'published', label: 'Опубліковано' },
        { value: 'archived', label: 'Архів' },
      ]},
    ],
    tableColumns: ['authorName', 'text', 'rating', 'status', 'updatedAt'],
    defaultSort: '-createdAt',
  },

  // ============================================
  // Tags (Reference Collection)
  // ============================================
  {
    name: 'tags',
    singularName: 'Тег',
    pluralName: 'Теги',
    icon: 'Tag',
    slug: 'tags',
    fields: [
      { name: 'name', type: 'text', label: 'Назва', required: true, section: 'basic', placeholder: 'Назва тегу' },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'name' },
    ],
    tableColumns: ['name', 'slug'],
    defaultSort: 'name',
  },

  // ============================================
  // Authors (Reference Collection)
  // ============================================
  {
    name: 'authors',
    singularName: 'Автор',
    pluralName: 'Автори',
    icon: 'User',
    slug: 'authors',
    fields: [
      { name: 'name', type: 'text', label: "Ім'я", required: true, section: 'basic', placeholder: "Повне ім'я" },
      { name: 'slug', type: 'slug', label: 'URL', required: true, section: 'basic', generateFrom: 'name' },
      { name: 'avatar', type: 'image', label: 'Аватар', section: 'content' },
      { name: 'bio', type: 'textarea', label: 'Біографія', section: 'content' },
    ],
    tableColumns: ['name', 'slug'],
    defaultSort: 'name',
  },
];

// Helper to get collection config by name
export const getCollectionConfig = (name: string): CollectionConfig | undefined => {
  return collections.find((c) => c.name === name || c.slug === name);
};

// Get all collection names
export const getCollectionNames = () => collections.map((c) => c.name);
