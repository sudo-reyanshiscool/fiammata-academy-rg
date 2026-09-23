import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  fullName: string;
  email: string;
  teamName: string;
  institution: string;
  phone: string;
  primaryCategory: string;
  competitionClass: 'Development Class' | 'Professional Class' | 'Cadet' | 'University / Open';
  competitionStage: 'Regionals Prep' | 'National Finals' | 'World Finals' | 'General STEM';
  licenseNumber: string;
  profileCompleted: boolean;
  autoFillRequests: boolean;
  notificationsEnabled: boolean;
}

const STORAGE_KEY = 'fiammata_user_profile';

function generateLicenseNumber(userId?: string): string {
  if (!userId) return 'FIA-2026-8800';
  // Deterministic 4-digit code based on user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  const code = Math.abs(hash % 9000) + 1000;
  return `FIA-2026-${code}`;
}

export const profileRepository = {
  getDefaultProfile(user?: User | null): UserProfile {
    const meta = user?.user_metadata || {};
    const teamName = meta.team_name || meta.teamName || '';
    return {
      fullName: meta.full_name || meta.name || '',
      email: user?.email || '',
      teamName,
      institution: meta.institution || meta.school || 'Genesis Global School',
      phone: meta.phone || '',
      primaryCategory: meta.primaryCategory || 'Enterprise Portfolio',
      competitionClass: meta.competitionClass || 'Development Class',
      competitionStage: meta.competitionStage || 'Regionals Prep',
      licenseNumber: meta.licenseNumber || generateLicenseNumber(user?.id),
      profileCompleted: Boolean(teamName.trim()),
      autoFillRequests: meta.autoFillRequests !== undefined ? meta.autoFillRequests : true,
      notificationsEnabled: meta.notificationsEnabled !== undefined ? meta.notificationsEnabled : true,
    };
  },

  async getProfile(user?: User | null): Promise<UserProfile> {
    const defaultProfile = this.getDefaultProfile(user);

    // Try local storage cache first for instant response
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${user?.id || 'anon'}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultProfile,
          ...parsed,
          profileCompleted: Boolean((parsed.teamName || defaultProfile.teamName).trim()),
        };
      }
    } catch (e) {
      console.warn('Could not read cached profile:', e);
    }

    return defaultProfile;
  },

  async updateProfile(user: User | null, updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getProfile(user);
    const updated: UserProfile = { 
      ...current, 
      ...updates,
      profileCompleted: Boolean((updates.teamName !== undefined ? updates.teamName : current.teamName).trim())
    };

    // 1. Cache to localStorage for fast, offline-ready UI updates
    try {
      localStorage.setItem(`${STORAGE_KEY}_${user?.id || 'anon'}`, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist profile locally:', e);
    }

    // 2. Persist to Supabase user_metadata if user is authenticated and Supabase is connected
    if (user && import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: updated.fullName,
          team_name: updated.teamName,
          institution: updated.institution,
          phone: updated.phone,
          primaryCategory: updated.primaryCategory,
          competitionClass: updated.competitionClass,
          competitionStage: updated.competitionStage,
          licenseNumber: updated.licenseNumber,
          profileCompleted: updated.profileCompleted,
          autoFillRequests: updated.autoFillRequests,
          notificationsEnabled: updated.notificationsEnabled,
        }
      });
      if (error) {
        console.error('Failed to sync profile to Supabase user_metadata:', error);
      }
    }

    return updated;
  },

  async deleteAccountData(user: User | null): Promise<void> {
    // 1. Clear local caches and requests
    try {
      localStorage.removeItem(`${STORAGE_KEY}_${user?.id || 'anon'}`);
      localStorage.removeItem('fiammata_academy_requests');
    } catch (e) {
      console.warn('Error clearing local storage:', e);
    }

    // 2. If connected to Supabase, sign out and flag metadata
    if (import.meta.env.VITE_SUPABASE_URL && user) {
      try {
        await supabase.auth.updateUser({
          data: { account_status: 'deleted', deleted_at: new Date().toISOString() }
        });
      } catch (e) {
        console.warn('Could not flag account status in Supabase:', e);
      }
      await supabase.auth.signOut();
    }
  }
};
