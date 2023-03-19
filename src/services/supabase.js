import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON;
const supabaseServerKey = import.meta.env.VITE_SUPABASE_SERVER;

export const supabase = createClient(
  supabaseUrl,
  supabaseServerKey,
  supabaseAnonKey,
);
