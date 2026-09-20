import { supabase } from '../lib/supabase';

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  studentName: string;
  studentEmail: string;
  teamName: string;
  areaOfHelp: string;
  problemStatement: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

export const requestRepository = {
  async saveRequest(request: Omit<MentorshipRequest, 'id' | 'status' | 'createdAt'>): Promise<MentorshipRequest> {
    const newRequest = {
      ...request,
      status: 'pending' as const,
    };

    if (!import.meta.env.VITE_SUPABASE_URL) {
      // Fallback for local testing if Supabase is not configured yet
      const req = { ...newRequest, id: Date.now().toString(), createdAt: new Date().toISOString() };
      const existingStr = localStorage.getItem('fiammata_academy_requests');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('fiammata_academy_requests', JSON.stringify([req, ...existing]));
      return req;
    }

    const { data, error } = await supabase
      .from('requests')
      .insert([newRequest])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMyRequests(email?: string): Promise<MentorshipRequest[]> {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const existingStr = localStorage.getItem('fiammata_academy_requests');
      const allReqs = existingStr ? JSON.parse(existingStr) : [];
      // If email provided, mock filter, otherwise return all (mock behavior)
      return email ? allReqs.filter((r: MentorshipRequest) => r.studentEmail === email) : allReqs;
    }

    if (!email) {
      const { data: { user } } = await supabase.auth.getUser();
      email = user?.email;
    }

    if (!email) return [];

    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('studentEmail', email)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  },
  
  // Admin Methods
  async getAllRequests(): Promise<MentorshipRequest[]> {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const existingStr = localStorage.getItem('fiammata_academy_requests');
      return existingStr ? JSON.parse(existingStr) : [];
    }

    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllRequestsForMentor(mentorId: string): Promise<MentorshipRequest[]> {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const existingStr = localStorage.getItem('fiammata_academy_requests');
      const allReqs = existingStr ? JSON.parse(existingStr) : [];
      return allReqs.filter((r: MentorshipRequest) => r.mentorId === mentorId);
    }

    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('mentorId', mentorId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateRequestStatus(requestId: string, status: 'accepted' | 'declined' | 'completed'): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const existingStr = localStorage.getItem('fiammata_academy_requests');
      let allReqs = existingStr ? JSON.parse(existingStr) : [];
      allReqs = allReqs.map((r: MentorshipRequest) => r.id === requestId ? { ...r, status } : r);
      localStorage.setItem('fiammata_academy_requests', JSON.stringify(allReqs));
      return;
    }

    const { data, error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', requestId)
      .select();

    if (error) throw error;
    
    if (!data || data.length === 0) {
      console.warn('Update executed but 0 rows were affected. This is almost always caused by Supabase Row Level Security (RLS) blocking the UPDATE.');
      throw new Error('Supabase RLS blocked the status update. Please disable RLS or add an UPDATE policy.');
    }
  }
};
