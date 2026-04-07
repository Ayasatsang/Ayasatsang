import { useState } from "react";

interface StatusItem {
  id: number;           // наскрізний номер 1–20
  pdfRef: string;       // номер як у PDF: "Головна.1", "Події.2"
  page: string;         // PDF сторінка: "Головна", "Книги", etc.
  title: string;
  description?: string;
  status: "done" | "pending";
}

// ═══════════════════════════════════════════
// ПРАВКИ — точний порядок як у PDF клієнта
// PDF page 1-2: Головна → page 3: Книги →
// page 5: Відео → page 6: Події →
// page 7: Статті → page 8-9: Академія
// ═══════════════════════════════════════════
const items: StatusItem[] = [
  // ── PDF стор. 1-2: Головна (Desktop) ──
  { id: 1,  pdfRef: "Головна.1", page: "Головна", title: "Завеликий відступ від героїні до Потоки", description: "На 16\" екрані занадто великий gap", status: "pending" },
  { id: 2,  pdfRef: "Головна.2", page: "Головна", title: "Кристали знову поплили", description: "Зафіксувати позицію кристалів біля соц. мереж", status: "done" },
  { id: 3,  pdfRef: "Головна.3", page: "Головна", title: "Якщо немає локації — не показувати іконку", description: "EventSlider на головній: ховати location коли пуста", status: "done" },
  { id: 4,  pdfRef: "Головна.4", page: "Головна", title: "Академія секція: контент через CMS", description: "Міняти інфу в редакторі не зручно, треба через CMS", status: "done" },
  { id: 5,  pdfRef: "Головна.5", page: "Головна", title: "Академія секція: шрифти Lora 28px, body 18px", description: "Заголовки Lora 28px, body тексту 18px", status: "done" },
  { id: 6,  pdfRef: "Головна.6", page: "Головна", title: "Медитації/Книги — верстка картинок інша", description: "В останніх двох блоках верстка відрізняється", status: "done" },
  { id: 7,  pdfRef: "Головна.7", page: "Головна", title: "Як видалити Медитації (2 карточки)", description: "UX: як керувати кількістю блоків на головній", status: "pending" },

  // ── PDF стор. 4-5: Книги ──
  { id: 8,  pdfRef: "Книги.1", page: "Книги", title: "Аудіодоріжка на превью — плеєр працює", description: "Підключити реальне аудіо до плеєра", status: "done" },
  { id: 9,  pdfRef: "Книги.2", page: "Книги", title: "Дівчина має бути над текстом", description: "Зображення над текстовим контентом", status: "done" },
  { id: 10, pdfRef: "Книги.3", page: "Книги", title: "Дуже швидко рухається", description: "Сповільнити анімацію руху", status: "done" },

  // ── PDF стор. 5-6: Відео ──
  { id: 11, pdfRef: "Відео.1", page: "Відео", title: "Міняємо іконку play", description: "Замінити на іконку з Figma (node-id=1023-715)", status: "done" },
  { id: 12, pdfRef: "Відео.2", page: "Відео", title: "Колір обводки #D4DFF2", description: "Змінити border color відео карток", status: "done" },

  // ── PDF стор. 6: Події ──
  { id: 13, pdfRef: "Події.1", page: "Події", title: "Обводка занадто жирна", description: "border 2rem → 1rem", status: "done" },
  { id: 14, pdfRef: "Події.2", page: "Події", title: "Якщо немає локації — не показуємо іконку", description: "Ховати іконку location коли пуста в CMS", status: "done" },

  // ── PDF стор. 7: Статті ──
  { id: 15, pdfRef: "Статті.1", page: "Статті", title: "Жирність обводки менше", description: "border 2rem → 1rem", status: "done" },
  { id: 16, pdfRef: "Статті.2", page: "Статті", title: "Прибрати теги зі статей", description: "Теги залишимо тільки на подіях", status: "done" },

  // ── PDF стор. 8-9: Академія ──
  { id: 17, pdfRef: "Академія.1", page: "Академія", title: "Жирна обводка", description: "border 2rem → 1rem", status: "done" },
  { id: 18, pdfRef: "Академія.2", page: "Академія", title: "Забрати дату з академії", description: "Дата не потрібна на картках", status: "done" },
  { id: 19, pdfRef: "Академія.3", page: "Академія", title: "Багато пустого місця / додати теги", description: "Якщо мали бути теги — взяти з головної", status: "done" },
  { id: 20, pdfRef: "Академія.4", page: "Академія", title: "Колір карточок — золотистий", description: "Не синій, а золотистий як на головній", status: "done" },

  // ── Мобільна версія ──
  { id: 21, pdfRef: "Мобілка.1", page: "Мобілка", title: "Мобільне меню — повна ширина, бургер→хрестик", description: "Меню на весь екран, анімований бургер/X, хмарка не обрізана, колір X видимий", status: "done" },
  { id: 22, pdfRef: "Мобілка.2", page: "Мобілка", title: "Хедер — однаковий відступ зверху і знизу", description: "padding: 10rem 0 замість тільки paddingTop", status: "done" },
  { id: 23, pdfRef: "Мобілка.3", page: "Мобілка", title: "Соц. картки — однаковий відступ між елементами", description: "Прибрано justify-between на мобільному, gap 16rem між заголовком/описом/кнопкою", status: "done" },
  { id: 24, pdfRef: "Мобілка.4", page: "Мобілка", title: "Прибрати теги з подій на мобілці", description: "hidden lg:flex — теги видимі тільки на десктопі", status: "done" },
  { id: 25, pdfRef: "Мобілка.5", page: "Мобілка", title: "Зайвий відступ знизу в картках подій", description: "Прибрано min-height і justify-between на мобільному", status: "done" },
  { id: 26, pdfRef: "Мобілка.6", page: "Мобілка", title: "Dots слайдера подій ближче до картки", description: "margin-top: 5rem на мобільному", status: "done" },
  { id: 27, pdfRef: "Мобілка.7", page: "Мобілка", title: "Академії: картинка більша, заголовок 24px, теги прибрані", description: "aspect-ratio замість фіксованої висоти, Lora 24px/26.77, hidden lg:flex для тегів", status: "done" },
  { id: 28, pdfRef: "Мобілка.8", page: "Мобілка", title: "Section title 54px + Айа провідник в 2 рядки", description: "font-size 46rem для academies, дівчина ближче до тексту (margin-top: -20rem)", status: "done" },
  { id: 29, pdfRef: "Мобілка.9", page: "Мобілка", title: "Медитації та Книги — горизонтальний лейаут", description: "block-card flex-direction: row на мобільному, картинка зліва текст справа", status: "done" },
  { id: 30, pdfRef: "Мобілка.10", page: "Мобілка", title: "Кнопка 'Переглянути всі відгуки'", description: "Додано btn-gold з лінком на /reviews після секції відгуків", status: "done" },
  { id: 31, pdfRef: "Мобілка.11", page: "Мобілка", title: "Футер — прибрана дирка між контентом і кристалами", description: "Зменшено padding/margin в footer і reviews секції на мобільному", status: "done" },

  // ── Нові правки ──
  { id: 32, pdfRef: "Загальне.1", page: "Загальне", title: "Прибрані переноси в підписі 'З Любов'ю, Айа'", description: "Видалено <br /> — текст тепер йде суцільно на Books, Meditations, Reviews, MeditationBlock", status: "done" },
  { id: 33, pdfRef: "Книги.4", page: "Книги", title: "Текст вилазив за контейнер на мобільному", description: "Аудіо-плеєр: width 520rem → 100%/maxWidth 520rem, текстова колонка: minWidth 0 + overflow hidden", status: "done" },
  { id: 34, pdfRef: "Загальне.2", page: "Загальне", title: "Заголовки розділів 32px на мобільному", description: "page-hero-title на ≤480px: 36px → 32px", status: "done" },
];

const Status = () => {
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  const filtered = items.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false;
    return true;
  });

  const doneCount = items.filter((i) => i.status === "done").length;
  const total = items.length;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // Find next pending task
  const nextTask = items.find((i) => i.status === "pending");

  return (
    <div className="status-root min-h-screen bg-gray-950 text-gray-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Статус правок — AYA Edits</h1>
          <p className="text-gray-400 text-sm">Порядок правок як у PDF від клієнта</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Прогрес</span>
            <span className="text-gray-300 font-medium">
              {doneCount} / {total} ({percent}%)
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Next task indicator */}
        {nextTask && (
          <div className="mb-6 p-3 rounded-lg border border-amber-800/40 bg-amber-950/20">
            <span className="text-xs text-amber-400 font-medium">Наступна правка:</span>
            <span className="text-sm text-amber-200 ml-2">#{nextTask.id} {nextTask.pdfRef} — {nextTask.title}</span>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "pending", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:text-gray-200"
              }`}
            >
              {f === "all" ? `Всі (${total})` : f === "pending" ? `В роботі (${total - doneCount})` : `Готово (${doneCount})`}
            </button>
          ))}
        </div>

        {/* Items — flat list, PDF order */}
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                item.status === "done"
                  ? "bg-emerald-950/20 border-emerald-800/30"
                  : item.id === nextTask?.id
                    ? "bg-amber-950/10 border-amber-800/30"
                    : "bg-gray-900/50 border-gray-800/50"
              }`}
            >
              {/* Number */}
              <span className={`text-xs font-mono mt-0.5 w-6 text-right flex-shrink-0 ${item.status === "done" ? "text-emerald-600" : "text-gray-600"}`}>
                {item.id}
              </span>

              {/* Status indicator */}
              <div className="mt-0.5 flex-shrink-0">
                {item.status === "done" ? (
                  <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded border-2 border-gray-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 flex-shrink-0 font-mono">
                    {item.pdfRef}
                  </span>
                  <span className={`text-sm font-medium ${item.status === "done" ? "line-through text-gray-500" : "text-gray-100"}`}>
                    {item.title}
                  </span>
                </div>
                {item.description && (
                  <p className={`text-xs mt-1 ${item.status === "done" ? "text-gray-600" : "text-gray-400"}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
