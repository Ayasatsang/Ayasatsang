import { useState, useRef, TouchEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublishedEvents, useAdminStore } from '@/admin/hooks/useAdminStore';
import { supabase } from '@/lib/supabase';

interface EventTag {
  name: string;
}

interface Event {
  id: string;
  slug?: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  tags: EventTag[];
}

// Fallback events for when CMS is empty
const fallbackEvents: Event[] = [
  {
    id: '1',
    image: '/images/img/event.png',
    title: 'Призначення душі',
    description: 'Щодня 15 хвилин: коротка медитація, намір дня та м\'яке завдання для тіла й Серця.',
    date: 'Травень 21, 2025',
    location: 'Київ, Україна',
    tags: [{ name: 'Свідомість' }, { name: 'Голос' }],
  },
];

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

// Event Card Component
const EventCard = ({
  event,
  isActive,
  offset,
  onClick,
}: {
  event: Event;
  isActive: boolean;
  offset: number; // -2, -1, 0, 1, 2, etc.
  onClick: () => void;
}) => {
  const nav = useNavigate();
  const absOffset = Math.abs(offset);
  const isVisible = absOffset <= 1;

  // Position based on real offset — cards always slide in the correct direction
  const getTransform = () => {
    if (offset === 0) return 'translateX(0) scale(1)';
    const direction = offset > 0 ? 1 : -1;
    const shift = direction * 100; // percentage of card width
    if (absOffset === 1) {
      return `translateX(calc(${shift}% + ${direction * 10}rem)) scale(0.81)`;
    }
    // Far away cards: positioned further out so they slide in naturally
    return `translateX(calc(${shift}% + ${direction * absOffset * 80}rem)) scale(0.7)`;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive) {
      onClick();
    }
  };

  return (
    <div
      onClick={(e) => { if (isActive && event.slug) { nav(`/events/${event.slug}`); } else { handleClick(e); } }}
      className={`event-card absolute left-1/2 ${isVisible ? 'cursor-pointer' : ''}`}
      style={{
        transform: `translateX(-50%) ${getTransform()}`,
        zIndex: isActive ? 10 : isVisible ? 5 : 1,
        opacity: isActive ? 1 : isVisible ? 0.41 : 0,
        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
        willChange: 'transform, opacity',
        width: '401rem',
      }}
    >
      {/* Part 1: Photo section */}
      <div
        className="event-card-photo"
        style={{
          width: '401rem',
          height: '381rem',
          borderRadius: '27rem',
          overflow: 'hidden',
          marginBottom: '0',
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Event';
          }}
        />
      </div>

      {/* Part 2: Content section */}
      <div
        className="event-card-content flex flex-col justify-between"
        style={{
          width: '401rem',
          height: '315rem',
          padding: '32rem',
          borderRadius: isActive ? '32rem' : '24rem',
          border: '1.67rem solid rgba(255, 255, 255, 0.5)',
          background: isActive
            ? 'linear-gradient(180deg, #6CA4FF 0%, #3E7ADB 100%)'
            : 'linear-gradient(180deg, #A2BBE3 0%, #7C9ED4 100%)',
          marginTop: '2rem',
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
              {event.date}
            </span>
          </div>

          {/* Location — ховаємо коли пусто */}
          {event.location && (
            <div className="flex items-center lg:mb-[20rem]" style={{ gap: '10rem' }}>
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

        {/* Tags — hidden on mobile */}
        <div className="hidden lg:flex flex-wrap" style={{ gap: '8rem' }}>
          {event.tags.map((tag) => (
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
    </div>
  );
};

// Slider Dots Component
const SliderDots = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}) => {
  return (
    <div
      className="flex justify-center items-center slider-dots"
      style={{ marginTop: '50rem', gap: '16rem' }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          style={{
            width: active === index ? '16rem' : '12rem',
            height: active === index ? '16rem' : '12rem',
            borderRadius: '50%',
            background: active === index
              ? '#FFFFFF'
              : 'rgba(255, 255, 255, 0.4)',
            border: 'none',
            boxShadow: active === index ? '0 2rem 8rem rgba(255, 255, 255, 0.5)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

// Main Slider Component
const EventSlider = () => {
  const cmsEvents = usePublishedEvents();
  const tags = useAdminStore((s) => s.tags);
  const fetchCollection = useAdminStore((s) => s.fetchCollection);
  const [activeIndex, setActiveIndex] = useState(0);
  const [eventTagsMap, setEventTagsMap] = useState<Record<string, EventTag[]>>({});
  const [isInView, setIsInView] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tag ID → name lookup
  const tagMap = new Map(tags.map(t => [t.id, t.name]));

  // Fetch events and tags from CMS on mount
  useEffect(() => {
    fetchCollection('events');
    fetchCollection('tags');
  }, [fetchCollection]);

  // Fetch tags for events from junction table
  useEffect(() => {
    if (cmsEvents.length === 0) return;

    const fetchEventTags = async () => {
      const eventIds = cmsEvents.map((e) => e.id);
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
  }, [cmsEvents]);

  // Use CMS events or fallback if empty
  const events: Event[] = cmsEvents.length > 0
    ? cmsEvents.map(e => ({
        id: e.id,
        slug: e.slug,
        image: e.image || '/images/img/event.png',
        title: e.title,
        description: e.description || '',
        date: formatDate(e.date),
        location: e.location || '',
        tags: eventTagsMap[e.id] || [],
      }))
    : fallbackEvents;

  // Reset active index when events change
  useEffect(() => {
    setActiveIndex(Math.min(Math.floor(events.length / 2), events.length - 1));
  }, [events.length]);

  // IntersectionObserver — відстежуємо видимість слайдера
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Автопрокрутка тільки коли секція в viewport
  useEffect(() => {
    if (!isInView || events.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView, events.length]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold && activeIndex < events.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (diff < -threshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="event-slider-container relative overflow-hidden"
      style={{ height: '800rem', padding: '0 40rem' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards container */}
      <div className="event-slider-cards relative" style={{ height: '700rem' }}>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={index === activeIndex}
            offset={index - activeIndex}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Pagination Dots */}
      <SliderDots
        total={events.length}
        active={activeIndex}
        onDotClick={setActiveIndex}
      />
    </div>
  );
};

export default EventSlider;
