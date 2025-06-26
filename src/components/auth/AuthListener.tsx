import { useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthListener: React.FC = () => {
  const { setUser, getCurrentUser } = useAuthStore();

  useEffect(() => {
    // Get initial session
    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Refresh user data when signed in
          await getCurrentUser();
        } else if (event === 'SIGNED_OUT') {
          // Clear user data when signed out
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, getCurrentUser]);

  return null;
};

export default AuthListener;