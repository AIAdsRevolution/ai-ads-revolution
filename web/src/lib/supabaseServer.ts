import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn(
    "[AIAdsRevolution] SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL non 
impostato nelle env."
  );
}

if (!serviceRoleKey) {
  console.warn(
    "[AIAdsRevolution] SUPABASE_SERVICE_ROLE_KEY non impostata nelle env."
  );
}

/**
 * Client Supabase lato server.
 * Usa la SERVICE ROLE KEY, quindi va usato SOLO in API route / server,
 * mai esposto al browser.
 */
export const supabaseServer = createClient(supabaseUrl!, serviceRoleKey!, 
{
  auth: {
    persistSession: false,
  },
});

