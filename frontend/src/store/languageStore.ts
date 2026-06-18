import { create } from 'zustand';
import { type User } from 'firebase/auth';
import { LanguageType } from '../types/language';
import { API_URL } from '../config/api';

interface LanguageState {
    preferredLanguage: LanguageType;
    currentLanguage: LanguageType;
    setCurrentLanguage: (lang: LanguageType) => void;
    setPreferredLanguage: (lang: LanguageType, syncToBackend?: boolean) => Promise<void>;
    initialize: (user: User | null) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    preferredLanguage: LanguageType.CPP,
    currentLanguage: LanguageType.CPP,

    setCurrentLanguage: (currentLanguage) => {
        set({ currentLanguage });
    },

    setPreferredLanguage: async (preferredLanguage, syncToBackend = true) => {
        // Validation: Only allow supported languages
        if (preferredLanguage !== LanguageType.CPP && preferredLanguage !== LanguageType.PYTHON) {
            console.warn(`Attempted to set unsupported language: ${preferredLanguage}`);
            return;
        }

        // Save locally for guest persistence
        localStorage.setItem('codeflow_preferred_language', preferredLanguage);
        set({ preferredLanguage });

        if (syncToBackend) {
            // Check if user is authenticated
            const { auth } = await import('../config/firebase');
            const user = auth.currentUser;
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const res = await fetch(`${API_URL}/api/user/preferences`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            preferredLanguage
                        })
                    });
                    if (!res.ok) {
                        console.error('Failed to sync preferred language to backend:', res.statusText);
                    }
                } catch (err) {
                    console.error('Failed to sync preferred language preference:', err);
                }
            }
        }
    },

    initialize: async (user) => {
        const guestPref = localStorage.getItem('codeflow_preferred_language') as LanguageType | null;
        const fallbackPref = guestPref || LanguageType.CPP;

        if (!user) {
            // Guest User: Read from localStorage only
            set({
                preferredLanguage: fallbackPref,
                currentLanguage: fallbackPref
            });
            return;
        }

        try {
            // Authenticated User: Fetch from backend
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/user/preferences`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                let backendPref = data.preferredLanguage as LanguageType || LanguageType.CPP;

                // Merge guest preference if guest pref differs and backend is default cpp
                if (guestPref && guestPref !== backendPref && backendPref === LanguageType.CPP) {
                    await fetch(`${API_URL}/api/user/preferences`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ preferredLanguage: guestPref })
                    });
                    backendPref = guestPref;
                }

                localStorage.setItem('codeflow_preferred_language', backendPref);
                set({
                    preferredLanguage: backendPref,
                    currentLanguage: backendPref
                });
            } else {
                // Backend error fallback
                set({
                    preferredLanguage: fallbackPref,
                    currentLanguage: fallbackPref
                });
            }
        } catch (err) {
            console.error('Failed to initialize preferred language:', err);
            set({
                preferredLanguage: fallbackPref,
                currentLanguage: fallbackPref
            });
        }
    }
}));
