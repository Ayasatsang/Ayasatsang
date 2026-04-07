import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { useAdminStore } from "@/admin/hooks/useAdminStore";
import { EditorProvider } from "@/editor";

/**
 * Сторінка однієї події
 * Figma ID: 694-16195
 */

interface EventData {
  id: string;
  slug?: string;
  image: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  time?: string;
  format?: string;
  location?: string;
  quote?: string;
  tags: string[];
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
}

// Format date to Ukrainian locale
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Event Card Component for related events
const EventCard = ({ event, tagMap }: { event: EventData; tagMap: Map<string, string> }) => {
  return (
    <Link to={`/events/${event.slug || event.id}`} className="cursor-pointer group w-full block">
      {/* Part 1: Photo section with frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '401/381',
          padding: '4rem',
          borderRadius: '27rem',
          background: '#D4DFF2',
          marginBottom: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '27rem',
            overflow: 'hidden',
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Event';
            }}
          />
        </div>
      </div>

      {/* Part 2: Content section */}
      <div
        className="flex flex-col"
        style={{
          width: '100%',
          minHeight: '280rem',
          padding: '32rem',
          borderRadius: '32rem',
          border: '1.67rem solid rgba(255, 255, 255, 0.5)',
          background: 'linear-gradient(180deg, #34D1FF 0%, #80A5FF 100%)',
          marginTop: '2rem',
        }}
      >
        <div>
          {/* Title */}
          <h3
            className="font-serif"
            style={{
              fontSize: '26rem',
              color: '#fff',
              marginBottom: '12rem',
            }}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="line-clamp-5"
            style={{
              fontSize: '15rem',
              lineHeight: '1.4',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16rem',
            }}
          >
            {event.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap" style={{ gap: '12rem' }}>
          {(event.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '10rem 20rem',
                borderRadius: '12rem',
                border: '2rem solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '14rem',
                fontWeight: '500',
              }}
            >
              {tagMap.get(tag) || tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

// Calendar Icon component
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Clock Icon component
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const events = useAdminStore((s) => s.events);
  const tags = useAdminStore((s) => s.tags);
  const fetchCollection = useAdminStore((s) => s.fetchCollection);

  // Tag ID → name lookup
  const tagMap = new Map(tags.map(t => [t.id, t.name]));

  useEffect(() => {
    fetchCollection('events');
    fetchCollection('tags');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find current event by id or slug
  const eventData = events.find(e => e.id === id || e.slug === id) as EventData | undefined;

  // Get related events (exclude current, only published)
  const relatedEvents = events
    .filter(e => e.id !== eventData?.id && e.status === 'published')
    .slice(0, 3) as EventData[];

  if (!eventData) {
    return (
      <div className="relative" style={{ background: '#73BEEC', minHeight: '100vh', overflow: 'clip' }}>
        <Header />
        <div className="flex items-center justify-center" style={{ paddingTop: '200rem' }}>
          <p style={{ fontSize: '24rem', color: '#fff' }}>Подія не знайдена</p>
        </div>
      </div>
    );
  }

  return (
    <EditorProvider pageId="event">
    <Helmet>
      <title>{eventData.metaTitle || eventData.title} | Айа</title>
      {(eventData.metaDescription || eventData.description) && (
        <meta name="description" content={eventData.metaDescription || eventData.description} />
      )}
      <meta property="og:title" content={eventData.metaTitle || eventData.title} />
      {(eventData.metaDescription || eventData.description) && (
        <meta property="og:description" content={eventData.metaDescription || eventData.description} />
      )}
      {eventData.image && <meta property="og:image" content={eventData.image} />}
    </Helmet>
    <div className="relative" style={{ background: '#73BEEC', overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="minimal" />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative page-hero">
        {/* Background glow effects */}
        <div
          className="absolute pointer-events-none hero-glow"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center hero-content">
          {/* Title */}
          <h1 className="font-display italic text-center hero-title">
            {eventData.title}
          </h1>

          {/* Date and Time */}
          <div className="flex items-center justify-center flex-wrap hero-meta">
            {/* Date */}
            <div className="flex items-center hero-meta-item">
              <CalendarIcon />
              <span className="hero-meta-text">
                {formatDate(eventData.date)}
              </span>
            </div>

            {/* Time */}
            {eventData.time && (
              <div className="flex items-center hero-meta-item">
                <ClockIcon />
                <span className="hero-meta-text">
                  {eventData.time}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Main Image with Clouds overlay */}
        <section className="flex justify-center main-image-section">
          <div className="relative main-image-container">
            {/* Clouds overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none clouds-overlay" />

            <img
              src={eventData.image}
              alt={eventData.title}
              className="main-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/808x404/D4E9F7/6AB4FF?text=Event+Image';
              }}
            />
          </div>
        </section>

        {/* Meta Information: date · time · format */}
        <section className="flex justify-center meta-section">
          <div className="flex items-center justify-center flex-wrap meta-info">
            <span className="meta-text">{formatDate(eventData.date)}</span>
            {eventData.time && (
              <>
                <span className="meta-separator">·</span>
                <span className="meta-text">{eventData.time}</span>
              </>
            )}
            {eventData.format && (
              <>
                <span className="meta-separator">·</span>
                <span className="meta-text">{eventData.format}</span>
              </>
            )}
          </div>
        </section>

        {/* Description - italic centered */}
        {eventData.description && (
          <section className="flex justify-center description-section">
            <p className="text-center italic description-text" style={{ whiteSpace: 'pre-line' }}>
              {(eventData.description || '').replace(/\\n/g, '\n')}
            </p>
          </section>
        )}

        {/* CTA Button - Долучитись */}
        <section className="flex justify-center cta-section">
          <a href="https://ayapotiksvitla-academy.com/" target="_blank" rel="noopener noreferrer" className="transition-all duration-200 hover:scale-105 cta-button btn-shimmer inline-flex items-center justify-center">
            Долучитись
          </a>
        </section>

        {/* Content Block - styled sections */}
        {eventData.content && (
          <section className="flex justify-center content-section">
            <div className="content-wrapper">
              <div
                className="event-content"
                dangerouslySetInnerHTML={{ __html: eventData.content }}
              />
            </div>
          </section>
        )}

        {/* Quote Block */}
        {eventData.quote && (
          <section className="flex justify-center quote-section">
            <div className="quote-wrapper">
              <p className="font-serif quote-text" style={{ whiteSpace: 'pre-line' }}>
                {(eventData.quote || '').replace(/\\n/g, '\n')}
              </p>
            </div>
          </section>
        )}

        {/* Tags */}
        {eventData.tags && eventData.tags.length > 0 && (
          <section className="flex justify-center tags-section">
            <div className="flex flex-wrap justify-center tags-container">
              {eventData.tags.map((tag) => (
                <span key={tag} className="tag-item">
                  {tagMap.get(tag) || tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <section className="related-section">
            <h2 className="font-display italic text-center related-title">
              Подібні події
            </h2>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 related-grid">
              {relatedEvents.map((event) => (
                <EventCard key={event.id} event={event} tagMap={tagMap} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Global styles for content + Responsive */}
      <style>{`
        /* ===== HERO SECTION ===== */
        .hero-section {
          padding-top: 100rem;
          padding-bottom: 40rem;
        }
        .hero-glow {
          width: 883rem;
          height: 309rem;
          left: 50%;
          top: 200rem;
          transform: translateX(-50%);
          background: #6C8EE5;
          filter: blur(400px);
          border-radius: 50%;
          opacity: 0.4;
        }
        .hero-content {
          max-width: 974rem;
          margin: 0 auto;
          padding: 0 20rem;
        }
        .hero-title {
          font-size: 115rem;
          line-height: 1;
          color: #fff;
          text-shadow: 0 4rem 40rem rgba(106, 180, 255, 0.5);
          margin-bottom: 20rem;
        }
        .hero-meta {
          gap: 24rem;
          color: #fff;
        }
        .hero-meta-item {
          gap: 8rem;
        }
        .hero-meta-text {
          font-size: 16rem;
        }

        /* ===== MAIN IMAGE ===== */
        .main-image-section {
          margin-bottom: 40rem;
        }
        .main-image-container {
          width: 808rem;
          max-width: calc(100% - 40rem);
          padding: 0;
        }
        .clouds-overlay {
          background-image: url(/images/clouds.png);
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          border-radius: 16rem;
        }
        .main-image {
          width: 100%;
          height: 404rem;
          object-fit: cover;
          border-radius: 16rem;
          box-shadow: 0 20rem 60rem rgba(255, 255, 255, 0.4);
        }

        /* ===== META INFO ===== */
        .meta-section {
          margin-bottom: 24rem;
        }
        .meta-info {
          gap: 8rem;
          padding: 0 20rem;
        }
        .meta-text {
          font-size: 18rem;
          font-weight: 500;
          color: #fff;
        }
        .meta-separator {
          font-size: 18rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ===== DESCRIPTION ===== */
        .description-section {
          margin-bottom: 32rem;
        }
        .description-text {
          max-width: 808rem;
          padding: 0 20rem;
          font-size: 18rem;
          font-weight: 400;
          line-height: 1.6;
          color: #fff;
        }

        /* ===== CTA BUTTON ===== */
        .cta-section {
          margin-bottom: 48rem;
        }
        .cta-button {
          width: 223rem;
          height: 70rem;
          border-radius: 68rem;
          background: radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%);
          backdrop-filter: blur(5px);
          box-shadow: 0px 1px 1px 0px rgba(193, 144, 96, 0.12), 0px 4px 15px 0px rgba(193, 144, 96, 0.11), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.79);
          border: none;
          font-size: 18rem;
          font-weight: 400;
          color: #fff;
          cursor: pointer;
        }

        /* ===== CONTENT ===== */
        .content-section {
          margin-bottom: 48rem;
        }
        .content-wrapper {
          max-width: 808rem;
          width: 100%;
          padding: 0 20rem;
        }
        .event-content {
          font-size: 16rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.85);
        }
        .event-content h2,
        .event-content p:first-of-type strong,
        .event-content p strong:only-child {
          font-family: 'Inter', sans-serif;
          font-size: 28rem;
          font-weight: 600;
          line-height: 126%;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 16rem;
          margin-top: 48rem;
          display: block;
        }
        .event-content h2:first-child,
        .event-content p:first-child strong:only-child {
          margin-top: 0;
        }
        .event-content h3 {
          font-family: 'Inter', sans-serif;
          font-size: 24rem;
          font-weight: 600;
          line-height: 126%;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 14rem;
          margin-top: 40rem;
        }
        .event-content p {
          margin-bottom: 4rem;
          font-size: 16rem;
          line-height: 1.5;
          color: #fff;
        }
        .event-content p:has(strong:only-child) {
          margin-bottom: 16rem;
          margin-top: 48rem;
        }
        .event-content p:first-child:has(strong:only-child) {
          margin-top: 0;
        }
        .event-content p:has(strong:only-child) strong {
          font-family: 'Inter', sans-serif;
          font-size: 28rem;
          font-weight: 600;
          line-height: 126%;
          letter-spacing: -0.04em;
          color: #fff;
        }
        .event-content ul, .event-content ol {
          margin-bottom: 8rem;
          padding-left: 0;
          list-style: none;
        }
        .event-content li {
          margin-bottom: 2rem;
          padding-left: 20rem;
          position: relative;
          font-size: 16rem;
          color: #fff;
        }
        .event-content li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #fff;
        }
        .event-content strong {
          font-weight: 600;
          color: #fff;
        }
        .event-content a {
          text-decoration: underline;
          opacity: 0.9;
          color: #fff;
        }
        .event-content a:hover {
          opacity: 1;
        }
        .event-content p:has(📅),
        .event-content p:has(🕐),
        .event-content p:has(📍),
        .event-content p:has(🧘) {
          font-size: 16rem;
          margin-bottom: 2rem;
        }

        /* ===== QUOTE ===== */
        .quote-section {
          margin-bottom: 60rem;
        }
        .quote-wrapper {
          max-width: 808rem;
          width: 100%;
          padding: 0 20rem;
        }
        .quote-text {
          font-size: 32rem;
          line-height: 1.3;
          color: #fff;
          margin-bottom: 16rem;
        }
        .quote-text:last-child {
          margin-bottom: 0;
        }

        /* ===== TAGS ===== */
        .tags-section {
          margin-bottom: 80rem;
        }
        .tags-container {
          gap: 12rem;
          max-width: 808rem;
          padding: 0 20rem;
        }
        .tag-item {
          padding: 12rem 24rem;
          border-radius: 16rem;
          background: rgba(255, 255, 255, 0.15);
          border: 2rem solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-size: 16rem;
          font-weight: 500;
        }

        /* ===== RELATED EVENTS ===== */
        .related-section {
          padding-bottom: 80rem;
        }
        .related-title {
          font-size: 115rem;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 40rem;
        }
        .related-grid {
          max-width: 1227rem;
          padding: 0 20rem;
          gap: 24rem;
        }

        /* ===== TABLET (768px - 1024px) ===== */
        @media (max-width: 1024px) {
          .hero-section {
            padding-top: 80px;
            padding-bottom: 32px;
          }
          .hero-title {
            font-size: 72px;
            margin-bottom: 16px;
          }
          .hero-meta {
            gap: 16px;
          }
          .hero-meta-text {
            font-size: 14px;
          }
          .main-image-section {
            margin-bottom: 32px;
          }
          .main-image {
            height: 320px;
            border-radius: 12px;
          }
          .clouds-overlay {
            border-radius: 12px;
          }
          .meta-text, .meta-separator {
            font-size: 16px;
          }
          .description-text {
            font-size: 16px;
            max-width: 808px;
          }
          .cta-button {
            width: 200px;
            height: 60px;
            font-size: 16px;
          }
          .content-wrapper {
            max-width: 100%;
          }
          .event-content h2,
          .event-content p strong:only-child,
          .event-content p:has(strong:only-child) strong {
            font-size: 24px !important;
            margin-top: 36px !important;
          }
          .event-content h3 {
            font-size: 20px;
            margin-top: 32px;
          }
          .event-content p,
          .event-content li {
            font-size: 15px;
          }
          .quote-text {
            font-size: 26px;
          }
          .tag-item {
            padding: 10px 20px;
            font-size: 14px;
          }
          .related-title {
            font-size: 72px;
            margin-bottom: 32px;
          }
        }

        /* ===== MOBILE (< 768px) ===== */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 60px;
            padding-bottom: 24px;
          }
          .hero-content {
            padding: 0 16px;
          }
          .hero-title {
            font-size: 48px;
            margin-bottom: 12px;
          }
          .hero-meta {
            gap: 12px;
            flex-direction: column;
          }
          .hero-meta-item {
            gap: 6px;
          }
          .hero-meta-text {
            font-size: 14px;
          }
          .main-image-section {
            margin-bottom: 24px;
          }
          .main-image-container {
            max-width: calc(100% - 32px);
          }
          .main-image {
            height: 220px;
            border-radius: 12px;
          }
          .clouds-overlay {
            border-radius: 12px;
          }
          .meta-section {
            margin-bottom: 16px;
          }
          .meta-info {
            padding: 0 16px;
            gap: 6px;
          }
          .meta-text, .meta-separator {
            font-size: 14px;
          }
          .description-section {
            margin-bottom: 24px;
          }
          .description-text {
            font-size: 15px;
            padding: 0 16px;
            line-height: 1.5;
          }
          .cta-section {
            margin-bottom: 36px;
          }
          .cta-button {
            width: 180px;
            height: 54px;
            font-size: 15px;
            border-radius: 50px;
          }
          .content-section {
            margin-bottom: 36px;
          }
          .content-wrapper {
            padding: 0 16px;
          }
          .event-content h2,
          .event-content p strong:only-child,
          .event-content p:has(strong:only-child) strong {
            font-size: 20px !important;
            margin-top: 28px !important;
            margin-bottom: 12px !important;
          }
          .event-content h3 {
            font-size: 18px;
            margin-top: 24px;
            margin-bottom: 10px;
          }
          .event-content p,
          .event-content li {
            font-size: 14px;
          }
          .event-content li {
            padding-left: 16px;
          }
          .quote-section {
            margin-bottom: 40px;
          }
          .quote-wrapper {
            padding: 0 16px;
          }
          .quote-text {
            font-size: 22px;
            margin-bottom: 12px;
          }
          .tags-section {
            margin-bottom: 48px;
          }
          .tags-container {
            gap: 8px;
            padding: 0 16px;
          }
          .tag-item {
            padding: 8px 16px;
            font-size: 13px;
            border-radius: 12px;
          }
          .related-section {
            padding-bottom: 48px;
          }
          .related-title {
            font-size: 40px;
            margin-bottom: 24px;
          }
          .related-grid {
            padding: 0 16px;
            gap: 16px;
          }
        }

        /* ===== SMALL MOBILE (< 480px) ===== */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 36px;
          }
          .main-image {
            height: 180px;
          }
          .cta-button {
            width: 160px;
            height: 48px;
            font-size: 14px;
          }
          .quote-text {
            font-size: 18px;
          }
          .related-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
    </EditorProvider>
  );
};

export default EventPage;
