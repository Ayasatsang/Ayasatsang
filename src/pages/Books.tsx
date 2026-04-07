import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import AyaGuideSection from "@/components/AyaGuideSection";
import { EditorProvider, EditableText, EditableImage } from "@/editor";

const AUDIO_SRC = "/audio/sample.mp3";

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/**
 * Книги
 * Figma ID: 703:1763
 */
const Books = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };
  const bookChapters = [
    "Пошук Бога. Хто ми? Вища Душа та Душа людини. Подорож на Землю.",
    "Повернення Додому та Єдність.",
    "Вищі Тіла та Пробудження.",
    "Пам'ять Душі.",
    "Розширення Свідомості.",
    "Тіло Світла- Нове Життя.",
    "Жити Серцем.",
    "Тіло Вознесіння.",
    "Перехід Свідомості- Стати Світлом.",
    "Бути з Богом на Землі + Пісня Перемоги.",
  ];

  return (
    <EditorProvider pageId="books">
    <Helmet>
      <title>Книги | Айа</title>
      <meta name="description" content="Книги духовного наставника Айа." />
    </Helmet>
    <div className="relative min-h-screen" style={{ background: '#73BEEC', overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="default" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="relative z-[2] page-hero">
        {/* Title */}
        <EditableText
          contentKey="books.hero.title"
          defaultValue="Книги"
          as="h1"
          className="text-center font-display italic page-hero-title hero-animate"
          style={{
            marginBottom: '80rem',
          }}
        />

        {/* First Book Section */}
        <section
          className="mx-auto hero-animate-delay-1"
          style={{
            maxWidth: '1200rem',
            padding: '0 20rem 80rem',
          }}
        >
          <div className="book-intro">
            {/* Left column - Text */}
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <h2
                className="book-intro-title"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '40rem',
                  fontWeight: 600,
                  lineHeight: '1.26',
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  marginBottom: '24rem',
                }}
              >
                КНИГА - "НОВА ЗЕМЛЯ."
              </h2>

              <div
                className="book-intro-text"
                style={{
                  fontSize: '16rem',
                  lineHeight: '1.4',
                  color: '#fff',
                }}
              >
                <p style={{ marginBottom: '0' }}>
                  Мої Любі Сонечки, що Святу Книгу, яку я Прийняла в Потоці Творця та Його Світла- Присвятила Богу і вам, мої Любі Українці.
                </p>
                <p style={{ marginBottom: '0' }}>
                  Надзвичайно Висока вібрація кожного звуку, яка розкриває Серця та підіймає до Небес вашу Душу.
                </p>
                <p style={{ marginBottom: '0' }}>
                  Високі Знання та Перехід вашої Душі.
                </p>
                <p style={{ marginBottom: '0' }}>
                  Ви згадаєте, хто ви і чому ви саме зараз тут на Землі.
                </p>
                <p style={{ marginBottom: '0' }}>
                  Що таке Зцілення і як вийти зі своїх старих Ілюзій?
                </p>
                <p style={{ marginBottom: '0' }}>
                  3 години 45 хвилин - Чистої Любові та Світла!
                </p>
                <p style={{ marginBottom: '24rem' }}>
                  Високий студійний звук та музика.
                </p>

                {/* Book Contents */}
                <h3
                  style={{
                    fontSize: '20rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '16rem',
                  }}
                >
                  Склад книги
                </h3>

                <div
                  style={{
                    fontSize: '16rem',
                    lineHeight: '1.5',
                    color: '#fff',
                    marginBottom: '32rem',
                  }}
                >
                  {bookChapters.map((chapter, index) => (
                    <p key={index} style={{ marginBottom: '2rem' }}>
                      {index + 1}. {chapter}
                    </p>
                  ))}
                </div>

                {/* Audio Sample Player */}
                <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />
                <div
                  className="flex items-center"
                  style={{
                    width: '100%',
                    maxWidth: '520rem',
                    height: '69rem',
                    gap: '16rem',
                    marginBottom: '24rem',
                    padding: '0 16rem',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '24rem',
                    border: '1rem solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 3.65rem 5.48rem -3.65rem rgba(253, 186, 114, 0.05), 0 9.14rem 13.7rem -2.74rem rgba(253, 186, 114, 0.05)',
                  }}
                >
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    style={{
                      width: '44rem',
                      height: '44rem',
                      borderRadius: '50%',
                      background: '#fff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    {isPlaying ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#73BEEC">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#73BEEC">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </button>

                  {/* Audio Info + Progress */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '16rem', color: '#fff', fontWeight: 600 }}>
                      Зразок Аудіозапису
                    </p>
                    {/* Progress bar */}
                    <div
                      onClick={handleSeek}
                      style={{
                        width: '100%',
                        height: '4rem',
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        marginTop: '6rem',
                      }}
                    >
                      <div
                        style={{
                          width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                          height: '100%',
                          background: '#fff',
                          borderRadius: '2rem',
                          transition: 'width 0.1s linear',
                        }}
                      />
                    </div>
                  </div>

                  {/* Duration / Current Time */}
                  <span style={{ fontSize: '14rem', color: '#fff', flexShrink: 0 }}>
                    {duration > 0 ? formatTime(currentTime) : '0:00'} / {duration > 0 ? formatTime(duration) : '—'}
                  </span>
                </div>

                {/* Open Button */}
                <button
                  className="btn-gold"
                  style={{
                    padding: '16rem 48rem',
                    fontSize: '18rem',
                    fontWeight: '500',
                  }}
                >
                  Відкрити
                </button>
              </div>
            </div>

            {/* Right column - Book Cover */}
            <div
              className="book-intro-image"
              style={{
                flex: '0 0 auto',
                width: '480rem',
                position: 'relative',
              }}
            >
              {/* Book Cover Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '16rem',
                  overflow: 'hidden',
                  boxShadow: '0 20rem 60rem rgba(255, 255, 255, 0.4)',
                }}
              >
                {/* Book Cover Image */}
                <img
                  src="/images/book-1.png"
                  alt="Нова Земля"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Айа провідник Світла та Любові - shared component */}
        <section style={{ paddingTop: '80rem', overflow: 'visible' }}>
          <AyaGuideSection contentKeyPrefix="books.aya" />
        </section>

        {/* Message Section */}
        <section
          className="flex flex-col items-center"
          style={{ paddingTop: '80rem', paddingBottom: '80rem' }}
        >
          {/* Message text */}
          <p
            className="text-center"
            style={{
              maxWidth: '600rem',
              padding: '0 40rem',
              fontSize: '18rem',
              lineHeight: '1.6',
              color: '#fff',
              marginBottom: '60rem',
            }}
          >
            Рідні, всі ці практики глибоко наповнені й приходять<br />
            через портал мого Серця в єдності з Джерелом.
          </p>

          {/* Logo */}
          <div style={{ marginBottom: '40rem' }}>
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
              fontSize: '20rem',
              fontWeight: 500,
              lineHeight: '1.6',
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

export default Books;
