// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.31.0/+esm';




// Get the Supabase URL and anon key from environment variables or use defaults
const supabaseUrl = window.env.VITE_SUPABASE_URL
const supabaseKey = window.env.VITE_SUPABASE_ANON_KEY

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);



export default supabase;