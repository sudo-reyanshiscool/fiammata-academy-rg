import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { profileRepository } from '../repository/profileRepository';
import type { UserProfile } from '../repository/profileRepository';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isMentor: boolean;
  mentorId: string | null;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isMentor: false,
  mentorId: null,
  profile: null,
  refreshProfile: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);
  const [mentorId, setMentorId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const checkIfMentor = (currentUser: User | null | undefined) => {
    if (!currentUser || !currentUser.email) {
      setIsMentor(false);
      setMentorId(null);
      return;
    }
    
    // The Vault: Hardcoded Mentor Email Whitelist
    const mentorWhitelist: Record<string, string> = {
      'swastik316250206@genesisgs.edu.in': 'mentor-1',
      'vedant306150099@genesisgs.edu.in': 'mentor-2',
      'shaurea306150085@genesisgs.edu.in': 'mentor-3',
      'naishasingla@gmail.com': 'mentor-4',
      'reyansh@fiammata.com': 'mentor-5'
    };

    const userEmail = currentUser.email.toLowerCase();
    
    if (mentorWhitelist[userEmail]) {
      setIsMentor(true);
      setMentorId(mentorWhitelist[userEmail]);
    } else {
      setIsMentor(false);
      setMentorId(null);
    }
  };

  const loadProfile = useCallback(async (currentUser: User | null) => {
    const prof = await profileRepository.getProfile(currentUser);
    setProfile(prof);
  }, []);

  const refreshProfile = async () => {
    await loadProfile(user);
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkIfMentor(currentUser);
      loadProfile(currentUser);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkIfMentor(currentUser);
      loadProfile(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(profileRepository.getDefaultProfile(null));
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isMentor, mentorId, profile, refreshProfile, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
