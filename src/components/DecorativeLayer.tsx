/**
 * DecorativeLayer - шар для декоративних елементів (хмарки)
 *
 * Z-INDEX СИСТЕМА:
 * - z-1:    Хмарки (декоративний фон, ПІД контентом)
 * - z-5:    Hero background (bg.png)
 * - z-6:    Sunshine glow
 * - z-3:    Текст секцій
 * - z-4:    Дівчинка (над текстом)
 * - z-20:   Light beams (в Index.tsx)
 * - z-50:   Header (fixed)
 */

const DecorativeLayer = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Main hero background - full height, flows into next section */}
      <img
        src="/images/bg.png"
        alt=""
        className="hero-bg-image absolute left-0 right-0 z-[5]"
        style={{
          top: '0',
          width: '100%',
          height: 'auto',
        }}
      />

      {/* Cloud between Потоки Айа and Події */}
      <img
        src="/images/cloud-m.png"
        alt=""
        className="hide-tablet absolute left-0 right-0 z-[1]"
        style={{
          top: 'calc(100vh + 400rem)',
          width: '100%',
          height: 'auto',
        }}
      />

      {/* Cloud-M #2 - копія біля футера */}
      <img
        src="/images/cloud-m.png"
        alt=""
        className="hide-tablet absolute left-0 right-0 z-[1]"
        style={{
          top: '8400rem',
          width: '100%',
          height: 'auto',
          opacity: '0.5',
        }}
      />

      {/* Cloud-L under Академії section - centered, full width */}
      <img
        src="/images/cloud-l.png"
        alt=""
        className="hide-tablet absolute left-0 right-0 z-[1]"
        style={{
          top: '2700rem',
          width: '100%',
          height: 'auto',
          opacity: '1',
        }}
      />

      {/* Cloud-L #2 - копія для окремого позиціонування */}
      <img
        src="/images/cloud-l.png"
        alt=""
        className="hide-tablet absolute left-0 right-0 z-[1]"
        style={{
          top: '5300rem',
          width: '100%',
          height: 'auto',
          opacity: '1',
        }}
      />
    </div>
  );
};

export default DecorativeLayer;
