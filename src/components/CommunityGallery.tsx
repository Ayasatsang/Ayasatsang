import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { EditableText } from "@/editor";

interface CommunityGalleryProps {
  showBorders?: boolean;
  className?: string;
}

const images = {
  column1: [
    { src: '/images/new_galley/DSC00393-1.png', height: '393rem' },
    { src: '/images/new_galley/1C1A1719-1.png', height: '393rem' },
    { src: '/images/new_galley/DSC00510-1.png', height: '393rem' },
  ],
  column2: [
    { src: '/images/new_galley/IMG_3252-1.png', height: '543rem' },
    { src: '/images/new_galley/IMG_3659-1.png', height: '543rem' },
  ],
  column3: [
    { src: '/images/new_galley/1C1A0723-1.png', height: '477rem' },
    { src: '/images/new_galley/IMG_1842-1.png', height: '477rem' },
    { src: '/images/new_galley/IMG_0110-1.png', height: '281rem' },
  ],
};

// Flat array for lightbox navigation
const allImages = [
  ...images.column1,
  ...images.column2,
  ...images.column3,
];

const CommunityGallery = ({ showBorders = true, className }: CommunityGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (src: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null));
  }, []);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allImages.length : null));
  }, []);

  const isOpen = lightboxIndex !== null;

  // Lock scroll — only when lightbox opens/closes, NOT on image navigation
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation — separate effect
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeLightbox, goPrev, goNext]);

  const imageContainerStyle = showBorders
    ? {
        borderRadius: '28rem',
        border: '2rem solid rgba(255, 255, 255, 0.41)',
        overflow: 'hidden' as const,
      }
    : {
        borderRadius: '28rem',
        overflow: 'hidden' as const,
      };

  return (
    <div className={cn("relative z-30", className)} style={{ paddingBottom: '120rem', overflow: 'visible' }}>
      {/* Section title */}
      <EditableText
        contentKey="community.title"
        defaultValue="Спільнота Айа"
        as="h2"
        className="section-title text-center font-display italic scroll-animate"
        style={{
          paddingTop: '80rem',
          paddingBottom: '60rem',
          letterSpacing: '-2rem',
          color: '#fff',
          textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
        }}
      />

      {/* Masonry Grid - 3 columns */}
      <div
        className="grid-masonry mx-auto scroll-animate"
        style={{ maxWidth: '1440rem', padding: '0 51rem' }}
      >
        {/* Column 1 */}
        <div className="flex flex-col" style={{ flex: 1, gap: '10rem' }}>
          {images.column1.map((img, index) => (
            <div key={index} style={{ ...imageContainerStyle, cursor: 'pointer' }} onClick={() => openLightbox(img.src)}>
              <img
                src={img.src}
                alt="Спільнота"
                style={{ width: '100%', height: img.height, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/380x300/D4E9F7/6AB4FF?text=Community';
                }}
              />
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col" style={{ flex: 1, gap: '10rem' }}>
          {images.column2.map((img, index) => (
            <div key={index} style={{ ...imageContainerStyle, cursor: 'pointer' }} onClick={() => openLightbox(img.src)}>
              <img
                src={img.src}
                alt="Спільнота"
                style={{ width: '100%', height: img.height, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/380x400/D4E9F7/6AB4FF?text=Community';
                }}
              />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col" style={{ flex: 1, gap: '10rem' }}>
          {images.column3.map((img, index) => (
            <div key={index} style={{ ...imageContainerStyle, cursor: 'pointer' }} onClick={() => openLightbox(img.src)}>
              <img
                src={img.src}
                alt="Спільнота"
                style={{ width: '100%', height: img.height, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/380x350/D4E9F7/6AB4FF?text=Community';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay — rendered via portal to escape stacking context */}
      {lightboxIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.9)', touchAction: 'none', overscrollBehavior: 'none' }}
          onClick={closeLightbox}
          onTouchMove={(e) => e.preventDefault()}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute text-white/70 hover:text-white transition-colors"
            style={{ top: '24px', right: '24px', fontSize: '40px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
          >
            &times;
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute text-white/70 hover:text-white transition-colors"
            style={{ left: '24px', fontSize: '48px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', top: '50%', transform: 'translateY(-50%)' }}
          >
            &#8249;
          </button>

          {/* Image */}
          <img
            src={allImages[lightboxIndex].src}
            alt="Спільнота"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }}
          />

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute text-white/70 hover:text-white transition-colors"
            style={{ right: '24px', fontSize: '48px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', top: '50%', transform: 'translateY(-50%)' }}
          >
            &#8250;
          </button>

          {/* Counter */}
          <div
            className="absolute left-1/2 -translate-x-1/2 text-white/60"
            style={{ bottom: '24px', fontSize: '14px' }}
          >
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CommunityGallery;
