"use client";
import { createClient } from "@supabase/supabase-js";
import { ENV } from "@/config/env";

export const supabase = createClient(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);