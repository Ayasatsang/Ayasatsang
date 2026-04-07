# Aya Cloud Canvas

Персональний вебсайт для духовного наставника **Айа** — лендінг з інформацією про курси, медитації, книги, події та соціальні мережі. Візуальний стиль: "мрійливе небо" з хмарами, градієнтами та м'якими анімаціями..

---

## Tech Stack

### Core
- **Vite** `5.4.x` — збірка та dev-сервер
- **React** `18.3.x` — UI бібліотека
- **TypeScript** `5.8.x` — типізація
- **React Router DOM** `6.30.x` — маршрутизація

### Styling
- **Tailwind CSS** `3.4.x` — утилітарні класи
- **tailwindcss-animate** — анімації
- **class-variance-authority (CVA)** — варіанти компонентів
- **clsx** + **tailwind-merge** — об'єднання класів (`cn()` утиліта)

### UI Components
- **shadcn/ui** — базові компоненти (Button, Dialog, Card, etc.)
- **Radix UI** — примітиви для доступності
- **Lucide React** — іконки

### Data & Forms
- **TanStack React Query** `5.x` — серверний стан
- **React Hook Form** + **Zod** — форми та валідація
- **Zustand** — стейт менеджмент для CMS

### CMS & Database
- **Supabase** — PostgreSQL база даних
- **TipTap** — Rich Text Editor

### Інші бібліотеки
- **date-fns** — робота з датами
- **recharts** — графіки
- **embla-carousel-react** — карусель
- **sonner** — toast-повідомлення
- **vaul** — drawer компонент

### Dev Tools
- **ESLint** `9.x` — лінтинг

---

## Структура папок

```
aya.-cloud-canvas/
├── public/
│   └── images/           # Статичні зображення (logo, bg, photos)
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui компоненти (НЕ РЕДАГУВАТИ!)
│   │   ├── Header.tsx    # Шапка з навігацією
│   │   ├── Cloud.tsx     # Компонент хмари
│   │   ├── NavLink.tsx   # Навігаційне посилання
│   │   ├── EventSlider.tsx  # Слайдер подій
│   │   └── ScrollToTop.tsx  # Скрол вгору при зміні роута
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Детект мобільного пристрою
│   │   └── use-toast.ts     # Toast хук
│   ├── lib/
│   │   └── utils.ts      # Утиліта cn() для класів
│   ├── pages/
│   │   ├── Index.tsx     # Головна сторінка (лендінг)
│   │   ├── Academy.tsx   # Список матеріалів академії
│   │   ├── AcademyPost.tsx # Окремий матеріал академії
│   │   ├── Articles.tsx  # Список статей
│   │   ├── Article.tsx   # Окрема стаття
│   │   ├── Books.tsx     # Книги
│   │   ├── Events.tsx    # Події
│   │   ├── Meditations.tsx  # Медитації
│   │   ├── Reviews.tsx   # Відгуки
│   │   ├── Streams.tsx   # Потоки
│   │   ├── Videos.tsx    # Відео
│   │   ├── Privacy.tsx   # Політика конфіденційності
│   │   └── NotFound.tsx  # 404 сторінка
│   ├── admin/            # CMS Admin Panel
│   │   ├── AdminLayout.tsx       # Головний layout
│   │   ├── components/
│   │   │   ├── layout/           # AdminTopBar, CollectionsSidebar
│   │   │   ├── table/            # StatusBadge
│   │   │   └── editor/fields/    # TextField, RichTextField, etc.
│   │   ├── hooks/
│   │   │   └── useAdminStore.ts  # Zustand store + Supabase
│   │   ├── config/
│   │   │   ├── collections.ts    # Конфігурація колекцій
│   │   │   └── theme.ts          # Dark theme кольори
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CollectionPage.tsx
│   │   │   └── ItemEditPage.tsx
│   │   └── types/
│   │       └── index.ts          # TypeScript інтерфейси
│   ├── lib/
│   │   ├── utils.ts      # Утиліта cn() для класів
│   │   └── supabase.ts   # Supabase клієнт
│   ├── App.tsx           # Кореневий компонент з роутами
│   ├── main.tsx          # Точка входу
│   └── index.css         # Глобальні стилі + Tailwind
├── supabase/
│   └── schema.sql        # SQL схема бази даних
├── .env                  # Supabase credentials (в .gitignore)
├── components.json       # shadcn/ui конфігурація
├── tailwind.config.ts    # Tailwind + AYA Design System
├── vite.config.ts        # Vite конфігурація
├── eslint.config.js      # ESLint правила
└── tsconfig.json         # TypeScript конфігурація
```

---

## Code Style

### Загальні правила
- **Функціональні компоненти** з arrow functions: `const Component = () => { ... }`
- **Default export** для сторінок та компонентів
- **Named exports** для типів та утиліт
- **Імпорт з alias** `@/` замість відносних шляхів: `import { cn } from "@/lib/utils"`

### TypeScript
- Строга типізація
- `@typescript-eslint/no-unused-vars` вимкнено (для зручності розробки)
- Типи для пропсів: `interface ComponentProps extends React.HTMLAttributes<HTMLElement>`

### Стилізація
- **Inline styles з `rem` одиницями** для пікселів з Figma (система fluid scaling)
- **Tailwind класи** для layout та типових стилів
- **CSS змінні** для кольорів через HSL: `hsl(var(--primary))`
- Утиліта `cn()` для об'єднання класів: `className={cn("base-class", condition && "conditional-class")}`

### Система одиниць (Fluid Scaling)
```css
/* 1rem = 1px при 1440px екрані */
/* Значення з Figma копіюються напряму в rem */
style={{ width: '306rem', padding: '32rem' }}
```

### Компоненти
- **shadcn/ui** компоненти в `src/components/ui/` — НЕ редагувати напряму
- Кастомні компоненти в `src/components/`
- Сторінки в `src/pages/`

### Анімації
- CSS класи для анімацій: `.hero-animate`, `.scroll-animate`, `.card-hover`
- Intersection Observer для scroll-triggered анімацій

---

## Команди

```bash
# Розробка
npm run dev         # Запуск dev-сервера (порт 8080)

# Збірка
npm run build       # Production збірка
npm run build:dev   # Development збірка

# Лінтинг
npm run lint        # Перевірка ESLint

# Прев'ю
npm run preview     # Перегляд production збірки
```

---

## Важливі конвенції

### Design System (AYA)
Кольори, шрифти та розміри визначені в `tailwind.config.ts`:

**Шрифти:**
- `font-display` (Marck Script) — заголовки секцій, декоративний текст
- `font-serif` (Lora) — підзаголовки, карточки
- `font-sans` (Inter) — навігація, кнопки, body

**Кольори:**
- `aya-primary`, `aya-sky`, `aya-cyan` — основна палітра
- `aya-gold`, `aya-gold-light` — акценти (CTA кнопки)
- Градієнти: `from-[#E8F4FC] to-[#D4E9F7]` — фон секцій

### Маршрутизація
Всі роути визначені в `App.tsx`. Кастомні роути додавати **перед** catch-all `*`:
```tsx
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
<Route path="*" element={<NotFound />} />
```

### Зображення
- Статичні зображення в `/public/images/`
- Шлях в коді: `/images/filename.png` (без `public`)
- Fallback для зображень через `onError`:
```tsx
onError={(e) => {
  (e.target as HTMLImageElement).src = 'https://placehold.co/...';
}}
```

### Responsive Design
- Mobile-first підхід через Tailwind breakpoints
- `lg:` — показати на desktop (>1024px)
- `hidden lg:flex` — сховати на мобільному
- Fluid scaling автоматично адаптує розміри

### SVG іконки
Соціальні іконки вбудовані як inline SVG для контролю кольору:
```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
  <path d="..."/>
</svg>
```

---

## Admin Panel (CMS)

Адмін-панель для керування контентом сайту. Dark theme UI, натхненний Webflow CMS.

### Доступ
```
URL: /admin
```

### Роути
```
/admin                    → Dashboard
/admin/:collection        → Список елементів колекції
/admin/:collection/new    → Створення нового елементу
/admin/:collection/:id    → Редагування елементу
```

### Колекції

| Колекція | Slug | Опис |
|----------|------|------|
| Events | `events` | Події, семінари |
| Articles | `articles` | Статті блогу |
| Academy | `academy` | Матеріали академії |
| Meditations | `meditations` | Медитації з аудіо |
| Books | `books` | Книги |
| Videos | `videos` | Відео матеріали |
| Reviews | `reviews` | Відгуки клієнтів |
| Tags | `tags` | Теги (reference) |
| Authors | `authors` | Автори (reference) |

### Supabase Setup

**ВАЖЛИВО:** Перед використанням CMS потрібно виконати SQL схему в Supabase:

1. Зайти в [Supabase Dashboard](https://supabase.com/dashboard)
2. Відкрити проєкт → SQL Editor
3. Виконати вміст файлу `supabase/schema.sql`

### Environment Variables
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Store (Zustand)

```typescript
import { useAdminStore } from '@/admin/hooks/useAdminStore';

// У компоненті
const { events, addItem, updateItem, deleteItem, fetchCollection } = useAdminStore();

// Отримання published items для публічних сторінок
import { usePublishedEvents } from '@/admin/hooks/useAdminStore';
const publishedEvents = usePublishedEvents();
```

### Типи контенту

```typescript
type ContentStatus = 'draft' | 'published' | 'archived';

interface BaseContent {
  id: string;
  slug: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}
```

### Поля форми (Editor Fields)

Доступні типи полів:
- `text` — однорядковий текст
- `textarea` — багаторядковий текст
- `richtext` — TipTap Rich Text Editor
- `date` — вибір дати
- `slug` — auto-generated slug
- `image` — URL зображення з превью
- `select` — вибір одного варіанту
- `multiselect` — вибір кількох варіантів
- `number` — числове поле
- `color` — вибір кольору

### Конфігурація колекцій

Всі колекції налаштовані в `src/admin/config/collections.ts`:

```typescript
export const collections: Record<CollectionName, CollectionConfig> = {
  events: {
    name: 'events',
    slug: 'events',
    singularName: 'Event',
    pluralName: 'Events',
    icon: '📅',
    color: '#f59e0b',
    fields: [...],
    tableColumns: ['title', 'date', 'status', 'updatedAt'],
  },
  // ...
};
```

---

## 🔐 Безпека: Аутентифікація та RLS

### Аутентифікація (РЕАЛІЗОВАНО)

Адмін-панель захищена авторизацією через Supabase Auth.

**Файли:**
- `src/admin/hooks/useAuth.ts` — хук авторизації (signIn, signOut, session)
- `src/admin/pages/LoginPage.tsx` — сторінка входу
- `src/admin/components/ProtectedRoute.tsx` — захист роутів

**Роути:**
```
/admin/login    → Сторінка входу
/admin/*        → Захищені роути (потребують авторизації)
```

**Створення адміна:**
1. Supabase Dashboard → Authentication → Users → Add user
2. Email + Password
3. Auto Confirm: Yes

---

### RLS Політики

RLS налаштовано на всіх таблицях:
- **anon** — тільки SELECT для published контенту
- **authenticated** — повний CRUD доступ

---

## Правила для колекцій (CMS)

### Картки колекцій
**ОБОВ'ЯЗКОВО:** Всі картки колекцій (events, articles, meditations, books, videos, reviews) повинні мати посилання на детальну сторінку:

```tsx
// Приклад картки статті
<Link to={`/articles/${article.slug}`} className="card-hover">
  <img src={article.image} alt={article.title} />
  <h3>{article.title}</h3>
  <p>{article.description}</p>
</Link>
```

**Шаблон URL для колекцій:**
| Колекція | Список | Детальна сторінка |
|----------|--------|-------------------|
| Events | `/events` | `/events/:slug` |
| Articles | `/articles` | `/articles/:slug` |
| Academy | `/academy` | `/academy/:slug` |
| Meditations | `/meditations` | `/meditations/:slug` |
| Books | `/books` | `/books/:slug` |
| Videos | `/videos` | `/videos/:slug` |
| Reviews | `/reviews` | — (без детальної) |

---

## Корисні посилання

- [shadcn/ui Docs](https://ui.shadcn.com/) — документація компонентів
- [Tailwind CSS](https://tailwindcss.com/docs) — довідник класів
- [Supabase Docs](https://supabase.com/docs) — документація бази даних
