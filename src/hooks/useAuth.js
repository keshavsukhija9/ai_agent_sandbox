import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign out error:', error);
      }
      
      // Clear local state
      setUser(null);
      setLoading(false);
      
      // Clear all local storage
      localStorage.removeItem('mockUser');
      localStorage.removeItem('demo_agents');
      
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign out failed:', error);
      // Force clear state anyway
      setUser(null);
      localStorage.clear();
    }
  };

  return { user, loading, signOut };
};