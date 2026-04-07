import { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import CommunityGallery from "@/components/CommunityGallery";
import AyaGuideSection from "@/components/AyaGuideSection";
import { usePublishedReviews, useAdminStore } from "@/admin/hooks/useAdminStore";
import { EditorProvider, EditableText, EditableImage } from "@/editor";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Відгуки
 * Figma ID: 703:2061
 */
const Reviews = () => {
  const reviews = usePublishedReviews();
  const fetchCollection = useAdminStore((s) => s.fetchCollection);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchCollection('reviews');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <EditorProvider pageId="reviews">
    <div className="relative min-h-screen" style={{ background: '#73BEEC', overflow: 'clip' }}>
      {/* Decorative clouds - тільки desktop */}
      {!isMobile && <PageClouds variant="full" />}

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="relative z-[2] page-hero">
        {/* Title */}
        <EditableText
          contentKey="reviews.hero.title"
          defaultValue="Відгуки моїх Сонечок"
          as="h1"
          className="text-center font-display italic page-hero-title hero-animate"
          style={{
            marginBottom: '80rem',
          }}
        />

        {/* Reviews Grid - responsive: 1 col mobile, 2 cols desktop */}
        <div
          className="mx-auto hero-animate-delay-1 grid grid-cols-1 lg:grid-cols-2"
          style={{
            maxWidth: '900rem',
            padding: '0 40rem',
            gap: '60rem 80rem',
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col items-center"
            >
              {/* Sun image */}
              <img
                src={review.sunImage || '/images/img/Rectangle.png'}
                alt="Сонечко"
                className="sun-rotate"
                style={{
                  width: '220rem',
                  height: '220rem',
                  objectFit: 'contain',
                }}
              />

              {/* Review text */}
              <p
                className="text-center"
                style={{
                  marginTop: '24rem',
                  fontSize: '18rem',
                  lineHeight: '1.6',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'pre-line',
                }}
              >
                {(review.text || '').replace(/\\n/g, '\n')}
              </p>

            </div>
          ))}
        </div>

        {/* Section: Спільнота Айа - shared component (with borders on Reviews) */}
        <section className="scroll-animate" style={{ paddingTop: '120rem' }}>
          <CommunityGallery showBorders />
        </section>

        {/* Section: Айа провідник Світла та Любові - shared component */}
        <section className="scroll-animate" style={{ paddingTop: '80rem', overflow: 'visible' }}>
          <AyaGuideSection contentKeyPrefix="reviews.aya" />
        </section>

        {/* Section: Message from Aya */}
        <section
          className="flex flex-col items-center"
          style={{ paddingTop: '80rem', paddingBottom: '120rem' }}
        >
          {/* Main heading */}
          <h2
            className="text-center"
            style={{
              maxWidth: '756rem',
              padding: '0 40rem',
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
            className="text-center"
            style={{
              maxWidth: '493rem',
              marginTop: '26rem',
              padding: '0 40rem',
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
            className="text-center"
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
    </EditorProvider>
  );
};

export default Reviews;
