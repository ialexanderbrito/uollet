import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Factor, PlanProps, UserProps } from 'interfaces/AuthProps';

import {
  getCustomerSubscriptionDetails,
  getCustumerByIdentificationNumber,
} from 'services/payments';
import { supabase } from 'services/supabase';

import { useToast } from './Toast';

interface AuthContextProps {
  user: UserProps | null;
  setUser: (user: any) => void;
  loginWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  signed: boolean;
  hasOtp: boolean;
  hasMFA: boolean;
  areValueVisible: boolean;
  toggleValueVisibility: () => void;
  checkUser: () => Promise<void>;
  informationUser: () => Promise<void>;
  isPlanActive: boolean;
  setIsPlanActive: (value: boolean) => void;
  plan: PlanProps | undefined;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [isPlanActive, setIsPlanActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<PlanProps>();
  const [areValueVisible, setAreValueVisible] = useState<boolean>(() => {
    const areValuesVisibleStorage = localStorage.getItem(
      '@uollet:areValuesVisible',
    );

    return areValuesVisibleStorage !== 'false';
  });

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

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!user || !session) return;

    setUser(user);
    sessionStorage.setItem('@uollet:token', session.access_token);
    sessionStorage.setItem('@uollet:refreshToken', session.refresh_token);
  }

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

  async function informationUser() {
    if (!user) return;

    const identificationNumber = user.user_metadata.identification_number;
    const identificationSubscription = user.user_metadata.subscription_id;

    if (identificationNumber && !identificationSubscription) {
      try {
        const { data: dataPrimefy } =
          await getCustumerByIdentificationNumber(identificationNumber);

        if (!dataPrimefy) return;

        const { data } = await supabase.auth.updateUser({
          data: {
            subscription_id: dataPrimefy.subscriptions[0].id,
          },
        });

        if (!data) return;

        setUser(data);
      } catch (error) {
        toast.error('Erro ao buscar informações do usuário', {
          id: 'error',
        });
      }
    }

    if (identificationNumber && identificationSubscription) {
      setLoading(true);
      try {
        const { data } = await getCustomerSubscriptionDetails(
          identificationSubscription,
        );

        if (!data) {
          setLoading(false);
          return;
        }

        if (data.status === 'Active') {
          setIsPlanActive(true);
        }

        setPlan(data);
      } catch (error) {
        toast.error('Erro ao buscar informações do plano do usuário', {
          id: 'error',
        });
      } finally {
        setLoading(false);
      }
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

  useEffect(() => {
    informationUser();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        logOut,
        user,
        setUser,
        signed: isSignedIn(),
        hasOtp: hasOtp(),
        hasMFA: hasMFA(),
        areValueVisible,
        toggleValueVisibility,
        checkUser,
        informationUser,
        isPlanActive,
        setIsPlanActive,
        plan,
        loading,
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
