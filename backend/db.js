import { createClient } from '@supabase/supabase-js';

// Environment file paths
const NODE_ENV_PATH = './database.env';

// Load environment variables based on environment
const loadEnvVars = async () => {
  try {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';

    if (!isBrowser) {
      // Node.js environment
      const dotenv = await import('dotenv');
      dotenv.config({ path: NODE_ENV_PATH });

      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error(`Missing Node.js environment variables in ${NODE_ENV_PATH}`);
      }

      return { url, key };
    } else {
      // Browser environment
      // For development, use hardcoded values temporarily
      return {
        url: 'https://hidkbiszltrnqfusgazp.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZGtiaXN6bHRybnFmdXNnYXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjMzNTQsImV4cCI6MjA2MzA5OTM1NH0.2TLjXzRkZHT-2NMH4Hlw3jDOEwAfdbUxV_wJqHB3OHI',
      };
    }
  } catch (error) {
    console.error('Error loading environment variables:', error.message);
    throw error;
  }
};

// Initialize Supabase client
const getSupabaseClient = async () => {
  const { url: supabaseUrl, key: supabaseKey } = await loadEnvVars();
  return createClient(supabaseUrl, supabaseKey);
};

// Export initialized client
const supabase = await getSupabaseClient();
export default supabase;
