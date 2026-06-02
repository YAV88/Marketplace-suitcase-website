// modules/auth.js
import { supabase } from '../config.js';

export const AuthModule = {
    checkUserSession: async () => {
        // ...весь твой код из window.checkUserSession
    },
    handleAuthChange: async (session) => {
        // ...весь твой код из window.handleAuthChange
    },
    submitAuth: async (event) => {
        // ...весь твой код из window.submitAuth
    },
    logout: async () => {
        // ...весь твой код из window.logout
    }
};
