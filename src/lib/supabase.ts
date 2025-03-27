
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agmtwmpchnqxunfkcnur.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbXR3bXBjaG5xeHVuZmtjbnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NjI0ODcsImV4cCI6MjA1ODUzODQ4N30.fi6jhjV6kA328gW9aEK5bqoqw0vwjRV1j31TPN6SjnQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
