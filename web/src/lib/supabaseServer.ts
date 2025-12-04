import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Client Supabase lato server per API route / dashboard
 * Usa la SERVICE_ROLE_KEY (solo su server, mai sul client!)
 */
export function supabaseServer() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn(
      "[supabaseServer] Variabili ambiente mancanti. NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY non sono settate."
    );
    throw new Error(
      "Supabase non è configurato correttamente sul server (mancano env)."
    );
  }

  const client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  return client;
}
