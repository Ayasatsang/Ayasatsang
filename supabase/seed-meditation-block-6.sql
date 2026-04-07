-- ============================================
-- Seed: Meditation Block 6 "ЄДИНСТВО"
-- Run in Supabase SQL Editor
-- ============================================

-- Insert meditation block
INSERT INTO meditation_blocks (block_number, title, slug, subtitle, description, image, total_duration, access_url, "order", status)
VALUES (
  6,
  'ЄДИНСТВО',
  'yednist',
  'Ця Медитація про те, як бути Єдиними з собою',
  '',
  '/images/meditation-block.png',
  '30:41 хв',
  '#',
  6,
  'published'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  total_duration = EXCLUDED.total_duration,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Get the block ID for tracks
DO $$
DECLARE
  block_uuid UUID;
BEGIN
  SELECT id INTO block_uuid FROM meditation_blocks WHERE slug = 'yednist';

  -- Delete existing tracks for this block (clean insert)
  DELETE FROM meditation_tracks WHERE block_id = block_uuid;

  -- Insert tracks
  INSERT INTO meditation_tracks (block_id, title, slug, description, duration, "order", status) VALUES
    (block_uuid, 'Вступ', 'vstup', '', '6:28 хв', 1, 'published'),
    (block_uuid, 'Підготовка', 'pidhotovka', '', '4:52 хв.', 2, 'published'),
    (block_uuid, 'Прийняття Себе', 'pryynyattya-sebe', 'Потужна практика пробудження Світла Творця у твоєму Серці — для тебе.', '4:52 хв.', 3, 'published'),
    (block_uuid, 'Єдність чоловічого та жіночого', 'yednist-cholovichoho-ta-zhinochoho', E'Глибинна й дуже важлива енергетична практика, що зцілює внутрішнього чоловіка і жінку, повертає їх до Єдності, Гармонії та Божественної Цілісності.\n\nУсе, що є всередині нас, відображається назовні — у нашій фізичній реальності.', '8:24 хв.', 4, 'published'),
    (block_uuid, 'Єдність Божественного Духа', 'yednist-bozhestvennoho-dukha', E'Повернення до єдності Духа тебе і Роду, перехід у Єдину Свідомість Любові та Світла.\n\nПіраміда Світла. Тіло Вознесіння. Повернення Вищих аспектів. Тіло Світла.', '8:24 хв.', 5, 'published'),
    (block_uuid, 'Заключні слова від Провідниці', 'zaklyuchni-slova', '', '3:20 хв.', 6, 'published');
END $$;

-- Also insert Block 5 for "Інші Медитації" section
INSERT INTO meditation_blocks (block_number, title, slug, subtitle, image, total_duration, access_url, "order", status)
VALUES (
  5,
  'ВОЗВРАЩЕНИЕ',
  'vozvrashcheniye',
  '',
  '/images/meditation-block.png',
  '30:41 хв',
  '#',
  5,
  'published'
)
ON CONFLICT (slug) DO NOTHING;
