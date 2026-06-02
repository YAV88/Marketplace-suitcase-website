// config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabaseUrl = 'https://jeinonooelndbtjalnwa.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Твой полный ключ
export const supabase = createClient(supabaseUrl, supabaseKey);

// Глобальные переменные состояния
window.currentLang = localStorage.getItem('svalka_lang') || 'ru';
window.currentUser = null;
window.userFavorites = new Set();
