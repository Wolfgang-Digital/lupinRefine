
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://stujybrsreksohyiqtdu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dWp5YnJzcmVrc29oeWlxdGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5NTY0OTksImV4cCI6MjAwNTUzMjQ5OX0.slvxjc2x-JQyaDNcjAnXlL49slHiXHU8PdXvPtEs964"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase