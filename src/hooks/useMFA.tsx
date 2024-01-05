import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useMFA() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, hasMFA } = useAuth();

  const [factorId, setFactorId] = useState('');
  const [qr, setQR] = useState('');
  const [secret, setSecret] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [challengeId, setChallengeId] = useState('');

  async function handleChangeMFA(otp: string) {
    if (!user) return;

    setVerifyCode(otp);
  }

  function pageLocationMFA(page: string) {
    if (page === '/otp') {
      return true;
    }

    return false;
  }

  async function savePasswordMFA() {
    if (!user) return;

    if (hasMFA) {
      const factors = await supabase.auth.mfa.listFactors();

      if (factors.error) {
        toast.error('Erro ao verificar fatores MFA. Tente novamente', {
          id: 'error',
        });
        return;
      }

      const totpFactor = factors.data.totp[0];

      if (!totpFactor) {
        toast.error('Nenhum fator TOTP encontrado!', { id: 'error' });
        return;
      }

      const factorId = totpFactor.id;

      const challenge = await supabase.auth.mfa.challenge({ factorId });

      if (challenge.error) {
        toast.error(challenge.error.message);
        return;
      }

      const challengeId = challenge.data.id;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      });

      if (verify.error) {
        toast.error(`Erro ao verificar código: ${verify.error.message}`, {
          id: 'error',
        });
        return;
      }

      if (!verify.data) return;

      if (verify.data) {
        sessionStorage.setItem('@uollet:hasMFA', 'true');

        toast.success('Bem vindo ao uollet', {
          id: 'success',
        });

        navigate('/');
      }
    }
  }

  function verifyMFAEnabled() {
    if (!user) return false;

    const factors = user.factors;

    if (!factors) return false;

    const factorVerify = factors.find((factor) => factor.status === 'verified');

    if (!factorVerify) return false;

    return true;
  }

  async function enrollMFA() {
    const factors = await supabase.auth.mfa.listFactors();

    const factorVerify = factors.data?.totp.find(
      (factor) => factor.status === 'verified',
    );

    if (factorVerify) return;

    const { error, data } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (!data) return;

    setFactorId(data.id);
    setQR(data.totp.qr_code);
    setSecret(data.totp.secret);

    const { error: erroChallenge, data: dataChallenge } =
      await supabase.auth.mfa.challenge({
        factorId: data.id,
      });

    if (erroChallenge) {
      setError(erroChallenge.message);
    }

    if (!dataChallenge) return;

    setChallengeId(dataChallenge.id);
  }

  async function unenrollMFA() {
    const factors = await supabase.auth.mfa.listFactors();

    if (!factors.data) return;

    if (!factors.data.totp) return;

    factors.data.all.forEach(async (factor) => {
      await supabase.auth.mfa.unenroll({ factorId: factor.id });
    });

    toast.success('MFA desativado com sucesso', {
      id: 'success',
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    localStorage.setItem('@uollet:user', JSON.stringify(user));
    sessionStorage.setItem('@uollet:hasMFA', 'false');
    setUser(user);

    window.location.reload();
  }

  async function verifyMFA() {
    const { error, data } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: verifyCode,
    });

    if (error) {
      setError('Código inválido, tente novamente');
      return;
    }

    if (!data) return;

    toast.success('MFA ativado com sucesso', {
      id: 'success',
    });

    setError('');

    const factors = await supabase.auth.mfa.listFactors();

    if (!factors.data) return;

    if (!factors.data.totp) return;

    factors.data.totp.forEach(async (factor) => {
      if (factor.status === 'unverified') {
        await supabase.auth.mfa.unenroll({ factorId: factor.id });
      }
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    localStorage.setItem('@uollet:user', JSON.stringify(user));
    setUser(user);
  }

  return {
    enrollMFA,
    verifyMFA,
    setVerifyCode,
    qr,
    secret,
    verifyCode,
    error,
    verifyMFAEnabled,
    unenrollMFA,
    handleChangeMFA,
    pageLocationMFA,
    savePasswordMFA,
  };
}
