'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

type AuthResult = {
    success: boolean;
    error?: string;
};

type SignupData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: () => boolean;
    login: (email: string, password: string) => Promise<AuthResult>;
    signup: (data: SignupData) => Promise<AuthResult>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch {
            return { success: false, error: 'An unexpected error occurred' };
        }
    }, [supabase]);

    const signup = useCallback(async (data: SignupData): Promise<AuthResult> => {
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        full_name: `${data.firstName} ${data.lastName}`,
                    },
                },
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch {
            return { success: false, error: 'An unexpected error occurred' };
        }
    }, [supabase]);

    const signInWithGoogle = useCallback(async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }, [supabase]);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
    }, [supabase]);

    const isAdmin = useCallback(() => {
        if (!user) return false;
        // Check user metadata for admin role
        const role = user.user_metadata?.role || user.app_metadata?.role;
        return role === 'admin' || role === 'owner' || role === 'manager';
    }, [user]);

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        login,
        signup,
        signInWithGoogle,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
