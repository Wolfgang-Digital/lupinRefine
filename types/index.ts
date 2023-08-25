import { Database } from 'types/supabase';

export type Tables = Database['public']['Tables'];
export type Views = Database['public']['Views'];
export type Client = Tables['client']['Row'];
export type Currency = Tables['currency']['Row'];
export type Wolfgangers = Tables['wolfgangers']['Row'];
export type Tier = Tables['tier']['Row'];
export type Job = Tables['jobs']['Row'];
export type Country = Tables['countries']['Row'];
export type FinancialTable = Views['timesheet_rows_byuser_v4']['Row'];
