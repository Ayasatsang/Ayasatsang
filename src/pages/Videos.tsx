import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { EditorProvider, EditableText } from "@/editor";
import VideoModal from "@/components/VideoModal";
import { usePublishedVideos, useAdminStore } from "@/admin/hooks/useAdminStore";

/**
 * Відео
 * Figma ID: 698-838
 */

const CATEGORY_ORDER = ['podcasts', 'meditations', 'streams'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  podcasts: 'Подкасти',
  meditations: 'Медитації, молитви, мантри',
  streams: 'Прямі ефіри',
};

const extractYoutubeId = (videoUrl?: string, youtubeId?: string): string => {
  if (youtubeId) return youtubeId;
  if (!videoUrl) return '';
  const match = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
};

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  youtubeId: string;
}

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const publishedVideos = usePublishedVideos();
  const fetchCollection = useAdminStore((s) => s.fetchCollection);

  useEffect(() => {
    fetchCollection('videos');
  }, []);

  const sections = useMemo(() => {
    return CATEGORY_ORDER
      .map((category) => {
        const videos = publishedVideos
          .filter((v: any) => v.category === category)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((v: any) => ({
            id: v.id,
            title: v.title,
            videoUrl: v.videoUrl || '',
            youtubeId: extractYoutubeId(v.videoUrl, v.youtubeId),
          }));
        return {
          title: CATEGORY_LABELS[category],
          videos,
        };
      })
      .filter((section) => section.videos.length > 0);
  }, [publishedVideos]);

  return (
    <EditorProvider>
    <Helmet>
      <title>Відео | Айа</title>
      <meta name="description" content="Відео, подкасти та прямі ефіри духовного наставника Айа." />
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
            contentKey="videos.hero.title"
            defaultValue="Відео"
            as="h1"
            className="font-display italic text-center hero-animate page-hero-title"
          />
          <EditableText
            contentKey="videos.hero.subtitle"
            defaultValue="Подкасти. Медитації. Прямі ефіри."
            as="p"
            className="text-center hero-animate-delay-1 page-hero-subtitle"
          />
        </div>
      </section>

      {/* Video Sections */}
      {sections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className="relative z-20"
          style={{ paddingBottom: sectionIndex < sections.length - 1 ? '40rem' : '80rem' }}
        >
          {/* Section title */}
          <h2
            className="font-display italic text-center hero-animate-delay-2"
            style={{
              fontSize: '48rem',
              color: 'white',
              marginBottom: '32rem',
              textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
            }}
          >
            {section.title}
          </h2>

          {/* Cards grid - 3 columns */}
          <div
            className="mx-auto grid-video hero-animate-delay-2"
            style={{
              maxWidth: '1440rem',
              padding: '0 51rem',
            }}
          >
            {section.videos.map((video) => {
              const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="relative overflow-hidden cursor-pointer group w-full block"
                  style={{
                    borderRadius: '24rem',
                    minHeight: '236rem',
                    background: 'linear-gradient(135deg, #E8D5B8 0%, #D4C4A8 100%)',
                    border: '1rem solid #D4DFF2',
                  }}
                >
                  {/* YouTube thumbnail */}
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: '78rem',
                        height: '78rem',
                        background: 'rgba(255, 255, 255, 0.35)',
                        border: '1rem solid rgba(255, 255, 255, 0.31)',
                        backdropFilter: 'blur(5.3rem)',
                        WebkitBackdropFilter: 'blur(5.3rem)',
                        boxShadow: '0 4rem 20rem rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{ width: '24rem', height: '24rem', marginLeft: '3rem' }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content overlay with gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
                    style={{
                      padding: '24rem',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      paddingTop: '60rem',
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '22rem',
                        fontWeight: '700',
                        color: '#fff',
                        lineHeight: '1.2',
                        textTransform: 'uppercase',
                        textShadow: '0 2rem 8rem rgba(0,0,0,0.5)',
                      }}
                    >
                      {video.title}
                    </h3>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <Footer />

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ''}
        title={selectedVideo?.title || ''}
      />
    </div>
    </EditorProvider>
  );
};

export default Videos;
