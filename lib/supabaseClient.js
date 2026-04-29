import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsovndiwiqlieaobmhyv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzb3ZuZGl3aXFsaWVhb2JtaHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzkxMzQsImV4cCI6MjA5MTYxNTEzNH0.XL2SaKQybFDFrBX1cZxdE8HaPB89mQtV4bNX608LSgs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)