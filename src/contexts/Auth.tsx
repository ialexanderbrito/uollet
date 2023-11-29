import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Factor, UserProps } from 'interfaces/AuthProps';

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
  hasMFA: boolean;
  areValueVisible: boolean;
  toggleValueVisibility: () => void;
  checkUser: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [areValueVisible, setAreValueVisible] = useState<boolean>(() => {
    const areValuesVisibleStorage = localStorage.getItem(
      '@uollet:areValuesVisible',
    );

    return areValuesVisibleStorage !== 'false';
  });
  const storageUser = JSON.parse(localStorage.getItem('@uollet:user') || '{}');

  const toggleValueVisibility = useCallback(() => {
    setAreValueVisible((prevState) => {
      localStorage.setItem('@uollet:areValuesVisible', String(!prevState));

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

    if (user.user_metadata.otp) {
      return true;
    }

    return false;
  }

  function hasMFA() {
    if (!user) return false;

    const factors = user.factors;

    if (!factors) return false;

    const factorVerify = factors.find(
      (factor: Factor) => factor.status === 'verified',
    );

    if (!factorVerify) return false;

    return true;
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
      localStorage.setItem('@uollet:user', JSON.stringify(user));
    }

    setUser(user);
    localStorage.setItem('@uollet:user', JSON.stringify(user));
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

    localStorage.removeItem('@uollet:user');
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
        hasMFA: hasMFA(),
        areValueVisible,
        toggleValueVisibility,
        checkUser,
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
