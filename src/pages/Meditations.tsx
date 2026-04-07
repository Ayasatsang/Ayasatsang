import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import AyaGuideSection from "@/components/AyaGuideSection";
import { EditorProvider, EditableText, useEditorSafe } from "@/editor";
import { useAdminStore, useMeditationBlocks } from "@/admin/hooks/useAdminStore";
import type { MeditationBlock } from "@/admin/types";
import { Plus, X, Trash2, Edit2 } from 'lucide-react';

// Default block images (fallback)
const defaultBlockImages = [
  '/images/img/Rectangle-8418.png',
  '/images/img/Rectangle-8418-1.png',
  '/images/img/Rectangle-8418-2.png',
  '/images/img/Rectangle-8418-3.png',
  '/images/img/Rectangle-8418-4.png',
  '/images/img/Rectangle-8418-5.png',
];

// ============================================
// Inline Add Block Form
// ============================================
interface InlineBlockFormProps {
  onSave: (data: Partial<MeditationBlock>) => void;
  onCancel: () => void;
  initialData?: Partial<MeditationBlock>;
  nextBlockNumber: number;
}

const InlineBlockForm = ({ onSave, onCancel, initialData, nextBlockNumber }: InlineBlockFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [blockNumber, setBlockNumber] = useState(initialData?.blockNumber || nextBlockNumber);
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [accessUrl, setAccessUrl] = useState(initialData?.accessUrl || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [status, setStatus] = useState<'draft' | 'published'>(
    (initialData?.status as 'draft' | 'published') || 'draft'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      blockNumber,
      duration: duration || undefined,
      accessUrl: accessUrl || undefined,
      image: image || undefined,
      status,
      order: blockNumber,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  };

  return (
    <div
      className="w-full"
      style={{
        padding: '24rem',
        borderRadius: '20rem',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(200,220,245,0.5) 100%)',
        border: '2rem solid rgba(212, 165, 116, 0.6)',
        boxShadow: '0 8rem 32rem rgba(255,255,255,0.3)',
      }}
    >
      <div className="flex justify-between items-center" style={{ marginBottom: '20rem' }}>
        <h4 style={{ fontSize: '18rem', fontWeight: 600, color: '#333' }}>
          {initialData ? 'Редагувати блок' : 'Новий блок медитації'}
        </h4>
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4rem',
          }}
        >
          <X style={{ width: '24rem', height: '24rem', color: '#666' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '16rem' }}>
        <div className="flex" style={{ gap: '16rem' }}>
          <div style={{ flex: '0 0 80rem' }}>
            <label style={{ fontSize: '14rem', color: '#555', display: 'block', marginBottom: '6rem' }}>
              № Блоку
            </label>
            <input
              type="number"
              value={blockNumber}
              onChange={(e) => setBlockNumber(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10rem 12rem',
                borderRadius: '8rem',
                border: '1rem solid rgba(0,0,0,0.2)',
                fontSize: '16rem',
                background: 'rgba(255,255,255,0.8)',
              }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14rem', color: '#555', display: 'block', marginBottom: '6rem' }}>
              Назва
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ПРОБУДЖЕННЯ"
              style={{
                width: '100%',
                padding: '10rem 12rem',
                borderRadius: '8rem',
                border: '1rem solid rgba(0,0,0,0.2)',
                fontSize: '16rem',
                background: 'rgba(255,255,255,0.8)',
              }}
              required
            />
          </div>
        </div>

        <div className="flex" style={{ gap: '16rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14rem', color: '#555', display: 'block', marginBottom: '6rem' }}>
              Тривалість
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30:41 хв"
              style={{
                width: '100%',
                padding: '10rem 12rem',
                borderRadius: '8rem',
                border: '1rem solid rgba(0,0,0,0.2)',
                fontSize: '16rem',
                background: 'rgba(255,255,255,0.8)',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14rem', color: '#555', display: 'block', marginBottom: '6rem' }}>
              Посилання
            </label>
            <input
              type="url"
              value={accessUrl}
              onChange={(e) => setAccessUrl(e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                padding: '10rem 12rem',
                borderRadius: '8rem',
                border: '1rem solid rgba(0,0,0,0.2)',
                fontSize: '16rem',
                background: 'rgba(255,255,255,0.8)',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '14rem', color: '#555', display: 'block', marginBottom: '6rem' }}>
            URL зображення
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/img/Rectangle-8418.png"
            style={{
              width: '100%',
              padding: '10rem 12rem',
              borderRadius: '8rem',
              border: '1rem solid rgba(0,0,0,0.2)',
              fontSize: '16rem',
              background: 'rgba(255,255,255,0.8)',
            }}
          />
        </div>

        <div className="flex items-center" style={{ gap: '16rem' }}>
          <label style={{ fontSize: '14rem', color: '#555' }}>Статус:</label>
          <label className="flex items-center" style={{ gap: '6rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="status"
              value="draft"
              checked={status === 'draft'}
              onChange={() => setStatus('draft')}
            />
            <span style={{ fontSize: '14rem', color: '#555' }}>Чернетка</span>
          </label>
          <label className="flex items-center" style={{ gap: '6rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="status"
              value="published"
              checked={status === 'published'}
              onChange={() => setStatus('published')}
            />
            <span style={{ fontSize: '14rem', color: '#555' }}>Опубліковано</span>
          </label>
        </div>

        <div className="flex justify-end" style={{ gap: '12rem', marginTop: '8rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10rem 24rem',
              borderRadius: '8rem',
              background: 'rgba(0,0,0,0.1)',
              border: 'none',
              color: '#555',
              fontSize: '14rem',
              cursor: 'pointer',
            }}
          >
            Скасувати
          </button>
          <button
            type="submit"
            style={{
              padding: '10rem 24rem',
              borderRadius: '8rem',
              background: 'radial-gradient(circle at 62% 51%, rgba(255, 215, 159, 1) 0%, #E4AC76 100%)',
              border: 'none',
              color: '#fff',
              fontSize: '14rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {initialData ? 'Зберегти' : 'Створити'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================
// Add Block Button (Elementor-style)
// ============================================
interface AddBlockButtonProps {
  onClick: () => void;
  label?: string;
}

const AddBlockButton = ({ onClick, label = 'Додати блок' }: AddBlockButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center"
    style={{
      width: '100%',
      padding: '16rem 24rem',
      borderRadius: '12rem',
      border: '2rem dashed rgba(212, 165, 116, 0.6)',
      background: 'rgba(255,255,255,0.3)',
      color: 'rgba(212, 165, 116, 1)',
      fontSize: '16rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      gap: '8rem',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
      e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.8)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
      e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.6)';
    }}
  >
    <Plus style={{ width: '20rem', height: '20rem' }} />
    {label}
  </button>
);

// ============================================
// Block Card Component
// ============================================
interface BlockCardProps {
  block: MeditationBlock;
  index: number;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BlockCard = ({ block, index, isEditing, onEdit, onDelete }: BlockCardProps) => (
  <div
    className="block-card w-full relative"
    style={{
      padding: '24rem',
      borderRadius: '20rem',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,220,245,0.3) 100%)',
      border: block.status === 'draft' && isEditing
        ? '2rem dashed rgba(255, 180, 0, 0.6)'
        : '1rem solid rgba(255,255,255,0.4)',
    }}
  >
    {/* Edit mode controls */}
    {isEditing && (
      <div
        className="absolute flex"
        style={{ top: '12rem', right: '12rem', gap: '8rem', zIndex: 10 }}
      >
        {block.status === 'draft' && (
          <span
            style={{
              padding: '4rem 10rem',
              borderRadius: '6rem',
              background: 'rgba(255, 180, 0, 0.2)',
              color: '#b38600',
              fontSize: '12rem',
              fontWeight: 500,
            }}
          >
            Чернетка
          </span>
        )}
        <button
          onClick={onEdit}
          style={{
            padding: '6rem',
            borderRadius: '6rem',
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Редагувати"
        >
          <Edit2 style={{ width: '16rem', height: '16rem', color: '#555' }} />
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '6rem',
            borderRadius: '6rem',
            background: 'rgba(255, 100, 100, 0.2)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Видалити"
        >
          <Trash2 style={{ width: '16rem', height: '16rem', color: '#c00' }} />
        </button>
      </div>
    )}

    <img
      src={block.image || defaultBlockImages[index % defaultBlockImages.length]}
      alt={block.title}
      className="block-card-image"
      style={{
        width: '130rem',
        height: '150rem',
        borderRadius: '12rem',
        objectFit: 'cover',
        flexShrink: 0,
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = defaultBlockImages[index % defaultBlockImages.length];
      }}
    />
    <div className="flex flex-col block-card-content" style={{ flex: 1, gap: '8rem' }}>
      <span
        className="font-display italic"
        style={{ fontSize: '24rem', color: 'rgba(212, 165, 116, 0.9)' }}
      >
        {block.blockNumber} Блок
      </span>
      <h3
        style={{
          fontSize: '18rem',
          fontWeight: 600,
          color: '#fff',
          textTransform: 'uppercase',
          lineHeight: '1.3',
        }}
      >
        {block.title}
      </h3>
      <div className="flex items-center block-card-actions" style={{ gap: '16rem', marginTop: '8rem' }}>
        <Link
          to={`/meditations/${block.blockNumber}`}
          className="btn-gold"
          style={{
            padding: '10rem 32rem',
            fontSize: '16rem',
          }}
        >
          Відкрити
        </Link>
        {block.duration && (
          <div className="flex items-center" style={{ gap: '8rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span style={{ fontSize: '16rem', color: '#fff' }}>{block.duration}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

/**
 * Inner content component that uses editor context
 */
const MeditationsContent = () => {
  const { isEditing, isAuthenticated } = useEditorSafe();
  const fetchCollection = useAdminStore((state) => state.fetchCollection);
  const addItem = useAdminStore((state) => state.addItem);
  const updateItem = useAdminStore((state) => state.updateItem);
  const deleteItem = useAdminStore((state) => state.deleteItem);
  const allBlocks = useMeditationBlocks();

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlock, setEditingBlock] = useState<MeditationBlock | null>(null);

  // Fetch meditation blocks on mount
  useEffect(() => {
    fetchCollection('meditation_blocks');
  }, [fetchCollection]);

  // Filter blocks: show all in edit mode, only published otherwise
  const visibleBlocks = isEditing
    ? allBlocks
    : allBlocks.filter((b) => b.status === 'published');

  // Sort blocks by order or blockNumber
  const sortedBlocks = [...visibleBlocks].sort((a, b) => (a.order || a.blockNumber) - (b.order || b.blockNumber));

  // Get next block number for new blocks
  const nextBlockNumber = Math.max(0, ...allBlocks.map((b) => b.blockNumber || 0)) + 1;

  // Handle adding a new block
  const handleAddBlock = async (data: Partial<MeditationBlock>) => {
    const success = await addItem('meditation_blocks', data as any);
    if (success) {
      setShowAddForm(false);
      fetchCollection('meditation_blocks');
    }
  };

  // Handle updating a block
  const handleUpdateBlock = async (data: Partial<MeditationBlock>) => {
    if (!editingBlock) return;
    const success = await updateItem('meditation_blocks', editingBlock.id, data);
    if (success) {
      setEditingBlock(null);
      fetchCollection('meditation_blocks');
    }
  };

  // Handle deleting a block
  const handleDeleteBlock = async (id: string) => {
    if (!confirm('Видалити цей блок медитації?')) return;
    const success = await deleteItem('meditation_blocks', id);
    if (success) {
      fetchCollection('meditation_blocks');
    }
  };

  // Check if we can show inline editing
  const canEdit = isEditing && isAuthenticated;

  return (
    <div className="relative min-h-screen" style={{ background: '#73BEEC', overflow: 'clip' }}>
      <Helmet>
        <title>Медитації | Айа</title>
        <meta name="description" content="Медитації духовного наставника Айа — пробудження, зцілення, гармонія." />
      </Helmet>
      {/* Decorative clouds */}
      <PageClouds variant="full" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="relative z-[2] page-hero">
        {/* Title */}
        <EditableText
          contentKey="meditations.hero.title"
          defaultValue="Медитації"
          as="h1"
          className="text-center font-display italic page-hero-title hero-animate"
          style={{
            marginBottom: '80rem',
          }}
        />

        {/* First Block: Просвітлюючі медитації від АЙИ */}
        <section
          className="mx-auto hero-animate-delay-1"
          style={{
            maxWidth: '1200rem',
            padding: '0 20rem 80rem',
          }}
        >
          <div className="meditation-intro">
            {/* Left column - Text */}
            <div style={{ flex: 1 }}>
              <EditableText
                contentKey="meditations.intro.title"
                defaultValue="Просвітлюючі медитації від АЙИ"
                as="h2"
                className="meditation-intro-title"
                style={{
                  fontSize: '40rem',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  color: '#fff',
                  marginBottom: '32rem',
                }}
              />

              <div
                className="meditation-intro-text"
                style={{
                  fontSize: '16rem',
                  lineHeight: '1.6',
                  color: '#fff',
                }}
              >
                <p style={{ marginBottom: '20rem' }}>
                  Рідні, від усього Серця передаю вам ці глибокі та дієві медитації. Це не просто практики для заспокоєння — це живе енергетичне взаємодіяння: пробудження Серця і Свідомості, очищення, трансформація та наповнення високими енергіями.
                </p>
                <p style={{ marginBottom: '20rem' }}>
                  Ці медитації працюють на глибокому рівні — підтримують внутрішні зміни, зцілення Душі та перехід у світліший стан буття. Це те, що вже відкрилось у мені, і чим я можу з вами поділитися.
                </p>
                <p style={{ marginBottom: '20rem' }}>
                  З любов'ю над цими практиками працювала команда Творців. Ми об'єднали їх у блоки, розмістивши у послідовності зростання вібрацій і розширення Свідомості, щоб шлях був м'яким і гармонійним.
                </p>
                <p style={{ marginBottom: '20rem' }}>
                  Рекомендую проходити блоки по черзі — від першого до шостого. Так практики глибше розкриваються і природно входять у життя. Деякі з них стануть вашими щоденними опорами, а найголовніше — ви налаштуєтесь на своє Серце й почнете творити з нього самостійно.
                </p>
                <p style={{ marginBottom: '20rem' }}>
                  Кожна медитація має вступ і підготовку, тож практикувати можуть навіть ті, хто раніше не мав такого досвіду.
                </p>
                <p>
                  Я супроводжую вас у цих практиках як провідник у простір Свідомості, Любові та Світла.
                </p>
              </div>
            </div>

            {/* Right column - Image */}
            <div
              className="meditation-intro-image"
              style={{
                flex: '0 0 auto',
                width: '480rem',
              }}
            >
              <img
                src="/images/med-hero.png"
                alt="Медитація"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16rem',
                }}
              />
            </div>
          </div>
        </section>

        {/* Section: Основні Блоки */}
        <section style={{ paddingTop: '40rem', paddingBottom: '120rem' }}>
          {/* Section title */}
          <EditableText
            contentKey="meditations.blocks.title"
            defaultValue="Основні Блоки"
            as="h2"
            className="text-center font-display italic page-hero-title"
            style={{
              lineHeight: '1',
              color: '#fff',
              textShadow: '0 2rem 10rem rgba(0, 0, 0, 0.1)',
              marginBottom: '80rem',
            }}
          />

          {/* Blocks container with vertical line */}
          <div
            className="relative mx-auto flex flex-col items-center blocks-container"
          >
            {/* Add block button at the top (edit mode only) */}
            {canEdit && !showAddForm && !editingBlock && (
              <div style={{ width: '100%', marginBottom: '24rem' }}>
                <AddBlockButton onClick={() => setShowAddForm(true)} />
              </div>
            )}

            {/* Add block form */}
            {showAddForm && (
              <div style={{ width: '100%', marginBottom: '24rem' }}>
                <InlineBlockForm
                  onSave={handleAddBlock}
                  onCancel={() => setShowAddForm(false)}
                  nextBlockNumber={nextBlockNumber}
                />
              </div>
            )}

            {sortedBlocks.length > 0 ? (
              sortedBlocks.map((block, index) => (
                <div key={block.id} style={{ width: '100%' }}>
                  {editingBlock?.id === block.id ? (
                    <InlineBlockForm
                      onSave={handleUpdateBlock}
                      onCancel={() => setEditingBlock(null)}
                      initialData={block}
                      nextBlockNumber={block.blockNumber}
                    />
                  ) : (
                    <BlockCard
                      block={block}
                      index={index}
                      isEditing={canEdit}
                      onEdit={() => setEditingBlock(block)}
                      onDelete={() => handleDeleteBlock(block.id)}
                    />
                  )}
                  {/* Vertical line between blocks */}
                  {index < sortedBlocks.length - 1 && (
                    <div className="flex justify-center">
                      <div style={{ width: '2rem', height: '40rem', background: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Fallback when no blocks from CMS
              <div className="text-center" style={{ padding: '40rem', color: '#fff' }}>
                {canEdit ? (
                  <p style={{ fontSize: '18rem', opacity: 0.8 }}>
                    Натисніть кнопку вище, щоб додати перший блок медитації
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: '18rem', opacity: 0.8 }}>
                      Блоки медитацій завантажуються...
                    </p>
                    <p style={{ fontSize: '14rem', opacity: 0.6, marginTop: '12rem' }}>
                      Додайте блоки в адмін-панелі: /admin/meditation-blocks
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section: Медитації Українською */}
        <section style={{ paddingTop: '40rem', paddingBottom: '120rem' }}>
          {/* Section title */}
          <h2
            className="text-center font-display italic page-title"
            style={{
              lineHeight: '1',
              color: '#fff',
              textShadow: '0 2rem 10rem rgba(0, 0, 0, 0.1)',
              marginBottom: '40rem',
            }}
          >
            Медитації Українською
          </h2>

          {/* Description text */}
          <div
            className="mx-auto text-center ukrainian-description"
            style={{
              marginBottom: '60rem',
            }}
          >
            <p
              style={{
                fontSize: '18rem',
                lineHeight: '1.6',
                color: '#fff',
                marginBottom: '24rem',
              }}
            >
              Для вас, мої Любі - ми створили неймовірні практики, як на кожен день так і можливості зробити час від часу.
            </p>
            <p
              style={{
                fontSize: '18rem',
                lineHeight: '1.6',
                color: '#fff',
              }}
            >
              Для вас - чотири дуже потужні практики, коли Провідник Веде вас в медитації, для ваших змін всередині так і назовні. Ви - Центр усього вашого Світу і тільки ви самі, у змозі змінити цей Світ на краще.
            </p>
          </div>

          {/* Practices card */}
          <div
            className="mx-auto blocks-container"
          >
            <div
              className="practices-card"
              style={{
                padding: '24rem',
                borderRadius: '20rem',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,220,245,0.3) 100%)',
                border: '1rem solid rgba(255,255,255,0.4)',
              }}
            >
              <img
                src="/images/img/Rectangle-8418-1.png"
                alt="Практики"
                className="practices-card-image"
                style={{
                  width: '180rem',
                  height: '200rem',
                  borderRadius: '12rem',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div className="flex flex-col practices-card-content" style={{ flex: 1, gap: '12rem' }}>
                <span
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: 'rgba(212, 165, 116, 0.9)' }}
                >
                  Практики
                </span>
                <h3
                  className="practices-card-title"
                  style={{
                    fontSize: '24rem',
                    fontWeight: 600,
                    color: '#fff',
                    lineHeight: '1.3',
                  }}
                >
                  4 Потужні практики<br />на кожний день
                </h3>
                <div className="flex items-center practices-card-actions" style={{ gap: '20rem', marginTop: '12rem' }}>
                  <button
                    className="btn-gold"
                    style={{
                      padding: '14rem 40rem',
                      fontSize: '18rem',
                    }}
                  >
                    Відкрити
                  </button>
                  <div className="flex items-center" style={{ gap: '8rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    <span style={{ fontSize: '20rem', color: '#fff' }}>30:41 хв</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Айа провідник Світла та Любові - shared component */}
        <section style={{ paddingTop: '80rem', overflow: 'visible' }}>
          <AyaGuideSection contentKeyPrefix="meditations.aya" />
        </section>

        {/* Section: Message from Aya */}
        <section
          className="flex flex-col items-center"
          style={{ paddingTop: '80rem', paddingBottom: '120rem' }}
        >
          {/* Main heading */}
          <h2
            className="text-center message-heading"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '28rem',
              fontWeight: 600,
              lineHeight: '40rem',
              letterSpacing: '-0.42rem',
              color: '#fff',
            }}
          >
            Рідні, всі ці практики глибоко наповнені й приходять через портал мого Серця в єдності з Джерелом.
          </h2>

          {/* Description paragraphs */}
          <div
            className="text-center message-text"
            style={{
              marginTop: '26rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16rem',
              fontWeight: 400,
              lineHeight: '23rem',
              color: '#fff',
            }}
          >
            <p style={{ marginBottom: '24rem' }}>
              Вони призначені для тих, хто готовий прийняти їх і увійти в енергообмін. Ці практики не для випадкового поширення — вони працюють лише у свідомому контакті.
            </p>
            <p style={{ marginBottom: '24rem' }}>
              Над цим матеріалом працювало багато людей, у нього вкладено велику кількість Любові, світлого Творіння та ресурсів.
            </p>
            <p>
              Нехай ці медитації розкриють ваші Серця і допоможуть повернутися Додому — до життя в Любові, Радості, Щасті й Достатку вже зараз, у цьому втіленні.
            </p>
          </div>

          {/* Logo */}
          <div style={{ marginTop: '60rem', marginBottom: '40rem' }}>
            <img
              src="/images/logo.svg"
              alt="Потік Світла та Любові"
              style={{ height: '80rem', width: 'auto' }}
            />
          </div>

          {/* Signature */}
          <p
            className="text-center message-signature"
            style={{
              padding: '0 40rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '28rem',
              fontWeight: 600,
              lineHeight: '46rem',
              letterSpacing: '-1.12rem',
              color: '#fff',
            }}
          >
            З Любов'ю, Айа — Потік Світла і Любові. Провідниця у Вищі виміри Свідомості. Майстриня Вознесіння.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/**
 * Медитації - Main component with EditorProvider wrapper
 * Figma ID: 694-17024
 */
const Meditations = () => {
  return (
    <EditorProvider>
      <MeditationsContent />
    </EditorProvider>
  );
};

export default Meditations;
