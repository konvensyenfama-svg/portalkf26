// File: supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseKey } from './config' 

// Ini akan wujudkan connection yang stabil
export const supabase = createClient(supabaseUrl, supabaseKey)