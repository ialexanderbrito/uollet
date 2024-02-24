import React, { useState, useEffect } from 'react';

import imageArrojadoModerado from 'assets/investor/arrojado_moderado.png';
import imageArrojado from 'assets/investor/arrojado.png';
import imageConservadorModerado from 'assets/investor/conservador_moderado.png';
import imageConservador from 'assets/investor/conservador.png';
import imageModerado from 'assets/investor/moderado.png';

import { Button } from 'components/Button';
import { MyDialog } from 'components/Modal';

import { useToast } from 'contexts/Toast';

const profileImages = {
  Arrojado: imageArrojado,
  Neutro: imageModerado,
  Conservador: imageConservador,
  ConservadorModerado: imageConservadorModerado,
  ArrojadoModerado: imageArrojadoModerado,
};

interface InvestorProfileProps {
  openModalInvestorProfile: boolean;
  setOpenModalInvestorProfile: (value: boolean) => void;
}

type ProfileKey =
  | 'Arrojado'
  | 'Neutro'
  | 'Conservador'
  | 'ConservadorModerado'
  | 'ArrojadoModerado';

export function InvestorProfile({
  openModalInvestorProfile,
  setOpenModalInvestorProfile,
}: InvestorProfileProps) {
  const { toast } = useToast();

  const [data, setData] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleSetData = (value: string) => {
    try {
      localStorage.setItem('@uollet:investorProfile', value);
      setData(value);
    } catch (error) {
      toast.error('Erro ao salvar perfil de investidor', { id: 'error' });
    }
  };

  const handleGetData = () => {
    try {
      const value = localStorage.getItem('@uollet:investorProfile');
      setData(value !== null ? value : '');
    } catch (error) {
      console.log('Error getting data:', error);
    }
  };

  const verifyProfile = () => {
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
  };

  const Question = ({
    number,
    question,
    type,
  }: {
    number: number;
    question: string;
    type: string;
  }) => (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex gap-4">
        <p className="font-medium text-title">{`${number}. Pergunta`}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-title">{question}</p>
        <AnswerOptions type={type}></AnswerOptions>
        <BackButton />
      </div>
    </div>
  );

  const AnswerOptions = ({ type }: { type: string }) => (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Button
        onClick={() => handleAnswerClick(type, 'C')}
        className="bg-investments-primary"
      >
        Concordo Totalmente
      </Button>
      <Button
        onClick={() => handleAnswerClick(type, 'PC')}
        className="bg-investments-primary"
      >
        Concordo
      </Button>
      <Button
        onClick={() => handleAnswerClick(type, 'N')}
        className="bg-investments-primary"
      >
        Neutro
      </Button>
      <Button
        onClick={() => handleAnswerClick(type, 'PA')}
        className="bg-investments-primary"
      >
        Discordo
      </Button>
      <Button
        onClick={() => handleAnswerClick(type, 'A')}
        className="bg-investments-primary"
      >
        Discordo Totalmente
      </Button>
    </div>
  );

  const handleAnswerClick = (type: string, answer: string) => {
    setAnswers(
      answers.concat([type === 'Conservador' ? answer : 'P' + answer]),
    );
  };

  const BackButton = () => (
    <div>
      {answers.length !== 0 ? (
        <Button
          variant="outline"
          onClick={() => setAnswers(answers.slice(0, -1))}
        >
          Voltar Pergunta
        </Button>
      ) : (
        <Button variant="outline" inline onClick={() => setFormActive(false)}>
          <p>Voltar</p>
        </Button>
      )}
    </div>
  );

  const ConfirmPage = () => (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex justify-center gap-4 font-medium text-title">
        Concluir Teste
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-title">
          Parabéns, você acaba de concluir o teste de perfil de investimento.
          Para descobrir qual o seu Perfil basta confirmar as respostas.
        </p>
        <div className="flex justify-around gap-4">
          <Button onClick={() => verifyProfile()}>Confirmar</Button>
        </div>
      </div>
    </div>
  );

  const nameProfile = (name: string) => {
    const profileNames: Record<string, string> = {
      Arrojado: 'Arrojado',
      Neutro: 'Moderado',
      Conservador: 'Conservador',
      ConservadorModerado: 'Conservador/Moderado',
      ArrojadoModerado: 'Arrojado/Moderado',
    };

    return profileNames[name] || null;
  };

  const textProfile = (name: string) => {
    const profileTexts: Record<string, React.ReactNode> = {
      Arrojado: (
        <>
          <p className="text-title">
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
          <p className="text-title">
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
          <p className="text-title">
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
          <p className="text-title">
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
          <p className="text-title">
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
  };

  const imagePathProfile = (name: ProfileKey) => profileImages[name];

  return (
    <MyDialog
      closeModal={() => setOpenModalInvestorProfile(false)}
      isOpen={openModalInvestorProfile}
      title="Calculadora de Juros Compostos"
      description="Calcule o valor final de um investimento com juros compostos."
      size="3xl"
    >
      <div>
        {data === '' ? (
          <div>
            {formActive ? (
              <div>
                {answers.length === 0 ? (
                  <Question
                    number={1}
                    question="Tenho situação financeira estável?"
                    type="Conservador"
                  ></Question>
                ) : null}
                {answers.length === 1 ? (
                  <Question
                    number={2}
                    question="Aceito assumir riscos no curto prazo?"
                    type="Arrojado"
                  ></Question>
                ) : null}
                {answers.length === 2 ? (
                  <Question
                    number={3}
                    question="Ganhar o máximo que puder é importante para mim?"
                    type="Arrojado"
                  ></Question>
                ) : null}
                {answers.length === 3 ? (
                  <Question
                    number={4}
                    question="Prefiro ver meus investimentos crescendo constantemente?"
                    type="Conservador"
                  ></Question>
                ) : null}
                {answers.length === 4 ? (
                  <Question
                    number={5}
                    question="Evitar perdas neste ano é mais importante do que crescimento a longo prazo?"
                    type="Conservador"
                  ></Question>
                ) : null}
                {answers.length === 5 ? (
                  <Question
                    number={6}
                    question="Tenho razoável experiência e conhecimento de fundos de investimento?"
                    type="Arrojado"
                  ></Question>
                ) : null}
                {answers.length === 6 ? <ConfirmPage></ConfirmPage> : null}
              </div>
            ) : (
              <div>
                <div className="mt-4 flex flex-col items-center gap-4">
                  <p className="text-center text-title">
                    Você ainda não possui um perfil de investimento, que tal
                    descobrir agora mesmo?!
                  </p>
                  <Button onClick={() => setFormActive(true)}>
                    <p>Descobrir Perfil</p>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="mt-4 flex justify-center gap-4">
              <p className="font-medium text-title">
                Você é um investidor do tipo:{' '}
                <b className="text-lg">Perfil {nameProfile(data)}</b>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center gap-4">
                <img
                  className="h-32 w-32 rounded-md object-cover"
                  src={imagePathProfile(data as ProfileKey)}
                  alt={nameProfile(data) || ''}
                />
                <Button
                  onClick={() => {
                    handleSetData('');
                    setAnswers([]);
                    setFormActive(false);
                  }}
                >
                  Refazer Teste
                </Button>
                <p>{textProfile(data)}</p>
              </div>
            </div>

            <div className="-mb-4 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenModalInvestorProfile(false);
                }}
              >
                <p>Fechar</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MyDialog>
  );
}
