import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Sync Supabase session with localStorage for ProtectedRoute
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    localStorage.setItem("token", session.access_token);
    // You can set default role or fetch it from a profile table
    if (!localStorage.getItem("role")) {
      localStorage.setItem("role", "BUYER");
    }
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
});
