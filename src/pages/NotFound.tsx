import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { EditorProvider } from "@/editor";

/**
 * 404 Page
 * Figma ID: 687:18
 * Розмір: 1440x1748
 */
const NotFound = () => {
  return (
    <EditorProvider pageId="not-found">
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#73BEEC' }}
    >
      {/* Decorative clouds - top positioned */}
      <PageClouds variant="404" />

      {/* Header */}
      <header className="relative z-50" style={{ paddingTop: '25rem' }}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
        <nav className="relative mx-auto w-full" style={{ maxWidth: '1440rem', padding: '0 51rem' }}>
          <div className="flex items-center justify-between" style={{ height: '73rem' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/images/logo.svg"
                alt="Aya Logo"
                style={{ height: '50rem', width: 'auto' }}
              />
            </Link>

            {/* Navigation */}
            <ul className="hidden lg:flex items-center" style={{ gap: '40rem' }}>
              {[
                { label: "Потоки", href: "/#streams" },
                { label: "Академії", href: "/#academies" },
                { label: "Книги/Медитації", href: "/#books" },
                { label: "Події", href: "/#events" },
                { label: "Статті", href: "/#articles" },
                { label: "Відгуки", href: "/#reviews" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                    style={{ fontSize: '17rem' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="/#cabinet"
              className="hidden lg:flex items-center justify-center transition-all duration-200 hover:scale-105 btn-shimmer"
              style={{
                width: '223rem',
                height: '70rem',
                borderRadius: '68rem',
                background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 1rem 1rem 0 rgba(193, 144, 96, 0.12), 0 4rem 15rem 0 rgba(193, 144, 96, 0.11), inset 0 1rem 1rem 0 rgba(255, 255, 255, 0.79)',
              }}
            >
              <span className="font-sans text-white whitespace-nowrap" style={{ fontSize: '18rem' }}>
                Особистий кабінет
              </span>
            </a>
          </div>
        </nav>
      </header>


      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10" style={{ paddingTop: '50rem' }}>
        {/* 404 Text - with gradient */}
        <h1
          className="font-display italic text-center"
          style={{
            fontSize: '280rem',
            lineHeight: '0.76',
            letterSpacing: '1%',
            background: 'linear-gradient(101deg, rgba(255, 255, 255, 1) 6%, rgba(208, 236, 255, 1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        {/* Subtitle - with gradient */}
        <p
          className="font-display italic text-center"
          style={{
            fontSize: '115rem',
            lineHeight: '0.84',
            letterSpacing: '1%',
            marginTop: '20rem',
            background: 'linear-gradient(101deg, rgba(255, 255, 255, 1) 6%, rgba(208, 236, 255, 1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Сторінку<br />не знайдено
        </p>

        {/* Button - exact Figma styles */}
        <Link
          to="/"
          className="flex items-center justify-center transition-all duration-300 hover:scale-105 btn-shimmer"
          style={{
            width: '348rem',
            height: '93rem',
            borderRadius: '68rem',
            marginTop: '80rem',
            background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 1rem 1rem 0 rgba(193, 144, 96, 0.12), 0 4rem 15rem 0 rgba(193, 144, 96, 0.11), inset 0 1rem 1rem 0 rgba(255, 255, 255, 0.79)',
          }}
        >
          <span className="font-sans text-white" style={{ fontSize: '18rem', letterSpacing: '-1%' }}>
            Перейти на головну
          </span>
        </Link>
      </main>

      <Footer />
    </div>
    </EditorProvider>
  );
};

export default NotFound;
