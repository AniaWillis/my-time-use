import { createClient } from "@supabase/supabase-js";

// createClient requires two arguments: supabase project URL and supabase anonymous key

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
