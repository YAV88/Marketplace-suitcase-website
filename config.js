// config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabaseUrl = 'https://jeinonooelndbtjalnwa.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaW5vbm9vZWxuZGJ0amFsbndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MjUwNDMsImV4cCI6MjA5MjIwMTA0M30.3g4TS3XSnnZujgXmyxSIy3d9SbiX7BSUOreq3LPH6gI';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Глобальные переменные состояния
window.currentLang = localStorage.getItem('svalka_lang') || 'ru';
window.currentUser = null;
window.userFavorites = new Set();
