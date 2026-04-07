import { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signIn, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from state or default to /admin
  const from = (location.state as { from?: string })?.from || '/admin';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Введіть email та пароль');
      return;
    }

    const { error } = await signIn(email, password);

    if (!error) {
      navigate(from, { replace: true });
    }
  };

  const displayError = localError || (authError ? getErrorMessage(authError.message) : null);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#E8F4FC] via-[#D4E9F7] to-[#B8D9F3] flex items-center justify-center relative overflow-hidden"
      style={{ padding: '40rem' }}
    >
      {/* Decorative cloud - left */}
      <img
        src="/images/diamant-1.png"
        alt=""
        className="absolute pointer-events-none opacity-60"
        style={{
          left: '-50rem',
          top: '100rem',
          width: '250rem',
          height: 'auto',
        }}
      />

      {/* Decorative cloud - right */}
      <img
        src="/images/diamant-2.png"
        alt=""
        className="absolute pointer-events-none opacity-60"
        style={{
          right: '-50rem',
          bottom: '100rem',
          width: '250rem',
          height: 'auto',
        }}
      />

      {/* Form Container */}
      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ maxWidth: '420rem' }}
      >
        {/* Logo */}
        <div className="flex justify-center" style={{ marginBottom: '32rem' }}>
          <span
            className="font-display italic"
            style={{
              fontSize: '64rem',
              background: 'linear-gradient(180deg, #80A5FF 0%, #34D1FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Aya
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display italic text-center"
          style={{
            fontSize: '36rem',
            marginBottom: '12rem',
            background: 'linear-gradient(180deg, #80A5FF 0%, #34D1FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Вхід в панель керування
        </h1>

        {/* Subtitle */}
        <p
          className="text-center font-serif"
          style={{
            fontSize: '16rem',
            color: 'rgba(120, 160, 200, 0.8)',
            marginBottom: '40rem',
          }}
        >
          Aya Cloud Canvas
        </p>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full"
          style={{ display: 'flex', flexDirection: 'column', gap: '20rem' }}
        >
          {/* Error Message */}
          {displayError && (
            <div
              style={{
                padding: '14rem 20rem',
                borderRadius: '16rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2rem solid rgba(239, 68, 68, 0.3)',
                color: '#dc2626',
                fontSize: '14rem',
              }}
            >
              {displayError}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14rem',
                color: 'rgba(100, 140, 180, 0.9)',
                marginBottom: '8rem',
                fontWeight: '500',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '16rem 20rem',
                borderRadius: '16rem',
                border: '2rem solid rgba(255, 255, 255, 0.6)',
                background: 'rgba(255, 255, 255, 0.5)',
                fontSize: '16rem',
                color: '#4a6b8a',
                outline: 'none',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="admin@example.com"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '14rem',
                color: 'rgba(100, 140, 180, 0.9)',
                marginBottom: '8rem',
                fontWeight: '500',
              }}
            >
              Пароль
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16rem 50rem 16rem 20rem',
                  borderRadius: '16rem',
                  border: '2rem solid rgba(255, 255, 255, 0.6)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '16rem',
                  color: '#4a6b8a',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(100, 140, 180, 0.6)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4rem',
                }}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '20rem', height: '20rem' }} />
                ) : (
                  <Eye style={{ width: '20rem', height: '20rem' }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '18rem 40rem',
              borderRadius: '68rem',
              background: 'radial-gradient(circle at 62% 51%, #FFD79F 0%, #E4AC76 100%)',
              backdropFilter: 'blur(5px)',
              border: 'none',
              color: '#fff',
              fontSize: '18rem',
              fontWeight: '500',
              boxShadow: '0px 1px 1px 0px rgba(193, 144, 96, 0.12), 0px 4px 15px 0px rgba(193, 144, 96, 0.11), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.79)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10rem',
              marginTop: '12rem',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 style={{ width: '20rem', height: '20rem', animation: 'spin 1s linear infinite' }} />
                <span>Вхід...</span>
              </>
            ) : (
              <>
                <LogIn style={{ width: '20rem', height: '20rem' }} />
                <span>Увійти</span>
              </>
            )}
          </button>
        </form>

        {/* Back to site link */}
        <div style={{ marginTop: '32rem', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              fontSize: '14rem',
              color: 'rgba(120, 160, 200, 0.8)',
              textDecoration: 'none',
            }}
          >
            ← Повернутись на сайт
          </Link>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: rgba(100, 140, 180, 0.5);
        }
        input:focus {
          border-color: rgba(128, 165, 255, 0.6) !important;
          box-shadow: 0 0 0 3rem rgba(128, 165, 255, 0.15);
        }
        a:hover {
          color: rgba(100, 140, 180, 1) !important;
        }
      `}</style>
    </div>
  );
};

// Helper to translate Supabase errors
const getErrorMessage = (message: string): string => {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Невірний email або пароль',
    'Email not confirmed': 'Email не підтверджено',
    'Too many requests': 'Забагато спроб. Спробуйте пізніше',
    'User not found': 'Користувача не знайдено',
  };

  return errorMap[message] || message;
};

export default LoginPage;
