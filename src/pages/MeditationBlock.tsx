import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { useAdminStore, useMeditationBlocks } from '@/admin/hooks/useAdminStore';
import { EditorProvider } from "@/editor";
import { supabase } from '@/lib/supabase';

// ── Track type from Supabase ─────────────────────────────
interface Track {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  order: number;
  status: string;
}

// ── HeadphonesIcon ─────────────────────────────────────────
const HeadphonesIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// ── Track card styles ──────────────────────────────────────
const trackCardOuter: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '28rem',
  boxShadow: '0 3.65rem 5.48rem -3.65rem rgba(253, 186, 114, 0.05), 0 9.14rem 13.7rem -2.74rem rgba(253, 186, 114, 0.05)',
};

const trackCardInner: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24rem',
  boxShadow: '0 3.65rem 5.48rem -3.65rem rgba(253, 186, 114, 0.05), 0 9.14rem 13.7rem -2.74rem rgba(253, 186, 114, 0.05)',
};

/**
 * Сторінка деталей блоку медитацій
 * Route: /meditations/:blockNumber
 */
const MeditationBlock = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const blocks = useMeditationBlocks();
  const { fetchCollection } = useAdminStore();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(true);

  useEffect(() => {
    fetchCollection('meditation_blocks');
  }, [fetchCollection]);

  const block = blocks.find(
    (b) => b.blockNumber === Number(blockNumber) && b.status === 'published'
  );

  // Fetch tracks when block is available
  useEffect(() => {
    if (!block?.id) return;

    const fetchTracks = async () => {
      setTracksLoading(true);
      const { data, error } = await supabase
        .from('meditation_tracks')
        .select('*')
        .eq('block_id', block.id)
        .eq('status', 'published')
        .order('order', { ascending: true });

      if (!error && data) {
        setTracks(data);
      }
      setTracksLoading(false);
    };

    fetchTracks();
  }, [block?.id]);

  // Next 2 meditation blocks in circular order
  const publishedBlocks = blocks
    .filter((b) => b.status === 'published')
    .sort((a, b) => a.blockNumber - b.blockNumber);

  const currentIndex = publishedBlocks.findIndex((b) => b.blockNumber === Number(blockNumber));
  const nextBlocks: typeof publishedBlocks = [];
  if (publishedBlocks.length > 1 && currentIndex !== -1) {
    for (let i = 1; i <= 2 && i < publishedBlocks.length; i++) {
      nextBlocks.push(publishedBlocks[(currentIndex + i) % publishedBlocks.length]);
    }
  }

  // Prev / Next block for navigation
  const prevBlock = currentIndex > 0
    ? publishedBlocks[currentIndex - 1]
    : publishedBlocks[publishedBlocks.length - 1];
  const nextBlock = currentIndex < publishedBlocks.length - 1
    ? publishedBlocks[currentIndex + 1]
    : publishedBlocks[0];

  // Loading state
  if (!block) {
    return (
      <EditorProvider pageId="meditation-block">
        <div className="relative min-h-screen font-sans" style={{ background: '#73BEEC', overflow: 'clip' }}>
          <PageClouds variant="minimal" />
          <Header />
          <main className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <p style={{ fontSize: '28rem', color: '#fff', fontWeight: 600 }}>
              Завантаження...
            </p>
          </main>
        </div>
      </EditorProvider>
    );
  }

  return (
    <EditorProvider pageId="meditation-block">
      <div className="relative min-h-screen font-sans" style={{ background: '#73BEEC', overflow: 'clip' }}>
        <PageClouds variant="minimal" />
        <Header />

        <main className="relative z-[2]" style={{ paddingTop: '120rem', paddingBottom: '80rem' }}>
          {/* ── Hero: label + block number + duration + title ── */}
          <section className="mx-auto text-center" style={{ maxWidth: '1440rem', padding: '0 60rem' }}>
            <h3
              style={{
                fontSize: '28rem',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.04em',
                marginBottom: '32rem',
              }}
            >
              Медитація
            </h3>

            <div className="flex flex-col items-center" style={{ gap: '20rem', marginBottom: '48rem' }}>
              {/* Block number */}
              <h1
                className="font-display"
                style={{
                  fontSize: '115rem',
                  lineHeight: '0.84em',
                  letterSpacing: '0.01em',
                  background: 'linear-gradient(101deg, #fff 6%, #D0ECFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                {block.blockNumber} Блок
              </h1>

              {/* Duration */}
              <div className="flex items-center" style={{ gap: '8rem' }}>
                <HeadphonesIcon size={24} />
                <span style={{ fontSize: '24rem', color: '#fff', letterSpacing: '-0.02em' }}>
                  {block.totalDuration}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: '28rem',
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  textAlign: 'center',
                }}
              >
                {block.title}
              </h2>
            </div>
          </section>

          {/* ── Hero image (phone frame) ── */}
          <section className="mx-auto flex justify-center" style={{ marginBottom: '40rem' }}>
            <div
              style={{
                width: '390rem',
                height: '474rem',
                borderRadius: '28rem',
                background: 'rgba(255, 255, 255, 0.3)',
                border: '1.8px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 6.56rem 9.84rem -6.56rem rgba(253, 186, 114, 0.05), 0 16.4rem 24.6rem -4.92rem rgba(253, 186, 114, 0.05)',
                padding: '14rem 16rem',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24rem',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={block.image}
                  alt={block.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/390x474/73BEEC/ffffff?text=Meditation';
                  }}
                />
              </div>
            </div>
          </section>

          {/* ── Subtitle / Description ── */}
          {block.subtitle && (
            <section className="text-center" style={{ marginBottom: '32rem' }}>
              <h3
                style={{
                  fontSize: '28rem',
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                }}
              >
                {block.subtitle}
              </h3>
            </section>
          )}

          {/* ── Зміст (Contents) ── */}
          {tracks.length > 0 && (
            <>
              <section className="text-center" style={{ marginBottom: '24rem' }}>
                <h3
                  style={{
                    fontSize: '28rem',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Зміст
                </h3>
              </section>

              {/* ── Track list ── */}
              <section
                className="mx-auto flex flex-col"
                style={{ maxWidth: '571rem', gap: '8rem', marginBottom: '60rem' }}
              >
                {tracks.map((track) => {
                  const paragraphs = track.description
                    ? track.description.split('\n\n').filter(Boolean)
                    : [];
                  const hasDescription = paragraphs.length > 0;

                  return (
                    <div key={track.id} style={trackCardOuter}>
                      <div
                        style={{
                          ...trackCardInner,
                          margin: '8rem 9rem',
                          padding: '23rem 28rem',
                        }}
                      >
                        {/* Track title */}
                        <h4
                          style={{
                            fontSize: '24rem',
                            fontWeight: 400,
                            color: '#fff',
                            letterSpacing: '-0.02em',
                            marginBottom: hasDescription ? '12rem' : '14rem',
                          }}
                        >
                          {track.title}
                        </h4>

                        {/* Description paragraphs */}
                        {paragraphs.map((paragraph, i) => (
                          <p
                            key={i}
                            style={{
                              fontSize: '16rem',
                              lineHeight: '1.44em',
                              color: 'rgba(255, 255, 255, 0.8)',
                              marginBottom: i < paragraphs.length - 1 ? '16rem' : '14rem',
                            }}
                          >
                            {paragraph}
                          </p>
                        ))}

                        {/* Duration */}
                        <div className="flex items-center" style={{ gap: '8rem' }}>
                          <HeadphonesIcon size={24} />
                          <span style={{ fontSize: '24rem', color: '#fff', letterSpacing: '-0.02em' }}>
                            {track.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </>
          )}

          {tracksLoading && (
            <section className="text-center" style={{ marginBottom: '60rem' }}>
              <p style={{ fontSize: '18rem', color: 'rgba(255,255,255,0.6)' }}>
                Завантаження треків...
              </p>
            </section>
          )}

          {/* ── CTA Button ── */}
          <section className="flex justify-center" style={{ marginBottom: '80rem' }}>
            <a
              href={block.accessUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity btn-shimmer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '223rem',
                height: '70rem',
                borderRadius: '68rem',
                background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
                color: '#fff',
                fontSize: '18rem',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                boxShadow: '0 1px 1px 0 rgba(193, 144, 96, 0.12), 0 4px 15px 0 rgba(193, 144, 96, 0.11), inset 0 1px 1px 0 rgba(255, 255, 255, 0.79)',
                backdropFilter: 'blur(5px)',
              }}
            >
              Отримати Доступ
            </a>
          </section>

          {/* ── Інші Медитації ── */}
          {nextBlocks.length > 0 && (
            <section className="mx-auto text-center" style={{ maxWidth: '1440rem', padding: '0 60rem', marginBottom: '60rem' }}>
              <h2
                className="font-display"
                style={{
                  fontSize: '115rem',
                  lineHeight: '0.84em',
                  letterSpacing: '0.01em',
                  background: 'linear-gradient(101deg, #fff 6%, #D0ECFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '48rem',
                }}
              >
                Інші Медитації
              </h2>

              {/* Cards row */}
              <div
                className="flex justify-center"
                style={{ gap: '22rem' }}
              >
                {nextBlocks.map((ob) => (
                  <Link
                    key={ob.id}
                    to={`/meditations/${ob.blockNumber}`}
                    className="block hover:opacity-95 transition-opacity"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '571rem',
                        height: '264rem',
                        borderRadius: '28rem',
                        background: 'rgba(255, 255, 255, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 3.65rem 5.48rem -3.65rem rgba(253, 186, 114, 0.05), 0 9.14rem 13.7rem -2.74rem rgba(253, 186, 114, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                      }}
                    >
                      {/* Image thumbnail */}
                      <div
                        style={{
                          width: '175rem',
                          height: '218rem',
                          borderRadius: '12rem',
                          overflow: 'hidden',
                          margin: '23rem 0 0 21rem',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={ob.image}
                          alt={ob.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/175x218/73BEEC/ffffff?text=Block';
                          }}
                        />
                      </div>

                      {/* Text content */}
                      <div style={{ padding: '23rem 20rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                        <div>
                          <span
                            className="font-display"
                            style={{
                              fontSize: '32rem',
                              letterSpacing: '-0.02em',
                              color: '#fff',
                              display: 'block',
                              marginBottom: '18rem',
                            }}
                          >
                            {ob.blockNumber} Блок
                          </span>
                          <h3
                            style={{
                              fontSize: '24rem',
                              fontWeight: 400,
                              color: '#fff',
                              letterSpacing: '-0.02em',
                              lineHeight: '1.17em',
                            }}
                          >
                            {ob.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Duration */}
                          <div className="flex items-center" style={{ gap: '8rem' }}>
                            <HeadphonesIcon size={24} />
                            <span style={{ fontSize: '24rem', color: '#fff', letterSpacing: '-0.02em' }}>
                              {ob.totalDuration}
                            </span>
                          </div>

                          {/* Open button */}
                          <div
                            className="btn-gold"
                            style={{
                              width: '167rem',
                              height: '52rem',
                              fontSize: '18rem',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            Відкрити
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Navigation: Prev / Next ── */}
          <section
            className="mx-auto flex justify-between"
            style={{ maxWidth: '1200rem', padding: '0 60rem', marginBottom: '80rem' }}
          >
            {prevBlock && prevBlock.blockNumber !== Number(blockNumber) && (
              <Link
                to={`/meditations/${prevBlock.blockNumber}`}
                className="hover:opacity-80 transition-opacity"
                style={{
                  fontSize: '32rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                }}
              >
                ← Попередня Медитація
              </Link>
            )}
            <div />
            {nextBlock && nextBlock.blockNumber !== Number(blockNumber) && (
              <Link
                to={`/meditations/${nextBlock.blockNumber}`}
                className="hover:opacity-80 transition-opacity"
                style={{
                  fontSize: '32rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                }}
              >
                Наступна Медитація →
              </Link>
            )}
          </section>

          {/* ── Aya signature ── */}
          <section className="mx-auto text-center" style={{ marginBottom: '80rem' }}>
            {/* Logo */}
            <div className="flex justify-center" style={{ marginBottom: '40rem' }}>
              <img
                src="/images/logo.svg"
                alt="Потік Світла та Любові"
                style={{ width: '220rem', height: '73rem' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <p
              style={{
                fontSize: '28rem',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.04em',
                lineHeight: '1.64em',
                maxWidth: '519rem',
                margin: '0 auto',
              }}
            >
              З Любов'ю, Айа — Потік Світла і Любові. Провідниця у Вищі виміри Свідомості. Майстриня Вознесіння.
            </p>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="relative z-20" style={{ background: '#73BEEC' }}>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.2)',
              maxWidth: '1320rem',
              margin: '0 auto 49rem',
            }}
          />
          <div
            className="footer-row mx-auto"
            style={{ maxWidth: '1320rem', padding: '0 60rem' }}
          >
            {/* Logo + social */}
            <div className="flex items-center" style={{ gap: '78rem' }}>
              <img
                src="/images/logo.svg"
                alt="Потік Світла та Любові"
                style={{ height: '40rem' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex items-center" style={{ gap: '16rem' }}>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
              </div>
            </div>

            <a
              href="mailto:ayasatsang@gmail.com"
              className="hover:opacity-80 transition-opacity font-serif"
              style={{ fontSize: '17rem', color: '#fff', letterSpacing: '-0.01em' }}
            >
              ayasatsang@gmail.com
            </a>

            <Link
              to="/privacy"
              className="hover:opacity-80 transition-opacity font-serif"
              style={{ fontSize: '17rem', color: '#fff', letterSpacing: '-0.01em' }}
            >
              Політика конфіденційності
            </Link>
          </div>

          <div className="w-full" style={{ marginTop: '40rem' }}>
            <img
              src="/images/footer.png"
              alt=""
              style={{ width: '100%', height: '540rem', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </footer>
      </div>
    </EditorProvider>
  );
};

export default MeditationBlock;
