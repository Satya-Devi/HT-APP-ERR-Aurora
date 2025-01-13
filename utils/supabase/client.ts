import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";

export const createClient = () => {
  try {
    return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    // Return a fallback or null
    return null;
  }
}
