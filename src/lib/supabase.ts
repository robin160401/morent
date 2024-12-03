import { createClient } from "@supabase/supabase-js";
import {Database} from "database.types"

const supaBaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supaBaseURL || !supabaseAnonKey) {
    throw new Error(
      "Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env"
    );
  }

export const supabase = createClient<Database>(supaBaseURL, supabaseAnonKey);

export function getStorageURL(path: string | null) {
    if (path === null) return null;
    const URL = supabase + "/storage/buckets/profile_image/" + path;
    return URL;
  }

   // storage/v1/object/public/