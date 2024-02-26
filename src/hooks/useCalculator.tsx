import { useState } from 'react';

import { useFormik } from 'formik';
import { all, create } from 'mathjs';

import { useToast } from 'contexts/Toast';

export function useCalculator() {
  const { toast } = useToast();
  const math = create(all);

  const [montante, setMontante] = useState(0);
  const [totalJuros, setTotalJuros] = useState(0);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [loading, setLoading] = useState(false);
  const [porcentagem, setPorcentagem] = useState(0);
  const [monthlySuccess, setMonthlySuccess] = useState(0);
  const [input, setInput] = useState<string>('');

  const formikEmergencyReserve = useFormik({
    initialValues: {
      profession: '',
      fixedCost: '',
      monthlySalary: '',
      percentageToSave: '',
    },
    onSubmit: (values) => {
      if (
        !values.profession ||
        !values.fixedCost ||
        !values.monthlySalary ||
        !values.percentageToSave
      ) {
        toast.error('Preencha todos os campos para calcular', {
          id: 'compound-interest',
        });
        return;
      }
      calcEmergencyReserve();
    },
  });

  const formik = useFormik({
    initialValues: {
      initialValue: '',
      monthlyContributions: '',
      interestRate: '',
      period: '',
      typeOfInvestment: 'mensal',
    },
    onSubmit: (values) => {
      if (!values.initialValue || !values.interestRate || !values.period) {
        toast.error('Preencha todos os campos para calcular', {
          id: 'compound-interest',
        });
        return;
      }
      compoundInterestCalc();
    },
  });

  function calcEmergencyReserve() {
    setLoading(true);
    const { profession, monthlySalary, percentageToSave } =
      formikEmergencyReserve.values;

    setTimeout(() => {
      const monthlySalaryNumber = Number(monthlySalary);
      const percentageToSaveNumber = Number(percentageToSave);

      let finalValue = 0;

      if (profession === 'funcionarioPublico') {
        finalValue = monthlySalaryNumber * 3;
      }

      if (profession === 'CLT') {
        finalValue = monthlySalaryNumber * 6;
      }

      if (profession === 'MEI') {
        finalValue = monthlySalaryNumber * 12;
      }

      const totalWithPercentage =
        monthlySalaryNumber * (percentageToSaveNumber / 100);

      setMontante(finalValue);
      setPorcentagem(percentageToSaveNumber);
      setMonthlySuccess(Math.ceil(finalValue / totalWithPercentage));
      setLoading(false);
    }, 2000);
  }

  function compoundInterestCalc() {
    setLoading(true);
    const {
      initialValue,
      monthlyContributions,
      interestRate,
      period,
      typeOfInvestment,
    } = formik.values;

    setTimeout(() => {
      const valorInicialNumber = Number(initialValue);
      const aportesMensaisNumber = Number(monthlyContributions);
      const periodoNumber = Number(period);
      const taxaDeJurosNumber = Number(interestRate);

      const feePerMonth =
        typeOfInvestment === 'anual'
          ? taxaDeJurosNumber / 12 / 100
          : taxaDeJurosNumber / 100;
      const periodInMonths =
        typeOfInvestment === 'anual' ? periodoNumber * 12 : periodoNumber;

      let finalValue = valorInicialNumber;
      let totalWithOutInterest = valorInicialNumber;

      for (let i = 0; i < periodInMonths; i++) {
        finalValue = finalValue * (1 + feePerMonth) + aportesMensaisNumber;
        totalWithOutInterest += aportesMensaisNumber;
      }

      const totalInInterest = finalValue - totalWithOutInterest;

      setMontante(finalValue);
      setTotalJuros(totalInInterest);
      setTotalInvestido(totalWithOutInterest);

      setLoading(false);
    }, 2000);
  }

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

  return {
    formik,
    montante,
    totalJuros,
    totalInvestido,
    loading,
    porcentagem,
    monthlySuccess,
    formikEmergencyReserve,
    handleButtonClick,
    handleCalculate,
    handleClear,
    input,
  };
}
