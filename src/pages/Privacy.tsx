import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageClouds from "@/components/PageClouds";
import { EditorProvider, EditableText } from "@/editor";

/**
 * Політика Приватності
 * Figma ID: 687:130
 */
const Privacy = () => {
  return (
    <EditorProvider pageId="privacy">
    <div className="relative min-h-screen" style={{ background: '#73BEEC', overflow: 'clip' }}>
      {/* Decorative clouds */}
      <PageClouds variant="minimal" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main style={{ paddingTop: '120rem', paddingBottom: '120rem' }}>
        {/* Title */}
        <EditableText
          contentKey="privacy.hero.title"
          defaultValue="Політика приватності"
          as="h1"
          className="text-center font-display italic page-title"
          style={{
            lineHeight: '1',
            color: '#fff',
            textShadow: '0 2rem 10rem rgba(0, 0, 0, 0.1)',
            marginBottom: '40rem',
          }}
        />

        {/* Subtitle */}
        <EditableText
          contentKey="privacy.hero.subtitle"
          defaultValue="АЙА — Потік Світла та Любові"
          as="p"
          className="text-center"
          style={{
            fontSize: '24rem',
            color: '#fff',
            marginBottom: '80rem',
          }}
        />

        {/* Content container */}
        <div
          className="mx-auto"
          style={{
            maxWidth: '900rem',
            padding: '0 40rem',
            fontSize: '18rem',
            lineHeight: '1.8',
            color: '#fff',
          }}
        >
          <p style={{ marginBottom: '24rem' }}>
            Ми віримо, що кожна Людина — це джерело світла. Тому ваша довіра та безпека — основа всього, що ми створюємо.
          </p>
          <p style={{ marginBottom: '24rem' }}>
            Ця політика конфіденційності пояснює, як ми дбайливо отримуємо, зберігаємо та захищаємо персональні дані, які ви передаєте нам через сайт "АЙА — Потік Світла та Любові". Ми прагнемо повної прозорості, щоб ви завжди відчували спокій і підтримку.
          </p>
          <p style={{ marginBottom: '60rem' }}>
            Користуючись нашим сайтом, ви погоджуєтесь із цією політикою. Якщо ви не згодні з умовами — будь ласка, утримайтеся від використання сайту.
          </p>

          {/* Section 1 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            🌟 Які дані ми можемо збирати
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            Лише те, що ви свідомо й добровільно нам надаєте:
          </p>
          <ul style={{ paddingLeft: '24rem', marginBottom: '20rem' }}>
            <li>ім'я</li>
            <li>електронну пошту</li>
            <li>контактний номер</li>
            <li>інші дані, які потрібні для взаємодії з нашим простором Світла</li>
          </ul>
          <p style={{ marginBottom: '16rem' }}>
            Це може відбуватися, коли ви:
          </p>
          <ul style={{ paddingLeft: '24rem', marginBottom: '60rem' }}>
            <li>реєструєтеся на сайті</li>
            <li>робите пожертву</li>
            <li>підписуєтесь на нашу розсилку</li>
            <li>берете участь у наших програмах любові та підтримки</li>
          </ul>

          {/* Section 2 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            💗 Згода на обробку персональних даних
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            Заповнюючи будь-яку електронну форму на сайті "АЙА", ви підтверджуєте свою згоду на обробку персональних даних згідно зі ст. 11 Закону України «Про захист персональних даних» №2297-VI.
          </p>
          <p style={{ marginBottom: '60rem' }}>
            Ми обробляємо дані виключно з добрими намірами: щоб підтримувати з вами зв'язок, надсилати корисні матеріали та вдосконалювати наш простір.
          </p>

          {/* Section 3 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            🔐 Як ми захищаємо інформацію
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            Ваші дані — під нашою постійною турботою.
          </p>
          <ul style={{ paddingLeft: '24rem', marginBottom: '20rem' }}>
            <li>Всі передані дані зашифровані технологією SSL</li>
            <li>Доступ до них мають лише відповідальні члени команди, які підтримують безпеку та конфіденційність</li>
            <li>Ми застосовуємо сучасні технології й процедури, щоб жодна третя сторона не змогла втрутитися</li>
          </ul>
          <p style={{ marginBottom: '16rem' }}>
            Ми ніколи не продаємо та не передаємо ваші дані стороннім компаніям без вашого дозволу.
          </p>
          <p style={{ marginBottom: '60rem' }}>
            Якщо у вас є питання — ми завжди відкриті до діалогу і готові з любов'ю надати пояснення.
          </p>

          {/* Section 4 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            🌍 Посилання на інші ресурси
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            На нашому сайті можуть бути посилання на зовнішні веб-ресурси. Ми не керуємо ними й не можемо відповідати за те, як вони ставляться до конфіденційності.
          </p>
          <p style={{ marginBottom: '16rem' }}>
            Переходячи за зовнішніми посиланнями — дійте усвідомлено. Ми рекомендуємо ознайомитися з їхніми політиками захисту даних.
          </p>
          <p style={{ marginBottom: '60rem' }}>
            Якщо ви помітите посилання, яке здається небезпечним — повідомте нам, будь ласка. Ми цінуємо вашу турботу та внесок у безпеку інших.
          </p>

          {/* Section 5 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            🌀 Оновлення політики
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            Світ постійно змінюється, і наш потік розвитку — теж. Ми можемо час від часу оновлювати цю політику, щоб вона залишалася живою, актуальною та захисною.
          </p>
          <p style={{ marginBottom: '60rem' }}>
            Будь ласка, час від часу перевіряйте цю сторінку — щоб бути в курсі оновлень, створених для вашого добра.
          </p>

          {/* Section 6 */}
          <h2 style={{ fontSize: '24rem', fontWeight: 600, marginBottom: '20rem' }}>
            ✨ Контакти
          </h2>
          <p style={{ marginBottom: '16rem' }}>
            Будь-які запитання щодо конфіденційності — пишіть нам із теплом, і ми з Любов'ю відповімо.
          </p>
          <p>
            <a
              href="mailto:ayasatsang@gmail.com"
              style={{
                color: '#fff',
                textDecoration: 'underline',
              }}
            >
              ayasatsang@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
    </EditorProvider>
  );
};

export default Privacy;
