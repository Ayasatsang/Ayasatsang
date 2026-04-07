import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { usePublishedAcademy, useAdminStore } from "@/admin/hooks/useAdminStore";
import { supabase } from "@/lib/supabase";
import { EditorProvider, EditableText } from "@/editor";

/**
 * Академія
 */

interface AcademyItem {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug?: string;
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

// Academy Card Component
const AcademyCard = ({ item }: { item: AcademyItem }) => {
  return (
    <Link to={`/academy/${item.slug || item.id}`} className="cursor-pointer group w-full block">
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
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/380x360/D4E9F7/6AB4FF?text=Academy';
            }}
          />
        </div>
      </div>

      {/* Part 2: Content section */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: '100%',
          padding: '32rem',
          borderRadius: '32rem',
          border: '1.67rem solid rgba(255, 255, 255, 0.5)',
          background: '#C79F61',
          backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.435) 0%, rgba(255,255,255,0) 70%)',
          boxShadow: '0px 1rem 1rem rgba(94,76,34,0.12), 0px 5rem 18rem rgba(124,115,97,0.11), inset 0px 1rem 1rem rgba(255,255,255,0.79)',
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
            {item.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '15rem',
              lineHeight: '1.4',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16rem',
              whiteSpace: 'pre-line',
            }}
          >
            {(item.description || '').replace(/\\n/g, '\n')}
          </p>


        </div>

        {/* Tags */}
        <div className="hidden lg:flex flex-wrap" style={{ gap: '8rem' }}>
          {(item.tags || []).map((tag) => (
            <span
              key={tag}
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
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const Academy = () => {
  const academyItems = usePublishedAcademy();
  const fetchCollection = useAdminStore((s) => s.fetchCollection);
  const [academyTagsMap, setAcademyTagsMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchCollection('academy');
    fetchCollection('tags');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (row.tags?.name) {
          tagsMap[id].push(row.tags.name);
        }
      }
      setAcademyTagsMap(tagsMap);
    };

    fetchAcademyTags();
  }, [academyItems]);
  return (
    <EditorProvider pageId="academy">
    <Helmet>
      <title>Академія | Айа</title>
      <meta name="description" content="Академія Айа — матеріали для духовного розвитку та навчання." />
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
            contentKey="academy.hero.title"
            defaultValue="Академія"
            as="h1"
            className="font-display italic text-center hero-animate page-hero-title"
          />
          <EditableText
            contentKey="academy.hero.subtitle"
            defaultValue="Матеріали для духовного розвитку та навчання"
            as="p"
            className="text-center hero-animate-delay-1 page-hero-subtitle"
          />
        </div>
      </section>

      {/* Academy Cards Section */}
      <section className="relative z-20" style={{ paddingBottom: '80rem' }}>
        {/* Cards grid - 3 columns */}
        <div
          className="mx-auto grid-video hero-animate-delay-2"
          style={{
            maxWidth: '1440rem',
            padding: '0 51rem',
          }}
        >
          {academyItems.map((item) => (
            <AcademyCard key={item.id} item={{ ...item, tags: academyTagsMap[item.id] || item.tags || [] }} />
          ))}
        </div>

        {/* Load more button - hide when 3 or fewer items */}
        {academyItems.length > 3 && (
          <div className="flex justify-center" style={{ marginTop: '60rem' }}>
            <button
              className="btn-gold"
              style={{
                padding: '20rem 60rem',
                fontSize: '20rem',
                fontWeight: '500',
              }}
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

export default Academy;
