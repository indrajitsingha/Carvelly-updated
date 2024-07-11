import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ttjauaexcjjhtnygwhij.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0amF1YWV4Y2pqaHRueWd3aGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1MDIxMzMsImV4cCI6MjAzNTA3ODEzM30.T73a6OUkMyx0IwVb5ArjrWSHvm4y4T-4hVY64-mSPSU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase