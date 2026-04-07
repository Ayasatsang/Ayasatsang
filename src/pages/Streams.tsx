import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import CommunityGallery from "@/components/CommunityGallery";
import { EditorProvider, EditableText, EditableLink } from "@/editor";

/**
 * Потоки Айа
 * Figma ID: 702-957
 */
const Streams = () => {
  return (
    <EditorProvider pageId="streams">
    <div className="relative" style={{ overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="default" />

      {/* Hero Section with Header */}
      <section className="relative">
        {/* Hero background — composited sky, gradients & clouds from Figma 823:2551 */}
        <img
          src="/images/streams-hero-bg.png"
          alt=""
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: '874rem',
            objectFit: 'cover',
          }}
        />

        {/* Header */}
        <Header />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center page-hero">
          <EditableText
            contentKey="streams.hero.title"
            defaultValue="Потоки Айа"
            as="h1"
            className="font-display italic text-center hero-animate page-hero-title"
            style={{
              background: 'linear-gradient(90deg, #80A5FF 0%, #34D1FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }}
          />
          <EditableText
            contentKey="streams.hero.subtitle"
            defaultValue="Де все зібрано"
            as="p"
            className="text-center hero-animate-delay-1 page-hero-subtitle"
            style={{
              color: '#73BEEC',
            }}
          />
        </div>
      </section>

      {/* Section: Social Cards */}
      <section className="relative z-20">
        {/* Cards grid */}
        <div
          className="grid-social relative mx-auto justify-items-center hero-animate-delay-2"
          style={{
            maxWidth: '1320rem',
            gap: '24rem',
            padding: '40rem 40rem 120rem',
          }}
        >
          {/* YouTube Card */}
          <div
            className="flex flex-col justify-between w-full card-hover cursor-pointer"
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
                  contentKey="streams.youtube.title"
                  defaultValue="YouTube"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="streams.youtube.description"
                defaultValue="Ефіри, практики, безкоштовні відео"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="streams.youtube.button"
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
            className="flex flex-col justify-between w-full card-hover cursor-pointer"
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
                  contentKey="streams.spotify.title"
                  defaultValue="Spotify"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="streams.spotify.description"
                defaultValue="Подкасти та медитації"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="streams.spotify.button"
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
            className="flex flex-col justify-between w-full card-hover cursor-pointer"
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
                  contentKey="streams.instagram.title"
                  defaultValue="Instagram"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="streams.instagram.description"
                defaultValue="Короткі відео, натхнення щодня"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="streams.instagram.button"
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
            className="flex flex-col justify-between w-full card-hover cursor-pointer"
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
                  contentKey="streams.tiktok.title"
                  defaultValue="TikTok"
                  as="span"
                  className="font-display italic"
                  style={{ fontSize: '28rem', color: '#fff' }}
                />
              </div>
              <EditableText
                contentKey="streams.tiktok.description"
                defaultValue="Короткі відео, натхнення щодня"
                as="p"
                style={{ fontSize: '16rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
            <EditableLink
              contentKey="streams.tiktok.button"
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
      </section>

      {/* Section: Спільнота Айа - shared component (with borders on Streams) */}
      <section className="relative z-20">
        <CommunityGallery showBorders />
      </section>

      <Footer />
    </div>
    </EditorProvider>
  );
};

export default Streams;
