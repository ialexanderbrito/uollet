import { useEffect, useState } from 'react';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

type ProfileKey =
  | 'Arrojado'
  | 'Neutro'
  | 'Conservador'
  | 'ConservadorModerado'
  | 'ArrojadoModerado';

export function useInvestorProfile() {
  const { setUser } = useAuth();
  const { toast } = useToast();

  const [data, setData] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [formActive, setFormActive] = useState(false);

  async function handleSetData(value: string) {
    if (!value) {
      setFormActive(false);
      setAnswers([]);
      setData('');
      return;
    }

    try {
      const { data } = await supabase.auth.updateUser({
        data: {
          investor_profile: value,
        },
      });

      if (!data) return;

      setData(value);
      setUser(data.user);
      localStorage.setItem('@uollet:user', JSON.stringify(data.user));
    } catch (error) {
      toast.error('Erro ao salvar perfil de investidor', { id: 'error' });
    }
  }

  async function handleGetData() {
    try {
      const { data } = await supabase.auth.getUser();

      if (!data) return;

      const profileInvestor = data.user?.user_metadata.investor_profile;

      if (profileInvestor) {
        setData(profileInvestor);
      } else {
        setFormActive(true);
      }
    } catch (error) {
      toast.error('Erro ao buscar perfil de investidor', { id: 'error' });
    }
  }

  async function retakeProfile() {
    const { data } = await supabase.auth.updateUser({
      data: {
        investor_profile: null,
      },
    });

    if (!data) return;

    if (!data.user?.user_metadata.investor_profile) {
      setAnswers([]);
      setFormActive(true);
      setData('');
    }

    handleSetData('');
  }

  async function verifyProfile() {
    const counts = {
      Conservador: 0,
      ConservadorModerado: 0,
      Neutro: 0,
      ArrojadoModerado: 0,
      Arrojado: 0,
    };

    answers.forEach((type) => {
      switch (type) {
        case 'C':
          counts.Conservador++;
          break;
        case 'PC':
          counts.ConservadorModerado++;
          break;
        case 'N':
          counts.Neutro++;
          break;
        case 'PA':
          counts.ArrojadoModerado++;
          break;
        case 'A':
          counts.Arrojado++;
          break;
        default:
          break;
      }
    });

    const mostFrequentType = Object.keys(counts).reduce((a, b) =>
      counts[a as ProfileKey] > counts[b as ProfileKey] ? a : b,
    ) as ProfileKey;

    handleSetData(mostFrequentType);

    const handleConservadorModerado = () => {
      if (counts.Conservador === counts.Arrojado) handleSetData('Neutro');
      if (
        counts.Conservador === counts.ArrojadoModerado ||
        counts.Conservador === counts.Neutro
      )
        handleSetData('ConservadorModerado');
    };

    const handleConservador = () => {
      if (counts.ConservadorModerado === counts.Arrojado)
        handleSetData('ArrojadoModerado');
      if (counts.ConservadorModerado === counts.ArrojadoModerado)
        handleSetData('Neutro');
      if (counts.ConservadorModerado === counts.Conservador)
        handleSetData('Conservador');
    };

    const handleArrojado = () => {
      if (counts.Arrojado === counts.Conservador) handleSetData('Neutro');
      if (
        counts.Arrojado === counts.ConservadorModerado ||
        counts.Arrojado === counts.Neutro
      )
        handleSetData('ArrojadoModerado');
    };

    const handleArrojadoModerado = () => {
      if (counts.ArrojadoModerado === counts.Conservador)
        handleSetData('ConservadorModerado');
      if (counts.ArrojadoModerado === counts.ConservadorModerado)
        handleSetData('Neutro');
      if (counts.ArrojadoModerado === counts.Arrojado)
        handleSetData('Arrojado');
    };

    const handleNeutro = () => {
      if (
        counts.Neutro === counts.Conservador ||
        counts.Neutro === counts.ConservadorModerado
      )
        handleSetData('ConservadorModerado');
      if (
        counts.Neutro === counts.Arrojado ||
        counts.Neutro === counts.ArrojadoModerado
      )
        handleSetData('ArrojadoModerado');
    };

    switch (mostFrequentType) {
      case 'Conservador':
        handleConservador();
        break;
      case 'ConservadorModerado':
        handleConservadorModerado();
        break;
      case 'Arrojado':
        handleArrojado();
        break;
      case 'ArrojadoModerado':
        handleArrojadoModerado();
        break;
      case 'Neutro':
        handleNeutro();
        break;
      default:
        break;
    }
  }

  function handleAnswerClick(type: string, answer: string) {
    setAnswers(
      answers.concat([type === 'Conservador' ? answer : 'P' + answer]),
    );
  }

  function nameProfile(name: string) {
    const profileNames: Record<string, string> = {
      Arrojado: 'Arrojado',
      Neutro: 'Moderado',
      Conservador: 'Conservador',
      ConservadorModerado: 'Conservador/Moderado',
      ArrojadoModerado: 'Arrojado/Moderado',
    };

    return profileNames[name] || null;
  }

  function textProfile(name: string) {
    const profileTexts: Record<string, React.ReactNode> = {
      Arrojado: (
        <>
          <p className="text-title dark:text-text-dark">
            Como o próprio nome já sugere, o perfil arrojado ou agressivo é
            aquele que não tem medo de tomar riscos ao investir. Os investidores
            arrojados são, geralmente, aqueles que já possuem bastante
            experiência no mercado e um patrimônio maior e mais estabelecido.
            <br />
            <br />
            Esse perfil de investidor entende que as perdas a curto prazo são
            momentâneas e necessárias para aproveitar lucros mais altos a longo
            prazo. Mesmo sendo arrojado, é muito recomendado que o investidor
            tenha uma reserva de emergência para situações do cotidiano que
            demandem dinheiro a curto prazo. É necessário possuir preparo
            técnico e emocional para acompanhar as oscilações do mercado, pois
            busca acumular ganhos altos que superam a média.
            <br />
            <br />
            Aplicações mais comuns para esse perfil: Fundos cambiais, Fundos
            multimercado, Fundos de investimento em participações (FIP),
            Certificados de depósitos de valores mobiliários (BDR), Mercado
            futuro (derivativos), Opções, dentre outros. É importante ressaltar
            que o perfil de investimento arrojado moderado não é adequado para
            todas as pessoas, especialmente aquelas que não possuem conhecimento
            e experiência suficientes para lidar com os riscos envolvidos.
            Portanto, antes de investir, é fundamental estudar bem o mercado
            financeiro e buscar a orientação de um especialista para definir a
            estratégia adequada ao seu perfil de investidor.
          </p>
        </>
      ),
      Neutro: (
        <>
          <p className="text-title dark:text-text-dark">
            Trata-se do investidor que opta por arriscar mais que o conservador
            em busca de mais rentabilidade. Porém, ele ainda não está disposto a
            assumir grandes riscos que resultem em uma perda significativa na
            carteira.
            <br />
            <br />
            Observa-se a mistura de seus recursos tanto na renda fixa como na
            variável na busca por retornos acima da média do mercado, mas ainda
            há a preferência da previsibilidade do rendimento.
            <br />
            <br />
            Assim, o perfil moderado procura equilibrar rentabilidade versus
            risco. Sua expectativa de retorno em médio e longo prazo.
            <br />
            <br />
            Aplicações mais comuns para esse perfil:
            <br />
            Debêntures, Debêntures incentivadas, Certificado de recebíveis
            imobiliários (CRI), Certificado de recebíveis do agronegócio (CRA),
            Fundos de investimento em direitos creditórios (FIDC), Certificado
            de operações estruturadas (COE), Tesouro IPCA+, Ações, Fundos de
            ações, Fundos de investimento imobiliário (FII), Fundos de índice
            (ETF), Fundos de Previdência.
          </p>
        </>
      ),
      Conservador: (
        <>
          <p className="text-title dark:text-text-dark">
            Esse perfil não gosta de correr riscos, por isso prefere aplicações
            seguras. Ou seja, não estão muito dispostas a perder e buscam ganhos
            no longo prazo. Assim, esse investidor opta por retornos certos. A
            característica principal desse perfil é dar mais importância para a
            segurança, preservando seu patrimônio. Porém, nada o impede de
            arriscar em alguns produtos de renda variável, por exemplo, os
            fundos imobiliários que permitem investimentos no setor imobiliário
            com pouco dinheiro, promovem diversificação na carteira de
            investimentos, são isentos de imposto de renda e possuem liquidez.
            Aplicações mais comuns para esse perfil:
            <br />
            Fundos de Renda Fixa, como títulos do Tesouro Direito, Tesouro
            Selic, Certificado de depósito bancário (CDB), LCs, Letra de crédito
            imobiliário (LCI); Letra de crédito do agronegócio (LCA), Letra de
            câmbio (LC), Fundos DI, entre outros investimentos com retorno
            previsível.
          </p>
        </>
      ),
      ConservadorModerado: (
        <>
          <p className="text-title dark:text-text-dark">
            O perfil de investimento misto entre conservador e moderado é aquele
            em que o investidor busca retornos seguros no longo prazo, mas está
            disposto a assumir um nível moderado de risco para alcançar ganhos
            maiores.
            <br />
            <br />
            Esse perfil de investidor prefere aplicações seguras, mas também
            está aberto a investimentos em produtos de renda variável, como
            fundos imobiliários, que permitem diversificação na carteira de
            investimentos e possuem liquidez.
            <br />
            <br />É importante ressaltar que, mesmo nesse perfil, é fundamental
            que o investidor tenha uma reserva de emergência para situações do
            cotidiano que demandem dinheiro a curto prazo, além de buscar a
            orientação de um especialista para definir a estratégia adequada ao
            seu perfil de investidor.
          </p>
        </>
      ),
      ArrojadoModerado: (
        <>
          <p className="text-title dark:text-text-dark">
            O perfil de investimento misto entre agressivo e moderado é aquele
            em que o investidor está disposto a assumir um nível moderado de
            risco, buscando retornos acima da média do mercado, mas sem se expor
            a perdas significativas na carteira. Esse perfil de investidor busca
            equilibrar rentabilidade versus risco, investindo em uma mescla de
            produtos de renda fixa e variável, visando uma expectativa de
            retorno em médio e longo prazo.
            <br />
            <br />O investidor deve estar preparado tanto tecnicamente quanto
            emocionalmente para acompanhar as oscilações do mercado, ciente de
            que as perdas a curto prazo são momentâneas e necessárias para
            aproveitar lucros mais altos a longo prazo. É importante ressaltar
            que, mesmo nesse perfil, é fundamental que o investidor tenha uma
            reserva de emergência para situações do cotidiano que demandem
            dinheiro a curto prazo, além de buscar a orientação de um
            especialista para definir a estratégia adequada ao seu perfil de
            investidor.
          </p>
        </>
      ),
    };

    return profileTexts[name] || null;
  }

  useEffect(() => {
    handleGetData();
  }, []);

  return {
    data,
    answers,
    formActive,
    setFormActive,
    setAnswers,
    verifyProfile,
    handleSetData,
    retakeProfile,
    handleAnswerClick,
    nameProfile,
    textProfile,
  };
}
