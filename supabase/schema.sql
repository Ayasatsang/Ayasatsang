-- Aya CMS Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- ENUM Types
-- ============================================

CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE book_format AS ENUM ('audio', 'print', 'both');

-- ============================================
-- Tags Table (Reference)
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Authors Table (Reference)
-- ============================================

CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Events Table
-- ============================================

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  image TEXT,
  date TIMESTAMPTZ,
  time TEXT,
  format TEXT,
  location TEXT,
  quote TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: Add new columns to existing events table (run if table already exists)
-- ALTER TABLE events ADD COLUMN IF NOT EXISTS time TEXT;
-- ALTER TABLE events ADD COLUMN IF NOT EXISTS format TEXT;
-- ALTER TABLE events ADD COLUMN IF NOT EXISTS quote TEXT;

-- Events-Tags junction table
CREATE TABLE IF NOT EXISTS events_tags (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, tag_id)
);

-- ============================================
-- Academy Table
-- ============================================

CREATE TABLE IF NOT EXISTS academy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  image TEXT,
  date TIMESTAMPTZ,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Academy-Tags junction table
CREATE TABLE IF NOT EXISTS academy_tags (
  academy_id UUID REFERENCES academy(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (academy_id, tag_id)
);

-- ============================================
-- Articles Table
-- ============================================

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  image TEXT,
  date TIMESTAMPTZ,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles-Tags junction table
CREATE TABLE IF NOT EXISTS articles_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ============================================
-- Meditation Blocks Table (Parent)
-- ============================================

CREATE TABLE IF NOT EXISTS meditation_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  image TEXT,
  total_duration TEXT,
  access_url TEXT,
  "order" INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Meditation Tracks Table (Children)
-- ============================================

CREATE TABLE IF NOT EXISTS meditation_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id UUID REFERENCES meditation_blocks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  "order" INTEGER DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(block_id, slug)
);

-- ============================================
-- Meditations Table (Legacy - keep for compatibility)
-- ============================================

CREATE TABLE IF NOT EXISTS meditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  image TEXT,
  duration TEXT,
  block_number INTEGER,
  audio_url TEXT,
  access_url TEXT,
  "order" INTEGER DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration for existing meditations table
-- ALTER TABLE meditations ADD COLUMN IF NOT EXISTS access_url TEXT;

-- ============================================
-- Books Table
-- ============================================

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  cover_image TEXT,
  chapters TEXT[] DEFAULT '{}',
  audio_sample_url TEXT,
  purchase_url TEXT,
  format book_format DEFAULT 'both',
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Videos Table
-- ============================================

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  thumbnail_image TEXT,
  video_url TEXT,
  youtube_id TEXT,
  category TEXT DEFAULT 'podcasts',
  "order" INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

-- ============================================
-- Reviews Table
-- ============================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  text TEXT NOT NULL,
  sun_image TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Updated_at Trigger Function
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_academy_updated_at BEFORE UPDATE ON academy FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meditation_blocks_updated_at BEFORE UPDATE ON meditation_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meditation_tracks_updated_at BEFORE UPDATE ON meditation_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meditations_updated_at BEFORE UPDATE ON meditations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS)
-- For now, allow all operations (no auth required)
-- ============================================

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access (for published content)
CREATE POLICY "Public read access" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read access" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events_tags FOR SELECT USING (true);
CREATE POLICY "Public read access" ON academy FOR SELECT USING (true);
CREATE POLICY "Public read access" ON academy_tags FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articles_tags FOR SELECT USING (true);
CREATE POLICY "Public read access" ON meditation_blocks FOR SELECT USING (true);
CREATE POLICY "Public read access" ON meditation_tracks FOR SELECT USING (true);
CREATE POLICY "Public read access" ON meditations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON books FOR SELECT USING (true);
CREATE POLICY "Public read access" ON videos FOR SELECT USING (true);
CREATE POLICY "Public read access" ON reviews FOR SELECT USING (true);

-- Public write access (for development - remove in production!)
CREATE POLICY "Public write access" ON tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON authors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON events_tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON academy FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON academy_tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON articles_tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON meditation_blocks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON meditation_tracks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON meditations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write access" ON reviews FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_academy_status ON academy(status);
CREATE INDEX IF NOT EXISTS idx_academy_date ON academy(date);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date);
CREATE INDEX IF NOT EXISTS idx_meditation_blocks_status ON meditation_blocks(status);
CREATE INDEX IF NOT EXISTS idx_meditation_blocks_order ON meditation_blocks("order");
CREATE INDEX IF NOT EXISTS idx_meditation_tracks_block_id ON meditation_tracks(block_id);
CREATE INDEX IF NOT EXISTS idx_meditation_tracks_order ON meditation_tracks("order");
CREATE INDEX IF NOT EXISTS idx_meditations_status ON meditations(status);
CREATE INDEX IF NOT EXISTS idx_meditations_order ON meditations("order");
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

-- ============================================
-- Static Content Table (Visual Editor)
-- Key-value storage for inline editable content
-- ============================================

CREATE TABLE IF NOT EXISTS static_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL UNIQUE,           -- "index.hero.title"
  page TEXT NOT NULL,                          -- "index", "books", "global"
  section TEXT,                                -- "hero", "footer", "streams"
  content_type TEXT NOT NULL DEFAULT 'text',   -- text, richtext, image
  content_value TEXT NOT NULL,                 -- published content
  draft_value TEXT,                            -- draft (null = no pending changes)
  is_dirty BOOLEAN DEFAULT FALSE,              -- has unpublished changes
  label TEXT,                                  -- human-readable label for admin UI
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Versions (history tracking)
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES static_content(id) ON DELETE CASCADE,
  content_value TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_id, version_number)
);

-- Triggers for static_content
CREATE TRIGGER update_static_content_updated_at
  BEFORE UPDATE ON static_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for static_content
CREATE INDEX IF NOT EXISTS idx_static_content_page ON static_content(page);
CREATE INDEX IF NOT EXISTS idx_static_content_key ON static_content(content_key);
CREATE INDEX IF NOT EXISTS idx_static_content_dirty ON static_content(is_dirty) WHERE is_dirty = TRUE;
CREATE INDEX IF NOT EXISTS idx_content_versions_content_id ON content_versions(content_id);

-- RLS for static_content
ALTER TABLE static_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON static_content FOR SELECT USING (true);
CREATE POLICY "Public write access" ON static_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read access" ON content_versions FOR SELECT USING (true);
CREATE POLICY "Public write access" ON content_versions FOR ALL USING (true) WITH CHECK (true);
