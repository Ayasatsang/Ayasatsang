import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { usePublishedArticles, useAdminStore } from "@/admin/hooks/useAdminStore";
import { EditorProvider, EditableText } from "@/editor";

/**
 * Статті
 * Figma ID: 693-17
 */

interface Article {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  tags: string[];
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

// Article Card Component - exact copy from EventSlider
const ArticleCard = ({ article }: { article: Article & { slug?: string } }) => {
  return (
    <Link to={`/articles/${article.slug || article.id}`} className="cursor-pointer group w-full block">
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
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Article';
            }}
          />
        </div>
      </div>

      {/* Part 2: Content section - exact copy from EventSlider */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: '100%',
          padding: '32rem',
          borderRadius: '32rem',
          border: '1.67rem solid rgba(255, 255, 255, 0.5)',
          background: 'linear-gradient(180deg, #6CA4FF 0%, #3E7ADB 100%)',
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
            {article.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '15rem',
              lineHeight: '1.4',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16rem',
              whiteSpace: 'pre-line',
            }}
          >
            {(article.description || '').replace(/\\n/g, '\n')}
          </p>

          {/* Divider */}
          <div
            style={{
              height: '1rem',
              background: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '16rem',
            }}
          />

          {/* Date */}
          <div className="flex items-center" style={{ gap: '10rem', marginBottom: '8rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span style={{ fontSize: '14rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              {formatDate(article.date)}
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};

const Articles = () => {
  const articles = usePublishedArticles();
  const fetchCollection = useAdminStore((s) => s.fetchCollection);

  useEffect(() => {
    fetchCollection('articles');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <EditorProvider pageId="articles">
    <Helmet>
      <title>Статті | Айа</title>
      <meta name="description" content="Статті духовного наставника Айа — інсайти, практики, духовний розвиток." />
    </Helmet>
    <div className="relative" style={{ overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="default" />

      {/* Hero Section with Header */}
      <section className="relative">
        {/* Top gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 z-[1]"
          style={{
            height: '196rem',
            background: 'linear-gradient(180deg, #73BEEC 0%, rgba(115, 190, 236, 0) 100%)'
          }}
        />

        {/* Header */}
        <Header />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center page-hero">
          <EditableText
            contentKey="articles.hero.title"
            defaultValue="Статті"
            as="h1"
            className="font-display italic text-center hero-animate page-hero-title"
          />
          <EditableText
            contentKey="articles.hero.subtitle"
            defaultValue="Корисні статті про духовний розвиток та практики"
            as="p"
            className="text-center hero-animate-delay-1 page-hero-subtitle"
          />
        </div>
      </section>

      {/* Articles Cards Section */}
      <section className="relative z-20" style={{ paddingBottom: '80rem' }}>
        {/* Cards grid - 3 columns */}
        <div
          className="mx-auto grid-video hero-animate-delay-2"
          style={{
            maxWidth: '1440rem',
            padding: '0 51rem',
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load more button - hide when 3 or fewer articles */}
        {articles.length > 3 && (
          <div className="flex justify-center" style={{ marginTop: '60rem' }}>
            <button
              className="btn-gold"
              style={{
                padding: '20rem 60rem',
                fontSize: '20rem',
                fontWeight: '500',
              }}
            >
              Завантажити ще
            </button>
          </div>
        )}
      </section>

      <Footer />

    </div>
    </EditorProvider>
  );
};

export default Articles;
