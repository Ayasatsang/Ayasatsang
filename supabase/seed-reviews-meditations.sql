-- Seed data: Reviews and Meditation Blocks
-- Run this in Supabase SQL Editor after schema.sql

-- ============================================
-- Reviews (Testimonials)
-- ============================================

INSERT INTO reviews (author_name, slug, text, sun_image, rating, status) VALUES
(
  'Олена',
  'review-olena',
  'Медитації Айа змінили моє життя. Я відчула глибокий зв''язок зі своїм внутрішнім світлом і нарешті знайшла спокій, якого шукала роками.',
  '/images/img/Rectangle.png',
  5,
  'published'
),
(
  'Марина',
  'review-maryna',
  'Після курсу з Айа я навчилася слухати своє серце. Кожна практика — це подорож до себе справжньої. Дякую за цей дар!',
  '/images/img/Rectangle.png',
  5,
  'published'
),
(
  'Ірина',
  'review-iryna',
  'Потоки Айа наповнюють мене енергією та любов''ю. Відчуваю, як з кожним днем стаю ближчою до свого справжнього призначення.',
  '/images/img/Rectangle.png',
  5,
  'published'
),
(
  'Катерина',
  'review-kateryna',
  'Завдяки медитаціям я повернула гармонію у своє життя. Айа — справжній провідник світла. Її голос заспокоює душу.',
  '/images/img/Rectangle.png',
  5,
  'published'
),
(
  'Наталія',
  'review-nataliia',
  'Ці практики допомогли мені пройти через складний період життя. Тепер я знаю, що завжди можу повернутися до свого внутрішнього спокою.',
  '/images/img/Rectangle.png',
  5,
  'published'
),
(
  'Світлана',
  'review-svitlana',
  'Кожна медитація — це подарунок. Айа створює простір безумовної любові, де можна зцілитися та відновитися.',
  '/images/img/Rectangle.png',
  5,
  'published'
);

-- ============================================
-- Meditation Blocks
-- ============================================

INSERT INTO meditation_blocks (block_number, title, slug, subtitle, description, image, total_duration, access_url, "order", status) VALUES
(
  1,
  'Блок 1: Пробудження',
  'block-1-awakening',
  'Початок шляху',
  'Перший блок медитацій для тих, хто починає свій духовний шлях. Практики допоможуть вам встановити зв''язок зі своїм внутрішнім світлом та відкрити серце для любові.',
  '/images/img/Rectangle-8418-1.png',
  '3 години 20 хвилин',
  'https://example.com/block-1',
  1,
  'published'
),
(
  2,
  'Блок 2: Зцілення',
  'block-2-healing',
  'Глибока трансформація',
  'Другий блок присвячений зціленню внутрішніх ран та звільненню від старих патернів. Медитації допоможуть вам відпустити минуле та відкритися для нового.',
  '/images/img/Rectangle-8418-2.png',
  '4 години 15 хвилин',
  'https://example.com/block-2',
  2,
  'published'
),
(
  3,
  'Блок 3: Вознесіння',
  'block-3-ascension',
  'Вищі виміри свідомості',
  'Третій блок для тих, хто готовий піднятися на новий рівень свідомості. Практики вознесіння відкриють доступ до вищих вимірів та глибинної мудрості.',
  '/images/img/Rectangle-8418-3.png',
  '5 годин',
  'https://example.com/block-3',
  3,
  'published'
),
(
  4,
  'Блок 4: Єднання',
  'block-4-unity',
  'Злиття з Джерелом',
  'Четвертий блок — це глибока практика єднання з Джерелом всього сущого. Медитації допоможуть відчути безмежну любов та єдність з усім, що існує.',
  '/images/img/Rectangle-8418-4.png',
  '4 години 45 хвилин',
  'https://example.com/block-4',
  4,
  'published'
);

-- ============================================
-- Verification queries
-- ============================================

-- Check inserted reviews
SELECT id, author_name, status FROM reviews WHERE status = 'published';

-- Check inserted meditation blocks
SELECT id, block_number, title, status FROM meditation_blocks WHERE status = 'published' ORDER BY "order";
