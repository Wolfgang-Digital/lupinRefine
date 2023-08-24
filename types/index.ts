import { Database } from 'types/supabase';

export type Tables = Database['public']['Tables'];
export type Client = Tables['client']['Row'];
export type Currency = Tables['currency']['Row'];
export type Wolfgangers = Tables['wolfgangers']['Row'];
export type Tier = Tables['tier']['Row'];
