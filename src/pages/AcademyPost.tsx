import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { useAdminStore } from "@/admin/hooks/useAdminStore";
import { EditorProvider } from "@/editor";

/**
 * Сторінка одного матеріалу академії
 */

interface AcademyItemData {
  id: string;
  slug?: string;
  image: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  author?: string;
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

// Card Component for related items
const AcademyCard = ({ item }: { item: AcademyItemData }) => {
  return (
    <Link to={`/academy/${item.slug || item.id}`} className="cursor-pointer group w-full block">
      {/* Part 1: Photo section with frame */}
      <div className="article-card-image-frame">
        <div className="article-card-image-container">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Academy';
            }}
          />
        </div>
      </div>

      {/* Part 2: Content section */}
      <div className="flex flex-col justify-between article-card-content">
        <div>
          <h3 className="font-serif article-card-title">
            {item.title}
          </h3>
          <p className="article-card-description">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap article-card-tags">
          {(item.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="article-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

// Clock Icon component
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const AcademyPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const academyItems = useAdminStore((s) => s.academy);
  const fetchCollection = useAdminStore((s) => s.fetchCollection);

  useEffect(() => {
    fetchCollection('academy');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find current item by id or slug
  const itemData = academyItems.find(a => a.id === id || a.slug === id) as AcademyItemData | undefined;

  // Get related items (exclude current, only published)
  const relatedItems = academyItems
    .filter(a => a.id !== itemData?.id && a.status === 'published')
    .slice(0, 3) as AcademyItemData[];

  if (!itemData) {
    return (
      <div className="relative" style={{ background: '#73BEEC', minHeight: '100vh', overflow: 'clip' }}>
        <Header />
        <div className="flex items-center justify-center" style={{ paddingTop: '200rem' }}>
          <p style={{ fontSize: '24rem', color: '#fff' }}>Матеріал не знайдений</p>
        </div>
      </div>
    );
  }

  return (
    <EditorProvider pageId="academy-post">
    <Helmet>
      <title>{itemData.metaTitle || itemData.title} | Айа</title>
      {(itemData.metaDescription || itemData.description) && (
        <meta name="description" content={itemData.metaDescription || itemData.description} />
      )}
      <meta property="og:title" content={itemData.metaTitle || itemData.title} />
      {(itemData.metaDescription || itemData.description) && (
        <meta property="og:description" content={itemData.metaDescription || itemData.description} />
      )}
      {itemData.image && <meta property="og:image" content={itemData.image} />}
    </Helmet>
    <div className="relative" style={{ background: '#73BEEC', overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="minimal" />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative article-hero-section">
        {/* Background glow effects */}
        <div className="absolute pointer-events-none article-hero-glow" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center article-hero-content">
          {/* Title */}
          <h1 className="font-display italic text-center article-hero-title">
            {itemData.title}
          </h1>

          {/* Meta info: read time + date */}
          <div className="flex items-center justify-center flex-wrap article-hero-meta">
            <ClockIcon />
            <span className="article-hero-meta-text">
              2 хв читання · {formatDate(itemData.date)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Main Image */}
        <section className="flex justify-center article-main-image-section">
          <div className="relative article-main-image-container">
            <img
              src={itemData.image}
              alt={itemData.title}
              className="article-main-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/808x404/D4E9F7/6AB4FF?text=Academy';
              }}
            />
          </div>
        </section>

        {/* Description - lead text */}
        {itemData.description && (
          <section className="flex justify-center article-description-section">
            <p className="text-center article-description-text" style={{ whiteSpace: 'pre-line' }}>
              {(itemData.description || '').replace(/\\n/g, '\n')}
            </p>
          </section>
        )}

        {/* Content Block */}
        {itemData.content && (
          <section className="flex justify-center article-content-section">
            <div className="article-content-wrapper">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: itemData.content }}
              />
            </div>
          </section>
        )}

        {/* Tags */}
        {itemData.tags && itemData.tags.length > 0 && (
          <section className="flex justify-center article-tags-section">
            <div className="flex flex-wrap justify-center article-tags-container">
              {itemData.tags.map((tag) => (
                <span key={tag} className="article-tag-item">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <section className="article-related-section">
            <h2 className="font-display italic text-center article-related-title">
              Подібні матеріали
            </h2>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 article-related-grid">
              {relatedItems.map((item) => (
                <AcademyCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Global styles + Responsive — reuse article-* classes */}
      <style>{`
        /* ===== HERO SECTION ===== */
        .article-hero-section {
          padding-top: 100rem;
          padding-bottom: 40rem;
        }
        .article-hero-glow {
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
        .article-hero-content {
          max-width: 974rem;
          margin: 0 auto;
          padding: 0 20rem;
        }
        .article-hero-title {
          font-size: 115rem;
          line-height: 1;
          color: #fff;
          text-shadow: 0 4rem 40rem rgba(106, 180, 255, 0.5);
          margin-bottom: 20rem;
        }
        .article-hero-meta {
          gap: 8rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .article-hero-meta-text {
          font-size: 16rem;
        }

        /* ===== MAIN IMAGE ===== */
        .article-main-image-section {
          margin-bottom: 40rem;
        }
        .article-main-image-container {
          width: 808rem;
          max-width: calc(100% - 40rem);
        }
        .article-main-image {
          width: 100%;
          height: 404rem;
          object-fit: cover;
          border-radius: 16rem;
          box-shadow: 0 20rem 60rem rgba(255, 255, 255, 0.4);
        }

        /* ===== DESCRIPTION ===== */
        .article-description-section {
          margin-bottom: 40rem;
        }
        .article-description-text {
          max-width: 808rem;
          padding: 0 20rem;
          font-family: 'Inter', sans-serif;
          font-size: 28rem;
          font-weight: 600;
          line-height: 126%;
          letter-spacing: -0.04em;
          color: #fff;
        }

        /* ===== CONTENT ===== */
        .article-content-section {
          margin-bottom: 48rem;
        }
        .article-content-wrapper {
          max-width: 808rem;
          width: 100%;
          padding: 0 20rem;
        }
        .article-content {
          font-size: 16rem;
          line-height: 1.75;
          color: #fff;
        }
        .article-content h2,
        .article-content p strong:only-child {
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
        .article-content h2:first-child {
          margin-top: 0;
        }
        .article-content h3 {
          font-family: 'Inter', sans-serif;
          font-size: 24rem;
          font-weight: 600;
          line-height: 126%;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 14rem;
          margin-top: 40rem;
        }
        .article-content p {
          margin-bottom: 16rem;
          font-size: 16rem;
          line-height: 1.75;
          color: #fff;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 16rem;
          padding-left: 0;
          list-style: none;
        }
        .article-content li {
          margin-bottom: 8rem;
          padding-left: 20rem;
          position: relative;
          font-size: 16rem;
          color: #fff;
        }
        .article-content li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #fff;
        }
        .article-content blockquote {
          border-left: 3rem solid #D4B896;
          padding-left: 20rem;
          margin: 32rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }
        .article-content a {
          text-decoration: underline;
          color: #fff;
        }

        /* ===== TAGS ===== */
        .article-tags-section {
          margin-bottom: 80rem;
        }
        .article-tags-container {
          gap: 12rem;
          max-width: 808rem;
          padding: 0 20rem;
        }
        .article-tag-item {
          padding: 12rem 24rem;
          border-radius: 16rem;
          background: rgba(255, 255, 255, 0.15);
          border: 2rem solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-size: 16rem;
          font-weight: 500;
        }

        /* ===== RELATED ITEMS ===== */
        .article-related-section {
          padding-bottom: 80rem;
        }
        .article-related-title {
          font-size: 115rem;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 40rem;
        }
        .article-related-grid {
          max-width: 1227rem;
          padding: 0 20rem;
          gap: 24rem;
        }

        /* ===== CARD ===== */
        .article-card-image-frame {
          width: 100%;
          aspect-ratio: 401/381;
          padding: 10rem;
          border-radius: 27rem;
          background: #D4DFF2;
          margin-bottom: 0;
        }
        .article-card-image-container {
          width: 100%;
          height: 100%;
          border-radius: 27rem;
          overflow: hidden;
        }
        .article-card-content {
          width: 100%;
          height: 315rem;
          padding: 32rem;
          border-radius: 32rem;
          border: 2rem solid rgba(255, 255, 255, 0.41);
          background: linear-gradient(180deg, #34D1FF 0%, #80A5FF 100%);
          margin-top: -3rem;
        }
        .article-card-title {
          font-size: 26rem;
          color: #fff;
          margin-bottom: 12rem;
        }
        .article-card-description {
          font-size: 15rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 16rem;
        }
        .article-card-tags {
          gap: 12rem;
        }
        .article-card-tag {
          padding: 10rem 20rem;
          border-radius: 12rem;
          border: 2rem solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 14rem;
          font-weight: 500;
        }

        /* ===== TABLET (768px - 1024px) ===== */
        @media (max-width: 1024px) {
          .article-hero-section {
            padding-top: 110px;
            padding-bottom: 32px;
          }
          .article-hero-title {
            font-size: 72px;
            margin-bottom: 16px;
          }
          .article-hero-meta-text {
            font-size: 14px;
          }
          .article-main-image-section {
            margin-bottom: 32px;
          }
          .article-main-image {
            height: 320px;
            border-radius: 12px;
          }
          .article-description-text {
            font-size: 22px;
          }
          .article-content-wrapper {
            max-width: 100%;
          }
          .article-content h2 {
            font-size: 24px !important;
            margin-top: 36px !important;
          }
          .article-content h3 {
            font-size: 20px;
          }
          .article-content p,
          .article-content li {
            font-size: 15px;
          }
          .article-tag-item {
            padding: 10px 20px;
            font-size: 14px;
          }
          .article-related-title {
            font-size: 72px;
            margin-bottom: 32px;
          }
          .article-card-content {
            height: auto;
            min-height: 280px;
            padding: 24px;
          }
          .article-card-title {
            font-size: 22px;
          }
          .article-card-description {
            font-size: 14px;
          }
        }

        /* ===== MOBILE (< 768px) ===== */
        @media (max-width: 768px) {
          .article-hero-section {
            padding-top: 100px;
            padding-bottom: 24px;
          }
          .article-hero-content {
            padding: 0 16px;
          }
          .article-hero-title {
            font-size: 48px;
            margin-bottom: 12px;
          }
          .article-hero-meta {
            gap: 6px;
          }
          .article-hero-meta-text {
            font-size: 13px;
          }
          .article-main-image-section {
            margin-bottom: 24px;
          }
          .article-main-image-container {
            max-width: calc(100% - 32px);
          }
          .article-main-image {
            height: 220px;
            border-radius: 12px;
          }
          .article-description-section {
            margin-bottom: 24px;
          }
          .article-description-text {
            font-size: 18px;
            padding: 0 16px;
          }
          .article-content-section {
            margin-bottom: 36px;
          }
          .article-content-wrapper {
            padding: 0 16px;
          }
          .article-content h2 {
            font-size: 20px !important;
            margin-top: 28px !important;
            margin-bottom: 12px !important;
          }
          .article-content h3 {
            font-size: 18px;
            margin-top: 24px;
          }
          .article-content p,
          .article-content li {
            font-size: 14px;
            margin-bottom: 12px;
          }
          .article-content blockquote {
            margin: 24px 0;
            padding-left: 16px;
          }
          .article-tags-section {
            margin-bottom: 48px;
          }
          .article-tags-container {
            gap: 8px;
            padding: 0 16px;
          }
          .article-tag-item {
            padding: 8px 16px;
            font-size: 13px;
            border-radius: 12px;
          }
          .article-related-section {
            padding-bottom: 48px;
          }
          .article-related-title {
            font-size: 40px;
            margin-bottom: 24px;
          }
          .article-related-grid {
            padding: 0 16px;
            gap: 16px;
          }
          .article-card-image-frame {
            padding: 8px;
            border-radius: 20px;
          }
          .article-card-image-container {
            border-radius: 16px;
          }
          .article-card-content {
            height: auto;
            min-height: 240px;
            padding: 20px;
            border-radius: 24px;
          }
          .article-card-title {
            font-size: 20px;
            margin-bottom: 8px;
          }
          .article-card-description {
            font-size: 13px;
            margin-bottom: 12px;
          }
          .article-card-tags {
            gap: 8px;
          }
          .article-card-tag {
            padding: 8px 14px;
            font-size: 12px;
          }
        }

        /* ===== SMALL MOBILE (< 480px) ===== */
        @media (max-width: 480px) {
          .article-hero-title {
            font-size: 36px;
          }
          .article-main-image {
            height: 180px;
          }
          .article-description-text {
            font-size: 16px;
          }
          .article-related-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
    </EditorProvider>
  );
};

export default AcademyPostPage;
