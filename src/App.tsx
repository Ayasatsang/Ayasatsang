import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import ScrollToTop from "./components/ScrollToTop";
import LightRaysOverlay from "./components/LightRays";
import Preloader from "./components/Preloader";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Privacy from "./pages/Privacy";
import Books from "./pages/Books";
import Streams from "./pages/Streams";
import Videos from "./pages/Videos";
import Meditations from "./pages/Meditations";
import MeditationBlock from "./pages/MeditationBlock";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Academy from "./pages/Academy";
import AcademyPost from "./pages/AcademyPost";
import Events from "./pages/Events";
import Event from "./pages/Event";
import NotFound from "./pages/NotFound";
import Status from "./pages/Status";

// Admin imports
import AdminLayout from "./admin/AdminLayout";
import CollectionPage from "./admin/pages/CollectionPage";
import ItemEditPage from "./admin/pages/ItemEditPage";
import LoginPage from "./admin/pages/LoginPage";
import ProtectedRoute from "./admin/components/ProtectedRoute";

const queryClient = new QueryClient();

// Відстежує зміни роуту і показує короткий прелоадер при кожному переході
const RouterWithPreloader = () => {
  const location = useLocation();
  const isFirst = useRef(true);
  const [preloaderKey, setPreloaderKey] = useState(0);
  const isAdmin = location.pathname.startsWith('/admin');
  const [showPreloader, setShowPreloader] = useState(!isAdmin); // initial load

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    // Не показуємо прелоадер на admin сторінках
    if (location.pathname.startsWith('/admin')) return;
    // Кожен наступний перехід — короткий прелоадер
    setPreloaderKey((k) => k + 1);
    setShowPreloader(true);
  }, [location.pathname]);

  return (
    <>
      {showPreloader && (
        <Preloader
          key={preloaderKey}
          short={preloaderKey > 0}
          onDone={() => setShowPreloader(false)}
        />
      )}

      <ScrollToTop />
      <LightRaysOverlay
        raysColor="#FFFFFF"
        raysSpeed={0.6}
        lightSpread={0.1}
        rayLength={3}
        fadeDistance={1}
        mouseInfluence={0.08}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/books" element={<Books />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/meditations" element={<Meditations />} />
        <Route path="/meditations/:blockNumber" element={<MeditationBlock />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:id" element={<AcademyPost />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/events" replace />} />
          <Route path=":collection" element={<CollectionPage />} />
          <Route path=":collection/new" element={<ItemEditPage />} />
          <Route path=":collection/:id" element={<ItemEditPage />} />
        </Route>

        {/* Dev-only status page */}
        <Route path="/status" element={<Status />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <HelmetProvider>
  <Helmet>
    <title>Потік Світла та Любові</title>
    <meta name="description" content="Духовний наставник Айа — курси, медитації, книги, події. Потік світла та любові." />
    <meta name="author" content="Aya" />
    <meta property="og:title" content="Потік Світла та Любові" />
    <meta property="og:description" content="Духовний наставник Айа — курси, медитації, книги, події. Потік світла та любові." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aya.webflove.com/" />
    <meta property="og:image" content="https://aya.webflove.com/images/Facebook-post-1.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://aya.webflove.com/images/Facebook-post-1.png" />
  </Helmet>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouterWithPreloader />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
