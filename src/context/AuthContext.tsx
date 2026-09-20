import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isMentor: boolean;
  mentorId: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isMentor: false,
  mentorId: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);
  const [mentorId, setMentorId] = useState<string | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkIfMentor(session?.user);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkIfMentor(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfMentor = async (user: User | null | undefined) => {
    if (!user || !user.email) {
      setIsMentor(false);
      setMentorId(null);
      return;
    }
    
    // The Vault: Hardcoded Mentor Email Whitelist
    const mentorWhitelist: Record<string, string> = {
      'swastik316250206@genesisgs.edu.in': 'mentor-1',
      'vedant306150099@genesisgs.edu.in': 'mentor-2',
      'shaurea306150085@genesisgs.edu.in': 'mentor-3',
      'naisha@fiammata.com': 'mentor-4' // TBD placeholder
    };

    const userEmail = user.email.toLowerCase();
    
    if (mentorWhitelist[userEmail]) {
      setIsMentor(true);
      setMentorId(mentorWhitelist[userEmail]);
    } else {
      setIsMentor(false);
      setMentorId(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isMentor, mentorId, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
