import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !service) throw new Error("Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
  return createClient(url, service, { auth: { persistSession: false } });
}

export function publicObjectUrl(bucket: string, path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
