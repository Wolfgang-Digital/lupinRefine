import { createClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';
export type { PostgrestError } from '@supabase/supabase-js';
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
