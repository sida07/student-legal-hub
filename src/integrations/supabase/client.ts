// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vewyirzscajhyuzfzqxg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld3lpcnpzY2FqaHl1emZ6cXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjAxMzksImV4cCI6MjA1MzY5NjEzOX0.7DelzBzY6vxPnQeT8bAlC2HkKh1UzGAE74jaea8Zx8w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);