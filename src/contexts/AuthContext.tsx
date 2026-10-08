import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isDemo: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInDemo: (username: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Проверяем, настроен ли Supabase
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && url !== 'https://your-project.supabase.co';
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(!isSupabaseConfigured());

  useEffect(() => {
    // Если Supabase не настроен — работаем в демо-режиме
    if (!isSupabaseConfigured()) {
      // Проверяем localStorage на демо-пользователя
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        const parsed = JSON.parse(demoUser);
        setUser({ id: parsed.id, email: parsed.email } as User);
        setProfile({ id: parsed.id, username: parsed.username });
        setIsDemo(true);
      }
      setIsLoading(false);
      return;
    }

    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (isDemo) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (isDemo) {
      // Демо-режим
      const id = 'demo-' + Date.now();
      const demoUser = { id, email, username };
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      setUser({ id, email } as User);
      setProfile({ id, username });
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, username });
      setProfile({ id: data.user.id, username });
    }
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (isDemo) {
      return { error: 'В демо-режиме используйте кнопку "Войти как гость"' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    
    if (data.user) {
      await fetchProfile(data.user.id);
    }
    return { error: null };
  };

  const signInDemo = async (username: string) => {
    const id = 'demo-' + Date.now();
    const demoUser = { id, email: `${username}@demo.local`, username };
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    setUser({ id, email: demoUser.email } as User);
    setProfile({ id, username });
    setIsDemo(true);
    return { error: null };
  };

  const signOut = async () => {
    if (isDemo) {
      localStorage.removeItem('demoUser');
      setUser(null);
      setProfile(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, isLoading, isDemo, signUp, signIn, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
