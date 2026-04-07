import { Link } from "react-router-dom";
import { EditableText } from "@/editor";

const Footer = () => {
  return (
    <footer className="relative z-30">
      {/* Quote */}
      <EditableText
        contentKey="footer.quote"
        defaultValue="Життя знає ритм<br />краще за нас"
        as="h2"
        multiline
        className="hero-title text-center font-display italic scroll-animate"
        style={{
          paddingTop: '80rem',
          paddingBottom: '40rem',
          lineHeight: '0.8',
          letterSpacing: '-2rem',
          color: '#fff',
          textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
        }}
      />

      {/* CTA Button */}
      <div className="flex justify-center scroll-animate" style={{ marginBottom: '80rem' }}>
        <a href="https://ayapotiksvitla-academy.com/" target="_blank" rel="noopener noreferrer">
          <EditableText
            contentKey="footer.button"
            defaultValue="Переглянути Навчання"
            as="button"
            className="btn-gold"
            style={{
              padding: '20rem 60rem',
              fontSize: '20rem',
              fontWeight: '500',
            }}
          />
        </a>
      </div>

      {/* Footer bottom row */}
      <div
        className="footer-row mx-auto"
        style={{ maxWidth: '1200rem', padding: '0 60rem' }}
      >
        {/* Social icons */}
        <div className="flex items-center" style={{ gap: '16rem' }}>
          {/* Instagram */}
          <a href="https://www.instagram.com/aya_aya_potoksveta" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="https://youtube.com/@ayaayapotiksvitla" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@ayapotoksveta" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
          {/* Spotify */}
          <a href="https://open.spotify.com/show/69WQbL74d94M7A6S4219da" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
          {/* Telegram */}
          <a href="https://t.me/aya_potok_sveta" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          {/* Apple Podcasts */}
          <a href="https://podcasts.apple.com/ua/podcast/%D0%B0%D0%B9%D0%B0-%D0%BF%D0%BE%D1%82%D1%96%D0%BA-%D1%81%D0%B2%D1%96%D1%82%D0%BB%D0%B0-%D1%82%D0%B0-%D0%BB%D1%8E%D0%B1%D0%BE%D0%B2%D1%96/id1825894630" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c4.988 0 8.94 3.16 9.69 7.468.09.48-.24.912-.72 1.002-.48.078-.912-.24-1.002-.72-.63-3.54-3.9-6.15-7.968-6.15-4.068 0-7.338 2.61-7.968 6.15-.09.48-.522.798-1.002.72-.48-.09-.81-.522-.72-1.002.75-4.308 4.702-7.468 9.69-7.468zm.042 3.168c3.24 0 5.97 2.112 6.528 5.04.078.48-.258.924-.738 1.002-.48.078-.924-.258-1.002-.738-.42-2.19-2.52-3.774-4.788-3.774s-4.368 1.584-4.788 3.774c-.078.48-.522.816-1.002.738-.48-.078-.816-.522-.738-1.002.558-2.928 3.288-5.04 6.528-5.04zm-.06 3.144a3.54 3.54 0 013.54 3.54c0 1.332-.726 2.496-1.806 3.108l.24 4.596c.06.84-.6 1.536-1.44 1.596-.06 0-.12 0-.18 0h-.708c-.84 0-1.536-.636-1.596-1.476l.24-4.716A3.528 3.528 0 018.307 12.42a3.54 3.54 0 013.54-3.54z"/>
            </svg>
          </a>
        </div>

        {/* Email */}
        <a
          href="mailto:ayasatsang@gmail.com"
          className="hover:opacity-80 transition-opacity"
          style={{
            fontSize: '17rem',
            color: '#fff',
            textDecoration: 'underline',
          }}
        >
          ayasatsang@gmail.com
        </a>

        {/* Privacy Policy */}
        <Link
          to="/privacy"
          className="hover:opacity-80 transition-opacity"
          style={{
            fontSize: '17rem',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Політика конфіденційності
        </Link>
      </div>

      {/* Footer background image with seamless fade-in */}
      <div style={{ paddingTop: '40rem' }}>
        <img
          src="/images/fotter-bg.png"
          alt=""
          style={{
            width: '100%',
            display: 'block',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
