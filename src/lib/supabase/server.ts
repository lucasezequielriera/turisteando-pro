import { createClient } from "@supabase/supabase-js";
import { ENV } from "@/config/env";

export function supabaseService() {
  const url = ENV.NEXT_PUBLIC_SUPABASE_URL;
  const key = ENV.SUPABASE_SERVICE_ROLE;
  return createClient(url, key, { auth: { persistSession: false } });
}