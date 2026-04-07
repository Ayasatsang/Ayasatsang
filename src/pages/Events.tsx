import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { usePublishedEvents, useAdminStore } from "@/admin/hooks/useAdminStore";
import { supabase } from "@/lib/supabase";
import { EditorProvider, EditableText } from "@/editor";

/**
 * Події
 * Figma ID: 694-16113
 */

interface EventTag {
  name: string;
}

interface EventWithTags {
  id: string;
  slug?: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
  tags: EventTag[];
}

// Format date to Ukrainian locale
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Event Card Component - same as ArticleCard but with different gradient
const EventCard = ({ event }: { event: EventWithTags }) => {
  return (
    <Link to={`/events/${event.slug || event.id}`} className="cursor-pointer group w-full block">
      {/* Part 1: Photo section with frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '401/381',
          padding: '4rem',
          borderRadius: '27rem',
          background: '#D4DFF2',
          marginBottom: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '27rem',
            overflow: 'hidden',
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Event';
            }}
          />
        </div>
      </div>

      {/* Part 2: Content section - cyan/blue gradient from Figma */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: '100%',
          height: '315rem',
          padding: '32rem',
          borderRadius: '32rem',
          border: '1.67rem solid rgba(255, 255, 255, 0.5)',
          background: 'linear-gradient(180deg, #34D1FF 0%, #80A5FF 100%)',
          marginTop: '2.6rem',
        }}
      >
        <div>
          {/* Title */}
          <h3
            className="font-serif"
            style={{
              fontSize: '26rem',
              color: '#fff',
              marginBottom: '12rem',
            }}
          >
            {event.title}
          </h3>

          {/* Description - 2 line clamp */}
          <p
            style={{
              fontSize: '15rem',
              lineHeight: '1.5625',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {(event.description || '').replace(/\\n/g, '\n')}
          </p>

          {/* Divider */}
          <div
            style={{
              height: '1rem',
              background: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '16rem',
            }}
          />

          {/* Date */}
          <div className="flex items-center" style={{ gap: '10rem', marginBottom: '8rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span style={{ fontSize: '14rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              {formatDate(event.date)}
            </span>
          </div>

          {/* Location - only show if location exists */}
          {event.location && (
          <div className="flex items-center" style={{ gap: '10rem', marginBottom: '20rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontSize: '14rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              {event.location}
            </span>
          </div>
          )}
        </div>

        {/* Tags */}
        <div className="hidden lg:flex flex-wrap" style={{ gap: '8rem' }}>
          {(event.tags || []).map((tag) => (
            <span
              key={tag.name}
              style={{
                padding: '7rem 20rem',
                borderRadius: '60rem',
                background: 'rgba(255, 255, 255, 0.16)',
                color: '#fff',
                fontSize: '14rem',
                opacity: 0.9,
                whiteSpace: 'nowrap',
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const INITIAL_COUNT = 6;

const Events = () => {
  const events = usePublishedEvents();
  const tags = useAdminStore((s) => s.tags);
  const fetchCollection = useAdminStore((s) => s.fetchCollection);
  const [eventTagsMap, setEventTagsMap] = useState<Record<string, EventTag[]>>({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Tag ID → name lookup
  const tagMap = new Map(tags.map(t => [t.id, t.name]));

  useEffect(() => {
    fetchCollection('events');
    fetchCollection('tags');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch tags for events from junction table
  useEffect(() => {
    if (events.length === 0) return;

    const fetchEventTags = async () => {
      const eventIds = events.map((e) => e.id);
      const { data, error } = await supabase
        .from('events_tags')
        .select('event_id, tags(name)')
        .in('event_id', eventIds);

      if (error || !data) return;

      const tagsMap: Record<string, EventTag[]> = {};
      for (const row of data as any[]) {
        const eventId = row.event_id;
        if (!tagsMap[eventId]) tagsMap[eventId] = [];
        if (row.tags?.name) {
          tagsMap[eventId].push({ name: row.tags.name });
        }
      }
      setEventTagsMap(tagsMap);
    };

    fetchEventTags();
  }, [events]);

  // Merge events with their tags
  const eventsWithTags: EventWithTags[] = events.map((event) => ({
    ...event,
    tags: eventTagsMap[event.id] || [],
  }));

  return (
    <EditorProvider pageId="events">
    <Helmet>
      <title>Події | Айа</title>
      <meta name="description" content="Події та семінари духовного наставника Айа." />
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
            contentKey="events.hero.title"
            defaultValue="Події"
            as="h1"
            className="font-display italic text-center hero-animate page-hero-title"
          />
          <EditableText
            contentKey="events.hero.subtitle"
            defaultValue="Живі зустрічі, семінари та онлайн-події"
            as="p"
            className="text-center hero-animate-delay-1 page-hero-subtitle"
          />
        </div>
      </section>

      {/* Events Cards Section */}
      <section className="relative z-20" style={{ paddingBottom: '80rem' }}>
        {/* Cards grid - 3 columns */}
        <div
          className="mx-auto grid-video hero-animate-delay-2"
          style={{
            maxWidth: '1440rem',
            padding: '0 51rem',
          }}
        >
          {eventsWithTags.slice(0, visibleCount).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load more button */}
        {eventsWithTags.length > visibleCount && (
          <div className="flex justify-center" style={{ marginTop: '60rem' }}>
            <button
              className="btn-gold"
              style={{
                padding: '20rem 60rem',
                fontSize: '20rem',
                fontWeight: '500',
              }}
              onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
            >
              Завантажити ще
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
    </EditorProvider>
  );
};

export default Events;
