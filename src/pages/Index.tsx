import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import EventSlider from "@/components/EventSlider";
import DecorativeLayer from "@/components/DecorativeLayer";
import CommunityGallery from "@/components/CommunityGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import AyaGuideSection from "@/components/AyaGuideSection";
import Footer from "@/components/Footer";
import { EditorProvider, EditableText, EditableLink } from "@/editor";
import { useAdminStore, useMeditationBlocks, usePublishedAcademy } from "@/admin/hooks/useAdminStore";
import { supabase } from "@/lib/supabase";
import type { MeditationBlock } from "@/admin/types";

const defaultBlockImages = [
  '/images/img/Rectangle-8418.png',
  '/images/img/Rectangle-8418-1.png',
  '/images/img/Rectangle-8418-2.png',
  '/images/img/Rectangle-8418-3.png',
  '/images/img/Rectangle-8418-4.png',
];

const Index = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth > 768 && window.innerWidth <= 1024);
  const [isLargeDesktop, setIsLargeDesktop] = useState(() => window.innerWidth >= 1440);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 1024);
      setIsTablet(w > 768 && w <= 1024);
      setIsLargeDesktop(w >= 1440);
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fetchCollection = useAdminStore((state) => state.fetchCollection);
  const allBlocks = useMeditationBlocks();
  const academyItems = usePublishedAcademy();
  const [academyTagsMap, setAcademyTagsMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchCollection('meditation_blocks');
    fetchCollection('academy');
    fetchCollection('tags');
  }, [fetchCollection]);

  // Fetch tags for academy items from junction table
  useEffect(() => {
    if (academyItems.length === 0) return;
    const fetchAcademyTags = async () => {
      const ids = academyItems.map((e) => e.id);
      const { data, error } = await supabase
        .from('academy_tags')
        .select('academy_id, tags(name)')
        .in('academy_id', ids);
      if (error || !data) return;
      const tagsMap: Record<string, string[]> = {};
      for (const row of data as any[]) {
        const id = row.academy_id;
        if (!tagsMap[id]) tagsMap[id] = [];
        if (row.tags?.name) tagsMap[id].push(row.tags.name);
      }
      setAcademyTagsMap(tagsMap);
    };
    fetchAcademyTags();
  }, [academyItems]);

  const publishedBlocks = allBlocks
    .filter((b: MeditationBlock) => b.status === 'published')
    .sort((a, b) => (a.order || a.blockNumber) - (b.order || b.blockNumber));

  // Scroll-triggered animations
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

    // Observe all elements with scroll-animate classes
    const animationSelectors = [
      '.scroll-animate',
      '.scroll-animate-left',
      '.scroll-animate-right',
      '.scroll-animate-scale',
      '.scroll-animate-rotate',
      '.scroll-animate-float',
      '.scroll-animate-sparkle',
      '.scroll-animate-crystal'
    ];

    document.querySelectorAll(animationSelectors.join(', ')).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <EditorProvider pageId="index">
    <div className="relative">

      {/* Decorative Layer - хмарки та декоративні елементи, які перетікають між секціями */}
      <DecorativeLayer />

      {/* Diamond decorations - at root level, above clouds */}
      <img
        src="/images/diamant-1.png"
        alt=""
        className="hide-tablet absolute pointer-events-none z-[35] scroll-animate-left"
        style={{
          left: '0',
          top: 'calc(100vh + 280rem)',
          width: '200rem',
          height: 'auto',
        }}
      />
      <img
        src="/images/diamant-2.png"
        alt=""
        className="hide-tablet absolute pointer-events-none z-[35] scroll-animate-right delay-2"
        style={{
          right: '0',
          top: 'calc(100vh + 280rem)',
          width: '200rem',
          height: 'auto',
        }}
      />


      {/* Hero Section */}
      <div className="relative h-screen hero-section" style={isMobile ? { height: 'auto', minHeight: 'unset' } : undefined}>

        {/* Header */}
        <Header />

        {/* Main hero content */}
        <div className="relative z-[30] flex flex-col items-center">
          {/* Hero title from Figma - top: 107px */}
          <div
            className="relative text-center hero-animate w-full hero-title-wrapper"
            style={{ marginTop: '72rem', padding: '0 40rem' }}
          >
            <EditableText
              contentKey="index.hero.title"
              defaultValue="Вітаю у просторі,<br />де веде Серце"
              as="h1"
              multiline
              className="hero-title italic text-center"
              style={{
                fontFamily: "'Brush Script MT', 'Marck Script', cursive",
                lineHeight: '1.29',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(180deg, #74A9FF 0%, #66C2FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            />
          </div>
        </div>

        {/* Cat - mobile only, near hero woman */}
        <img
          src="/images/cat.png"
          alt="Котик"
          className="hero-mobile-cat"
          style={{
            position: 'absolute',
            right: '15rem',
            bottom: '35rem',
            width: '90rem',
            height: 'auto',
            zIndex: 100,
          }}
        />

        {/* Mobile hero composited image - woman + cat + sky + clouds */}
        <img
          src="/images/Mobile-hero.png"
          alt="Айа"
          className="hero-mobile-image"
          style={isMobile ? { marginTop: '-300rem' } : undefined}
        />

      </div>

      {/* Section 2: Потоки Айа */}
      <div id="streams" className="relative" style={isTablet ? { marginTop: '120rem' } : isMobile ? { marginTop: '-220rem' } : isLargeDesktop ? { marginTop: '-120rem' } : undefined}>
        {/* Section title */}
        <EditableText
          contentKey="index.streams.title"
          defaultValue="Потоки Айа"
          as="h2"
          className="section-title text-center font-display italic scroll-animate relative z-[35]"
          style={{
            paddingTop: '120rem',
            letterSpacing: '-2rem',
            background: 'linear-gradient(180deg, #80A5FF 0%, #34D1FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        />

        {/* Cards grid */}
        <div
          className="grid-social relative mx-auto justify-items-center scroll-animate z-[35]"
          style={{
            maxWidth: '1320rem',
            gap: '24rem',
            padding: '60rem 40rem 50rem',
          }}
        >
          {/* YouTube Card */}
          <div
            className="flex flex-col justify-between w-full card-hover cursor-pointer scroll-animate-scale"
            style={{
              maxWidth: '306rem',
              minHeight: '274rem',
              borderRadius: '24rem',
              border: '2rem solid rgba(255, 255, 255, 0.41)',
              padding: '32rem',
              background: 'linear-gradient(180deg, #95D3FF 0%, #6AB4FF 100%)',
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: '16rem', marginBottom: '16rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <EditableText
                  contentKey="index.streams.youtube.title"
                  defaultValue="YouTube"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="index.streams.youtube.description"
                defaultValue="Ефіри, практики, безкоштовні відео"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="index.streams.youtube.button"
              defaultText="Дивитись"
              defaultUrl="https://youtube.com/@ayaayapotiksvitla"
              className="w-full text-center"
              style={{
                padding: '14rem 24rem',
                borderRadius: '16rem',
                border: '2rem solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '16rem',
                fontWeight: '500',
              }}
            />
          </div>

          {/* Spotify Card */}
          <div
            className="flex flex-col justify-between w-full card-hover cursor-pointer scroll-animate-scale delay-1"
            style={{
              maxWidth: '306rem',
              minHeight: '274rem',
              borderRadius: '24rem',
              border: '2rem solid rgba(255, 255, 255, 0.41)',
              padding: '32rem',
              background: 'linear-gradient(180deg, #A8D4FF 0%, #7BB8FF 100%)',
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: '16rem', marginBottom: '16rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <EditableText
                  contentKey="index.streams.spotify.title"
                  defaultValue="Spotify"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="index.streams.spotify.description"
                defaultValue="Подкасти та медитації"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="index.streams.spotify.button"
              defaultText="Слухати"
              defaultUrl="https://open.spotify.com/show/69WQbL74d94M7A6S4219da"
              className="w-full text-center"
              style={{
                padding: '14rem 24rem',
                borderRadius: '16rem',
                border: '2rem solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '16rem',
                fontWeight: '500',
              }}
            />
          </div>

          {/* Instagram Card */}
          <div
            className="flex flex-col justify-between w-full card-hover cursor-pointer scroll-animate-scale delay-2"
            style={{
              maxWidth: '306rem',
              minHeight: '274rem',
              borderRadius: '24rem',
              border: '2rem solid rgba(255, 255, 255, 0.41)',
              padding: '32rem',
              background: 'linear-gradient(135deg, #C9B0FF 0%, #6DB5FF 100%)',
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: '16rem', marginBottom: '16rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <EditableText
                  contentKey="index.streams.instagram.title"
                  defaultValue="Instagram"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="index.streams.instagram.description"
                defaultValue="Короткі відео, натхнення щодня"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="index.streams.instagram.button"
              defaultText="Надихатись"
              defaultUrl="https://www.instagram.com/aya_aya_potoksveta"
              className="w-full text-center"
              style={{
                padding: '14rem 24rem',
                borderRadius: '16rem',
                border: '2rem solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '16rem',
                fontWeight: '500',
              }}
            />
          </div>

          {/* TikTok Card */}
          <div
            className="flex flex-col justify-between w-full card-hover cursor-pointer scroll-animate-scale delay-3"
            style={{
              maxWidth: '306rem',
              minHeight: '274rem',
              borderRadius: '24rem',
              border: '2rem solid rgba(255, 255, 255, 0.41)',
              padding: '32rem',
              background: 'linear-gradient(135deg, #B8C4FF 0%, #7DB8FF 100%)',
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: '16rem', marginBottom: '16rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                <EditableText
                  contentKey="index.streams.tiktok.title"
                  defaultValue="TikTok"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="index.streams.tiktok.description"
                defaultValue="Короткі відео, натхнення щодня"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="index.streams.tiktok.button"
              defaultText="Дивитись"
              defaultUrl="https://www.tiktok.com/@ayapotoksveta"
              className="w-full text-center"
              style={{
                padding: '14rem 24rem',
                borderRadius: '16rem',
                border: '2rem solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '16rem',
                fontWeight: '500',
              }}
            />
          </div>
        </div>

      </div>

      {/* Section 3: Події */}
      <div id="events" className="relative z-[30]" style={{ paddingBottom: '20rem', paddingTop: '0' }}>
        {/* Section title */}
        <EditableText
          contentKey="index.events.title"
          defaultValue="Події"
          as="h2"
          className="section-title text-center font-display italic scroll-animate"
          style={{
            paddingTop: '100rem',
            paddingBottom: '60rem',
            letterSpacing: '-2rem',
            color: '#fff',
            textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
          }}
        />

        {/* Event Slider */}
        <EventSlider />

        {/* Crystal decorations at bottom of Events section */}
        <img
          src="/images/crystal-3.png"
          alt=""
          className="absolute pointer-events-none z-[35] scroll-animate-crystal"
          style={{
            left: '-30rem',
            bottom: '10rem',
            width: '200rem',
            height: 'auto',
          }}
        />
        <img
          src="/images/crystal-4.png"
          alt=""
          className="absolute pointer-events-none z-[35] scroll-animate-crystal delay-3"
          style={{
            right: '-25rem',
            bottom: '200rem',
            width: '200rem',
            height: 'auto',
          }}
        />
      </div>

      {/* Section 4: Академії */}
      <div id="academies" className="relative bg-[#73BEEC]" style={{ paddingBottom: '120rem' }}>
        {/* Section title */}
        <EditableText
          contentKey="index.academies.title"
          defaultValue="Академії"
          as="h2"
          className="relative z-30 section-title text-center font-display italic scroll-animate"
          style={{
            paddingTop: '80rem',
            paddingBottom: '80rem',
            letterSpacing: '-2rem',
            color: '#fff',
            textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
          }}
        />

        {/* Course cards container - relative positioning like Figma */}
        {(() => {
          const visibleItems = academyItems.filter((item) => item.showOnIndex !== false).slice(0, 3);
          // Bottom edge of each card position: [442, 620, 1000]
          const containerHeights = ['500rem', '680rem', '1050rem'];
          const containerHeight = containerHeights[visibleItems.length - 1] || '1050rem';
          return (
        <div className="academy-container scroll-animate relative z-30" style={{ height: containerHeight }}>

          {visibleItems.map((item, index) => {
            const tags = academyTagsMap[item.id] || item.tags || [];
            const cardPositions = [
              { left: '0', top: '0', width: '483rem', height: '442rem' },
              { left: '558rem', top: '100rem', width: '483rem', height: '520rem' },
              { left: '0', top: '520rem', width: '483rem', height: '480rem' },
            ];
            const cardStyle = cardPositions[index] || cardPositions[0];

            return (
              <div key={item.id} className="academy-card absolute" style={cardStyle}>
                <div className="academy-flip-inner">
                  {/* Front - Image */}
                  <div className="academy-flip-front">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      style={{ transform: 'scale(1.1)' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/483x442/D4E9F7/6AB4FF?text=Academy`;
                      }}
                    />
                  </div>

                  {/* Back - Content */}
                  <div
                    className="academy-flip-back academy-card-content flex flex-col justify-between"
                    style={{
                      padding: '32rem 38rem',
                      background: '#C79F61',
                      backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.435) 0%, rgba(255,255,255,0) 70%)',
                      boxShadow: '0px 1rem 1rem rgba(94,76,34,0.12), 0px 5rem 18rem rgba(124,115,97,0.11), inset 0px 1rem 1rem rgba(255,255,255,0.79)',
                    }}
                  >
                    <div>
                      <h3
                        className="font-serif italic"
                        style={{
                          fontSize: '24rem',
                          lineHeight: '1.115',
                          letterSpacing: '-0.02em',
                          color: '#fff',
                          marginBottom: '20rem',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '18rem',
                          lineHeight: '1.44',
                          letterSpacing: '-0.01em',
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginBottom: '24rem',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {(item.description || '').replace(/\\n/g, '\n')}
                      </p>

                      {/* Tags — hidden on mobile */}
                      <div className="hidden lg:flex flex-wrap" style={{ gap: '12rem' }}>
                        {tags.map((tag: string) => (
                          <span
                            key={tag}
                            style={{
                              padding: '8rem 23rem',
                              borderRadius: '70rem',
                              border: 'none',
                              background: 'rgba(255, 255, 255, 0.16)',
                              color: '#fff',
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '17rem',
                              lineHeight: '1.73',
                              letterSpacing: '-0.02em',
                              fontWeight: '500',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <Link to={`/academy/${item.slug || item.id}`} className="btn-gold inline-flex items-center justify-center" style={{
                        width: '207rem',
                        height: '52rem',
                        borderRadius: '68rem',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16rem',
                        fontWeight: '500',
                        color: '#fff',
                        textDecoration: 'none',
                      }}>
                      Детальніше
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
          );
        })()}

        {/* Айа провідник Світла та Любові - shared component */}
        <AyaGuideSection contentKeyPrefix="index.academies" className="z-[6]" />

        {/* Медітації - same section */}
        <EditableText
          contentKey="index.meditations.title"
          defaultValue="Медитації"
          as="h2"
          className="relative z-30 section-title text-center font-display italic scroll-animate"
          style={{
            marginTop: '50rem',
            paddingTop: '50rem',
            paddingBottom: '60rem',
            letterSpacing: '-2rem',
            color: '#fff',
            textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
          }}
        />

        {/* Meditation cards grid - CMS powered */}
        <div
          className="grid-content mx-auto scroll-animate relative z-30"
          style={{ maxWidth: '1200rem', padding: '0 60rem', gap: '32rem' }}
        >
          {publishedBlocks.slice(0, 2).map((block, index) => (
            <Link
              key={block.id}
              to={`/meditations/${block.blockNumber}`}
              className="block-card"
              style={{
                padding: '24rem',
                borderRadius: '20rem',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,220,245,0.3) 100%)',
                border: '1rem solid rgba(255,255,255,0.4)',
                textDecoration: 'none',
              }}
            >
              <img
                src={block.image || defaultBlockImages[index % defaultBlockImages.length]}
                alt={block.title}
                className="block-card-image"
                style={{
                  width: '130rem',
                  height: '150rem',
                  borderRadius: '12rem',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultBlockImages[index % defaultBlockImages.length];
                }}
              />
              <div className="flex flex-col block-card-content" style={{ flex: 1, gap: '8rem' }}>
                <span
                  className="font-display italic"
                  style={{ fontSize: '24rem', color: '#fff' }}
                >
                  {block.blockNumber} Блок
                </span>
                <h3
                  style={{
                    fontSize: '18rem',
                    fontWeight: 600,
                    color: '#fff',
                    textTransform: 'uppercase',
                    lineHeight: '1.3',
                  }}
                >
                  {block.title}
                </h3>
                <div className="flex items-center block-card-actions" style={{ gap: '16rem', marginTop: '8rem' }}>
                  <span
                    className="btn-gold"
                    style={{
                      padding: '10rem 32rem',
                      fontSize: '16rem',
                    }}
                  >
                    Відкрити
                  </span>
                  {block.duration && (
                    <div className="flex items-center" style={{ gap: '8rem' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                      </svg>
                      <span style={{ fontSize: '16rem', color: '#fff' }}>{block.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all meditations button */}
        <div className="flex justify-center relative z-30 scroll-animate" style={{ marginTop: '40rem' }}>
          <Link
            to="/meditations"
            className="btn-gold inline-flex items-center justify-center"
            style={{
              padding: '16rem 48rem',
              fontSize: '18rem',
              fontWeight: '500',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            Подивитись всі медитації
          </Link>
        </div>

        {/* Книги - same section */}
        <EditableText
          contentKey="index.books.title"
          defaultValue="Книги"
          as="h2"
          className="relative z-30 section-title text-center font-display italic scroll-animate"
          style={{
            paddingTop: '80rem',
            paddingBottom: '60rem',
            letterSpacing: '-2rem',
            color: '#fff',
            textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
          }}
        />

        {/* Books cards - 2 columns, same layout as meditation cards */}
        <div
          className="grid-content mx-auto scroll-animate relative z-30"
          style={{ maxWidth: '1200rem', padding: '0 60rem', gap: '32rem' }}
        >
          {/* Card 1 */}
          <div
            className="block-card"
            style={{
              padding: '24rem',
              borderRadius: '20rem',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,220,245,0.3) 100%)',
              border: '1rem solid rgba(255,255,255,0.4)',
            }}
          >
            <img
              src="/images/img/Rectangle-8418-1.png"
              alt="Нова Земля"
              className="block-card-image"
              style={{
                width: '130rem',
                height: '150rem',
                borderRadius: '12rem',
                objectFit: 'cover',
                flexShrink: 0,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/130x150/D4E9F7/6AB4FF?text=Book';
              }}
            />
            <div className="flex flex-col block-card-content" style={{ flex: 1, gap: '8rem' }}>
              <h3
                className="font-display italic"
                style={{ fontSize: '24rem', color: '#fff' }}
              >
                "Нова Земля"
              </h3>
              <div className="flex items-center" style={{ gap: '12rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span style={{ fontSize: '16rem', color: '#fff' }}>Аудіо</span>
              </div>
              <div className="flex items-center" style={{ gap: '12rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span style={{ fontSize: '16rem', color: '#fff' }}>Друкований формат</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="block-card"
            style={{
              padding: '24rem',
              borderRadius: '20rem',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,220,245,0.3) 100%)',
              border: '1rem solid rgba(255,255,255,0.4)',
            }}
          >
            <img
              src="/images/img/Rectangle-8418-4.png"
              alt="Нова Земля"
              className="block-card-image"
              style={{
                width: '130rem',
                height: '150rem',
                borderRadius: '12rem',
                objectFit: 'cover',
                flexShrink: 0,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/130x150/D4E9F7/6AB4FF?text=Book';
              }}
            />
            <div className="flex flex-col block-card-content" style={{ flex: 1, gap: '8rem' }}>
              <h3
                className="font-display italic"
                style={{ fontSize: '24rem', color: '#fff' }}
              >
                "Нова Земля"
              </h3>
              <div className="flex items-center" style={{ gap: '12rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span style={{ fontSize: '16rem', color: '#fff' }}>Аудіо</span>
              </div>
              <div className="flex items-center" style={{ gap: '12rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span style={{ fontSize: '16rem', color: '#fff' }}>Друкований формат</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Спільнота Айа - shared component (no borders on Index) */}
      <CommunityGallery showBorders={false} />

      {/* Section 8: Відгуки моїх Сонечок - shared component */}
      <TestimonialsSection />

      <Footer />
    </div>
    </EditorProvider>
  );
};

export default Index;
