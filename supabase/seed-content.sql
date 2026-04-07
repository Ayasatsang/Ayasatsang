-- ============================================
-- AYA CMS SEED DATA
-- Виконати в Supabase SQL Editor
-- https://supabase.com/dashboard/project/jnozwatlcrgzuhyqliet/sql
-- ============================================

-- 1. ТЕГИ (8 шт)
INSERT INTO tags (name, slug, color) VALUES
  ('Свідомість', 'svidomist', '#6366f1'),
  ('Медитація', 'meditatsiia', '#8b5cf6'),
  ('Духовність', 'dukhovnist', '#a855f7'),
  ('Любов', 'liubov', '#ec4899'),
  ('Зцілення', 'ztsilennia', '#14b8a6'),
  ('Трансформація', 'transformatsiia', '#f59e0b'),
  ('Практика', 'praktyka', '#10b981'),
  ('Світло', 'svitlo', '#fbbf24')
ON CONFLICT (slug) DO NOTHING;

-- 2. АВТОРИ (2 шт)
INSERT INTO authors (name, slug, avatar, bio) VALUES
  ('Айа', 'aia', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', 'Духовний наставник, провідник Світла та Любові. Допомагаю людям знайти шлях до свого Серця.'),
  ('Гостьовий автор', 'hostovyi-avtor', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', 'Запрошені автори та експерти.')
ON CONFLICT (slug) DO NOTHING;

-- 3. ПОДІЇ (6 шт)
INSERT INTO events (title, slug, description, image, date, time, format, location, quote, status) VALUES
  (
    'Ретрит "Світло всередині"',
    'retrit-svitlo-vseredini',
    'Триденний ретрит у Карпатах для глибокого занурення в себе. Медитації, практики, спілкування з однодумцями.',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    NOW() + INTERVAL '2 months',
    '10:00',
    'Офлайн',
    'Карпати, Україна',
    'Все, що тобі потрібно, вже є всередині тебе.',
    'published'
  ),
  (
    'Онлайн-практика "Ранкове пробудження"',
    'onlain-praktyka-rankove-probodzhennia',
    'Щотижнева ранкова практика для м''якого старту дня. Дихальні вправи, медитація, налаштування на день.',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    NOW() + INTERVAL '2 weeks',
    '07:00',
    'Онлайн',
    'Zoom',
    'Кожен ранок — це новий початок.',
    'published'
  ),
  (
    'Майстер-клас "Голос душі"',
    'maister-klas-holos-dushi',
    'Навчись чути свій внутрішній голос. Практики для розвитку інтуїції та зв''язку з вищим Я.',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    NOW() + INTERVAL '1 month',
    '19:00',
    'Онлайн',
    'Zoom',
    'Твоя душа знає шлях.',
    'published'
  ),
  (
    'Медитативний вечір у Києві',
    'medytatyvnyi-vechir-u-kyievi',
    'Вечір спільної медитації та практик у затишному просторі в центрі Києва.',
    'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    NOW() + INTERVAL '3 weeks',
    '19:00',
    'Офлайн',
    'Київ, Україна',
    'Разом ми сильніші.',
    'published'
  ),
  (
    'Груповий потік "Трансформація"',
    'hrupovyi-potik-transformatsiia',
    '6-тижневий онлайн-курс глибокої трансформації. Щотижневі заняття, домашні практики, підтримка групи.',
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800',
    NOW() + INTERVAL '6 weeks',
    '20:00',
    'Онлайн',
    'Zoom',
    'Зміни починаються зсередини.',
    'published'
  ),
  (
    'Жіноче коло "Сила всередині"',
    'zhinoche-kolo-syla-vseredini',
    'Зустріч для жінок. Практики для відновлення жіночої енергії, спілкування, підтримка.',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    NOW() + INTERVAL '5 weeks',
    '18:00',
    'Офлайн',
    'Львів, Україна',
    'Твоя сила — в твоїй жіночності.',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- 4. СТАТТІ (6 шт)
INSERT INTO articles (title, slug, description, image, content, date, status) VALUES
  (
    'Як почати медитувати: перші кроки',
    'iak-pochaty-medytuvaty-pershi-kroky',
    'Практичний гайд для тих, хто хоче почати медитувати, але не знає з чого почати.',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    '<h2>Вступ</h2><p>Медитація — це не щось складне чи містичне. Це просто практика присутності, уваги до моменту "зараз".</p><h2>Крок 1: Знайди тихе місце</h2><p>Обери місце, де тебе не будуть турбувати. Це може бути куточок у кімнаті, балкон, або навіть парк.</p><h2>Крок 2: Сядь зручно</h2><p>Не обов''язково сидіти в позі лотоса. Головне — щоб спина була рівною, а тіло розслабленим.</p><h2>Крок 3: Почни з дихання</h2><p>Просто спостерігай за своїм диханням. Вдих... видих... Коли думки відволікають — м''яко повертайся до дихання.</p>',
    NOW() - INTERVAL '3 days',
    'published'
  ),
  (
    'Чому ми боїмося тиші',
    'chomu-my-boimos-tyshi',
    'Глибоке дослідження нашого страху перед тишею та внутрішнім діалогом.',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    '<h2>Тиша як дзеркало</h2><p>У тиші ми залишаємось наодинці з собою. І часто те, що ми там знаходимо, лякає нас.</p><h2>Втеча від себе</h2><p>Ми заповнюємо життя шумом — музикою, розмовами, соціальними мережами — щоб не чути той тихий голос всередині.</p><h2>Як подружитися з тишею</h2><p>Почни з маленьких кроків. 5 хвилин тиші вранці. Потім 10. Поступово ти відкриєш, що в тиші живе мудрість.</p>',
    NOW() - INTERVAL '1 week',
    'published'
  ),
  (
    '5 ознак духовного пробудження',
    '5-oznak-dukhovnoho-probudzhennia',
    'Як зрозуміти, що ти на шляху трансформації свідомості.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    '<h2>1. Зміна пріоритетів</h2><p>Матеріальні речі стають менш важливими. З''являється потяг до глибшого сенсу.</p><h2>2. Підвищена емпатія</h2><p>Ти починаєш гостріше відчувати емоції інших людей, природи, світу.</p><h2>3. Потреба в усамітненні</h2><p>Тобі потрібен час наодинці, щоб переварити всі зміни.</p><h2>4. Синхронічності</h2><p>Ти помічаєш "випадкові" збіги, які насправді не такі вже й випадкові.</p><h2>5. Питання без відповідей</h2><p>Ти ставиш глибокі питання про життя, смерть, сенс — і це нормально.</p>',
    NOW() - INTERVAL '2 weeks',
    'published'
  ),
  (
    'Сила подяки: практика на кожен день',
    'syla-podiaky-praktyka-na-kozhen-den',
    'Як проста практика подяки може змінити твоє життя.',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    '<h2>Чому подяка працює</h2><p>Подяка переключає фокус з того, чого нам бракує, на те, що вже є. Це миттєво змінює внутрішній стан.</p><h2>Ранкова практика</h2><p>Щоранку, перш ніж встати з ліжка, назви 3 речі, за які ти вдячний/вдячна.</p><h2>Вечірній ритуал</h2><p>Перед сном запиши у щоденник 5 моментів дня, за які ти вдячний/вдячна.</p>',
    NOW() - INTERVAL '3 weeks',
    'published'
  ),
  (
    'Як відпустити минуле і жити зараз',
    'iak-vidpustyty-mynule-i-zhyty-zaraz',
    'Практичні поради для звільнення від тягаря минулого.',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    '<h2>Минуле — це історія</h2><p>Минуле існує тільки в нашій пам''яті. Воно не може нас поранити — тільки наші думки про нього.</p><h2>Практика прощення</h2><p>Прощення — це не про іншу людину. Це про твоє власне звільнення.</p><h2>Бути тут і зараз</h2><p>Коли ти повністю присутній у моменті — минуле втрачає свою владу над тобою.</p>',
    NOW() - INTERVAL '1 month',
    'published'
  ),
  (
    'Любов як шлях до себе',
    'liubov-iak-shliakh-do-sebe',
    'Філософські роздуми про природу любові та самопізнання.',
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800',
    '<h2>Любов починається з себе</h2><p>Неможливо по-справжньому любити іншого, поки не навчишся любити себе.</p><h2>Що означає любити себе</h2><p>Це не егоїзм. Це — дбайливе ставлення до свого тіла, душі, потреб.</p><h2>Безумовна любов</h2><p>Справжня любов не має умов. Вона просто є — як сонце, яке світить усім однаково.</p>',
    NOW() - INTERVAL '5 weeks',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- 5. БЛОКИ МЕДИТАЦІЙ (5 шт)
INSERT INTO meditation_blocks (block_number, title, slug, image, duration, access_url, "order", status) VALUES
  (1, 'ПРОБУДЖЕННЯ', 'blok-1-probudzhennia', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', '25:41 хв', 'https://example.com/meditation-1', 1, 'published'),
  (2, 'ЗЦІЛЕННЯ', 'blok-2-ztsilennia', 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', '30:15 хв', 'https://example.com/meditation-2', 2, 'published'),
  (3, 'ТРАНСФОРМАЦІЯ', 'blok-3-transformatsiia', 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800', '28:30 хв', 'https://example.com/meditation-3', 3, 'published'),
  (4, 'ЛЮБОВ', 'blok-4-liubov', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800', '32:00 хв', 'https://example.com/meditation-4', 4, 'published'),
  (5, 'СВІТЛО', 'blok-5-svitlo', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', '27:45 хв', 'https://example.com/meditation-5', 5, 'published')
ON CONFLICT (slug) DO NOTHING;

-- 6. КНИГИ (5 шт)
INSERT INTO books (title, slug, subtitle, description, cover_image, format, purchase_url, status) VALUES
  (
    'Шлях до Серця',
    'shliakh-do-sertsia',
    'Як знайти внутрішній спокій',
    '<p>Ця книга — подорож до найглибших куточків твоєї душі. Тут ти знайдеш практики, медитації та мудрість, яка допоможе повернутися до свого справжнього Я.</p>',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    'both',
    'https://example.com/book-1',
    'published'
  ),
  (
    'Пробудження',
    'probudzhennia',
    'Аудіокнига для трансформації',
    '<p>12 годин медитативного аудіо-контенту для глибокої внутрішньої роботи. Слухай у дорозі, перед сном, чи під час практик.</p>',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    'audio',
    'https://example.com/book-2',
    'published'
  ),
  (
    'Світло всередині',
    'svitlo-vseredini',
    'Практичний посібник',
    '<p>Покрокові інструкції для щоденних практик. Від простих дихальних вправ до глибоких медитацій.</p>',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    'print',
    'https://example.com/book-3',
    'published'
  ),
  (
    'Медитації на кожен день',
    'medytatsii-na-kozhen-den',
    '365 практик для року',
    '<p>Коротка медитація на кожен день року. Доступна у друкованому та аудіо форматі.</p>',
    'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400',
    'both',
    'https://example.com/book-4',
    'published'
  ),
  (
    'Любов без умов',
    'liubov-bez-umov',
    'Аудіо-курс про безумовну любов',
    '<p>8 годин глибоких роздумів та практик про природу любові, прощення та прийняття.</p>',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    'audio',
    'https://example.com/book-5',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- 7. ВІДЕО (6 шт)
INSERT INTO videos (title, slug, subtitle, video_url, cover_image, status) VALUES
  (
    'Ранкова медитація "Новий день"',
    'rankova-meditatsiia-novyi-den',
    '15-хвилинна практика для м''якого старту дня',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    'published'
  ),
  (
    'Як знайти внутрішній спокій',
    'iak-znaity-vnutrishnii-spokii',
    'Лекція про природу розуму та спокою',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    'published'
  ),
  (
    'Вечірня практика розслаблення',
    'vechirnia-praktyka-rozslablennia',
    '20 хвилин глибокого розслаблення перед сном',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    'published'
  ),
  (
    'Питання та відповіді: духовний шлях',
    'pytannia-ta-vidpovidi-dukhovnyi-shliakh',
    'Відповіді на найпоширеніші питання про духовність',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    'published'
  ),
  (
    'Медитація прощення',
    'meditatsiia-proshchennia',
    'Практика для звільнення від образ',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800',
    'published'
  ),
  (
    'Про силу намірів',
    'pro-sylu-namiriv',
    'Як правильно формулювати наміри та мрії',
    'https://www.youtube.com/watch?v=Ohx83pN70lM',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- 8. ВІДГУКИ (6 шт)
INSERT INTO reviews (author_name, slug, text, rating, status) VALUES
  (
    'Олена К.',
    'olena-k',
    'Після ретриту з Айа моє життя змінилося. Я нарешті знайшла внутрішній спокій, який шукала роками. Дякую за цей неймовірний досвід!',
    5,
    'published'
  ),
  (
    'Марія С.',
    'mariia-s',
    'Медитації Айа — це саме те, що мені було потрібно. Кожен ранок починаю з них і відчуваю, як змінюється моя енергія на весь день.',
    5,
    'published'
  ),
  (
    'Анастасія Д.',
    'anastasiia-d',
    'Пройшла онлайн-курс "Трансформація" і не можу повірити, наскільки глибоко це вплинуло на мене. Рекомендую всім, хто готовий до змін.',
    5,
    'published'
  ),
  (
    'Катерина В.',
    'kateryna-v',
    'Книга "Шлях до Серця" стала моїм провідником у складний період життя. Кожна сторінка — як розмова з мудрим другом.',
    5,
    'published'
  ),
  (
    'Юлія М.',
    'yuliia-m',
    'Особиста консультація з Айа допомогла мені побачити те, чого я не бачила роками. Її м''який, але глибокий підхід просто неймовірний.',
    5,
    'published'
  ),
  (
    'Тетяна Б.',
    'tetiana-b',
    'Жіноче коло — це магія! Відчуття сестринства, підтримки та безумовної любові. Обов''язково прийду знову.',
    5,
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- РЕЗУЛЬТАТ: Додано ~38 записів у 8 колекцій
-- ============================================
