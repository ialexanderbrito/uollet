import { Button } from 'components/Button';
import { MyDialog } from 'components/Modal';

import { useInvestorProfile } from 'hooks/useInvestorProfile';

interface InvestorProfileProps {
  openModalInvestorProfile: boolean;
  setOpenModalInvestorProfile: (value: boolean) => void;
}

export function InvestorProfile({
  openModalInvestorProfile,
  setOpenModalInvestorProfile,
}: InvestorProfileProps) {
  const {
    data,
    answers,
    formActive,
    setFormActive,
    setAnswers,
    verifyProfile,
    retakeProfile,
    nameProfile,
    textProfile,
  } = useInvestorProfile();

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
        <p className="text-xl font-medium text-title dark:text-title-dark">{`${number}. Pergunta`}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-text dark:text-text-dark">{question}</p>
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
        <Button variant="outline" onClick={() => setFormActive(false)}>
          <p>Voltar</p>
        </Button>
      )}
    </div>
  );

  const ConfirmPage = () => (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex justify-center gap-4 text-2xl font-medium text-title dark:text-title-dark">
        Concluir Teste
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-text dark:text-text-dark">
          Parabéns, você acaba de concluir o teste de perfil de investimento.
          Para descobrir qual o seu Perfil basta confirmar as respostas.
        </p>
        <div className="flex justify-around gap-4">
          <Button onClick={() => verifyProfile()}>Confirmar</Button>
        </div>
      </div>
    </div>
  );

  return (
    <MyDialog
      closeModal={() => setOpenModalInvestorProfile(false)}
      isOpen={openModalInvestorProfile}
      title="Perfil de Investidor"
      description="Descubra o seu perfil de investidor, responda as perguntas e veja qual o seu perfil de investimento."
      size="3xl"
    >
      <div>
        {!data ? (
          <div>
            {formActive ? (
              <div>
                {answers.length === 0 ? (
                  <Question
                    number={1}
                    question="Tenho situação financeira estável?"
                    type="Conservador"
                  />
                ) : null}
                {answers.length === 1 ? (
                  <Question
                    number={2}
                    question="Aceito assumir riscos no curto prazo?"
                    type="Arrojado"
                  />
                ) : null}
                {answers.length === 2 ? (
                  <Question
                    number={3}
                    question="Ganhar o máximo que puder é importante para mim?"
                    type="Arrojado"
                  />
                ) : null}
                {answers.length === 3 ? (
                  <Question
                    number={4}
                    question="Prefiro ver meus investimentos crescendo constantemente?"
                    type="Conservador"
                  />
                ) : null}
                {answers.length === 4 ? (
                  <Question
                    number={5}
                    question="Evitar perdas neste ano é mais importante do que crescimento a longo prazo?"
                    type="Conservador"
                  />
                ) : null}
                {answers.length === 5 ? (
                  <Question
                    number={6}
                    question="Tenho razoável experiência e conhecimento de fundos de investimento?"
                    type="Arrojado"
                  />
                ) : null}
                {answers.length === 6 ? <ConfirmPage /> : null}
              </div>
            ) : (
              <div>
                <div className="mt-4 flex flex-col gap-4">
                  <p className="text-left text-title dark:text-title-dark">
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
              <p className="font-medium text-title dark:text-title-dark">
                Você é um investidor do tipo:{' '}
                <b className="text-lg">{nameProfile(data)}</b>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center gap-4">
                {textProfile(data)}
                <Button
                  onClick={() => {
                    retakeProfile();
                  }}
                >
                  Refazer Teste
                </Button>
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
