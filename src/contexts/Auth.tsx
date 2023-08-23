import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { UserProps } from 'interfaces/AuthProps';

import { supabase } from 'services/supabase';

import { useToast } from './Toast';

interface AuthContextProps {
  user: UserProps | null;
  setUser: (user: any) => void;
  loginWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  storageUser: UserProps | null;
  signed: boolean;
  hasOtp: boolean;
  areValueVisible: boolean;
  toggleValueVisibility: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [areValueVisible, setAreValueVisible] = useState<boolean>(() => {
    const areValuesVisibleStorage = localStorage.getItem(
      '@finance:areValuesVisible',
    );

    return areValuesVisibleStorage !== 'false';
  });
  const storageUser = JSON.parse(localStorage.getItem('@finance:user') || '{}');

  const toggleValueVisibility = useCallback(() => {
    setAreValueVisible((prevState) => {
      localStorage.setItem('@finance:areValuesVisible', String(!prevState));

      return !prevState;
    });
  }, []);

  function isSignedIn() {
    if (user) {
      return true;
    }

    return false;
  }

  function hasOtp() {
    if (!user) return false;

    if (user.user_metadata?.otp) {
      return true;
    }

    return false;
  }

  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (!data) return;

    if (error) {
      toast.error('Erro ao fazer login com Google', {
        id: 'error',
      });
    }
  }

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (!storageUser) {
      localStorage.setItem('@finance:user', JSON.stringify(user));
    }

    setUser(user);
    localStorage.setItem('@finance:user', JSON.stringify(user));

    if (user) {
      // navigate('/');
    }
  }

  useEffect(() => {
    checkUser();

    window.addEventListener('hashchange', () => {
      checkUser();
    });

    return () => {
      window.removeEventListener('hashchange', () => {
        checkUser();
      });
    };
  }, [isSignedIn()]);

  async function logOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Erro ao sair', {
        id: 'error',
      });
    }

    setUser(null);
    navigate('/');

    localStorage.removeItem('@finance:user');
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        logOut,
        user,
        setUser,
        storageUser,
        signed: isSignedIn(),
        hasOtp: hasOtp(),
        areValueVisible,
        toggleValueVisibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
