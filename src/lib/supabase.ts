import { createClient } from '@supabase/supabase-js';

// Fallback values for production (anon key is safe to expose - protected by RLS)
const FALLBACK_SUPABASE_URL = 'https://jnozwatlcrgzuhyqliet.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impub3p3YXRsY3JnenVoeXFsaWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMjE5NzgsImV4cCI6MjA4MzY5Nzk3OH0.I9hnQrITnUkE_NqB2qnAUwtTKRjNTaZZeozo0cn5m3k';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
