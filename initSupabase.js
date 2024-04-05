import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iuovpwbgwtrokaohjzmw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1b3Zwd2Jnd3Ryb2thb2hqem13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMTIxMTMsImV4cCI6MjAyNzc4ODExM30.Cof9dSX4mfBmi-WRDkhlMs6PkSO7cewhy7MvrEEJ5uM'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase, AsyncStorage };
