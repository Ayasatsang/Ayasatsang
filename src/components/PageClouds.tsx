/**
 * PageClouds - декоративні елементи для внутрішніх сторінок
 *
 * Включає хмари, діаманти та світлові ефекти з головної сторінки.
 * Z-index: хмари 1, light 20, діаманти 35
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface PageCloudsProps {
  /** Варіант розміщення хмарок */
  variant?: 'default' | 'minimal' | 'full' | '404';
}

// Desktop clouds - full width (тільки для екранів >1024px)
const desktopClouds = [
  { src: 'cloud-m.png', top: '300rem', opacity: 0.4 },
  { src: 'cloud-l.png', top: '400rem', opacity: 0.35 },
];

const PageClouds = ({ variant = 'default' }: PageCloudsProps) => {
  const showDecorations = variant !== 'minimal' && variant !== '404';

  // Scroll-triggered анімації
  useScrollAnimation();

  // Спеціальний варіант для 404 сторінки
  if (variant === '404') {
    return (
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Cloud left - верхній лівий кут */}
        <img
          src="/images/cloud-left-404.png"
          alt=""
          className="hide-tablet absolute"
          style={{
            top: '-20rem',
            left: '-60rem',
            width: '400rem',
            height: 'auto',
          }}
        />
        {/* Cloud right - верхній правий кут */}
        <img
          src="/images/cloud-right-404.png"
          alt=""
          className="hide-tablet absolute"
          style={{
            top: '-60rem',
            right: '-20rem',
            width: '350rem',
            height: 'auto',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Desktop clouds - ховаємо на tablet/mobile */}
      {desktopClouds.map((cloud, index) => (
        <img
          key={`desktop-cloud-${index}`}
          src={`/images/${cloud.src}`}
          alt=""
          className="hide-tablet absolute left-0 right-0"
          style={{
            top: cloud.top,
            width: '100%',
            height: 'auto',
            opacity: cloud.opacity,
          }}
        />
      ))}

      {/* Додаткова хмара для full варіанту - тільки desktop */}
      {variant === 'full' && (
        <img
          src="/images/cloud-m.png"
          alt=""
          className="hide-tablet absolute left-0 right-0"
          style={{
            top: '3200rem',
            width: '100%',
            height: 'auto',
            opacity: 0.3,
          }}
        />
      )}


      {/* Бокові діаманти (тільки desktop, ховаємо на tablet) */}
      {showDecorations && (
        <>
          <img
            src="/images/diamant-1.png"
            alt=""
            className="hide-tablet absolute scroll-animate-left"
            style={{
              left: '0',
              top: '100rem',
              width: '180rem',
              height: 'auto',
              zIndex: 35,
            }}
          />
          <img
            src="/images/diamant-2.png"
            alt=""
            className="hide-tablet absolute scroll-animate-right"
            style={{
              right: '0',
              top: '100rem',
              width: '180rem',
              height: 'auto',
              zIndex: 35,
            }}
          />
        </>
      )}
    </div>
  );
};

export default PageClouds;
