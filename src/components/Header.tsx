import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Потоки", href: "/streams" },
  { label: "Медитації", href: "/meditations" },
  { label: "Книги", href: "/books" },
  { label: "Відео", href: "/videos" },
  { label: "Події", href: "/events" },
  { label: "Статті", href: "/articles" },
  { label: "Академія", href: "/academy" },
  { label: "Відгуки", href: "/reviews" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 header-animate ${mobileMenuOpen ? 'z-[60]' : 'z-50'}`} style={{ padding: '10rem 0' }}>
        {/* Blur backdrop */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: scrolled && !mobileMenuOpen ? 'rgba(180, 220, 245, 0.75)' : 'transparent',
            backdropFilter: scrolled && !mobileMenuOpen ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled && !mobileMenuOpen ? 'blur(16px)' : 'none',
          }}
        />

        <nav className="relative mx-auto w-full" style={{ maxWidth: '1440rem', padding: '0 20rem' }}>
          <div className="flex items-center justify-between" style={{ height: '73rem' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/images/logo.svg"
                alt="Aya Logo"
                style={{ height: '50rem', width: 'auto' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center" style={{ gap: '40rem' }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-sans text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                    style={{ fontSize: '17rem' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button - from Figma: 223x70px, radial gradient, blur 5 */}
            {/* Hidden on tablets (md-lg), shown only on lg+ */}
            <a
              href="https://ayapotiksvitla-academy.com/" target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center justify-center transition-all duration-200 hover:scale-105 cta-header btn-shimmer"
              style={{
                width: '200rem',
                height: '56rem',
                borderRadius: '68rem',
                background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
                backdropFilter: 'blur(5px)',
                boxShadow: '0px 1px 1px 0px rgba(193, 144, 96, 0.12), 0px 4px 15px 0px rgba(193, 144, 96, 0.11), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.79)',
              }}
            >
              <span className="font-sans text-white whitespace-nowrap" style={{ fontSize: '18rem' }}>
                Особистий кабінет
              </span>
            </a>

            {/* Mobile Menu Button — burger/close toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative text-white hover:bg-white/10 transition-colors z-[60]"
              style={{ padding: '8px', borderRadius: '8px', width: '44px', height: '44px' }}
              aria-label={mobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              <div className="relative" style={{ width: '24px', height: '24px', margin: '0 auto' }}>
                {/* Line 1 */}
                <span
                  className={`absolute left-0 block transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'bg-[#5A8BB5]' : 'bg-white'}`}
                  style={{
                    width: '24px',
                    height: '2px',
                    borderRadius: '1px',
                    top: mobileMenuOpen ? '11px' : '4px',
                    transform: mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                />
                {/* Line 2 */}
                <span
                  className={`absolute left-0 block transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'bg-[#5A8BB5]' : 'bg-white'}`}
                  style={{
                    width: '24px',
                    height: '2px',
                    borderRadius: '1px',
                    top: '11px',
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                {/* Line 3 */}
                <span
                  className={`absolute left-0 block transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'bg-[#5A8BB5]' : 'bg-white'}`}
                  style={{
                    width: '24px',
                    height: '2px',
                    borderRadius: '1px',
                    top: mobileMenuOpen ? '11px' : '18px',
                    transform: mobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)',
                  }}
                />
              </div>
            </button>
          </div>

        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay — outside header for correct stacking */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] overflow-hidden transition-all duration-400 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(180deg, #7EB6E6 0%, #A8D4F0 30%, #D4E9F7 60%, #E8F4FC 100%)',
        }}
      >
        {/* Decorative cloud — full width, not clipped */}
        <img
          src="/images/cloud-m.png"
          alt=""
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            maxWidth: 'none',
            opacity: 0.4,
          }}
        />

        {/* Menu content */}
        <div className="flex flex-col items-center justify-center h-full" style={{ padding: '0 24px' }}>
          {/* Navigation links */}
          <nav className="flex flex-col items-center w-full" style={{ gap: '20px' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-white hover:text-white/80 transition-colors duration-200"
                style={{
                  fontSize: '22px',
                  textShadow: '0 1px 8px rgba(255,255,255,0.3)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button — gold gradient like desktop */}
          <div style={{ marginTop: '36px' }}>
            <a
              href="https://ayapotiksvitla-academy.com/" target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center transition-all duration-200 hover:scale-105 btn-shimmer"
              style={{
                width: '220px',
                height: '52px',
                borderRadius: '68px',
                background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
                backdropFilter: 'blur(5px)',
                boxShadow: '0px 1px 1px 0px rgba(193, 144, 96, 0.12), 0px 4px 15px 0px rgba(193, 144, 96, 0.11), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.79)',
              }}
            >
              <span className="font-sans text-white whitespace-nowrap" style={{ fontSize: '17px' }}>
                Особистий кабінет
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
