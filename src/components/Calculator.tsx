import { useState } from 'react';

import { all, create } from 'mathjs';

import { MyDialog } from './Modal';

interface CalculatorProps {
  openModalCalculator: boolean;
  setOpenModalCalculator: (value: boolean) => void;
}

export function Calculator({
  openModalCalculator,
  setOpenModalCalculator,
}: CalculatorProps) {
  const math = create(all);

  const [input, setInput] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  function handleCalculate() {
    try {
      const result = math.evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Erro de cálculo, tente novamente');

      setTimeout(() => {
        setInput('');
      }, 1000);
    }
  }

  function handleClear() {
    setInput('');
  }

  function closeModalCalculator() {
    setOpenModalCalculator(false);
    handleClear();
  }

  return (
    <MyDialog
      isOpen={openModalCalculator}
      closeModal={() => closeModalCalculator()}
      title="Calculadora"
      description="Faça cálculos matemáticos simples e rápidos. Para isso, basta preencher os campos abaixo."
      size="sm"
    >
      <div className="mt-8 flex flex-col gap-2">
        <div className="rounded-lg">
          <input
            type="text"
            className="mb-2 w-full rounded bg-background p-2 text-xl text-title dark:bg-backgroundDark dark:text-textDark"
            value={input}
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/'].map((value) => (
              <button
                key={value}
                onClick={() => handleButtonClick(value)}
                className="rounded bg-secondary p-2 text-xl text-white hover:bg-secondaryDark dark:bg-secondaryDark dark:text-white dark:hover:bg-secondary"
              >
                {value}
              </button>
            ))}
            {['4', '5', '6', '*'].map((value) => (
              <button
                key={value}
                onClick={() => handleButtonClick(value)}
                className="rounded bg-secondary p-2 text-xl text-white hover:bg-secondaryDark dark:bg-secondaryDark dark:text-white dark:hover:bg-secondary"
              >
                {value}
              </button>
            ))}
            {['1', '2', '3', '-'].map((value) => (
              <button
                key={value}
                onClick={() => handleButtonClick(value)}
                className="rounded bg-secondary p-2 text-xl text-white hover:bg-secondaryDark dark:bg-secondaryDark dark:text-white dark:hover:bg-secondary"
              >
                {value}
              </button>
            ))}
            {['0', '.', '=', '+'].map((value) => (
              <button
                key={value}
                onClick={
                  value === '='
                    ? handleCalculate
                    : () => handleButtonClick(value)
                }
                className={`p-2 text-xl ${
                  value === '='
                    ? 'bg-success hover:bg-success/90'
                    : 'bg-secondary hover:bg-secondaryDark dark:bg-secondaryDark dark:hover:bg-secondary'
                } rounded text-white`}
              >
                {value}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="col-span-4 rounded bg-danger p-2 text-xl text-white hover:bg-danger/90"
            >
              C
            </button>
          </div>
        </div>
      </div>
    </MyDialog>
  );
}
