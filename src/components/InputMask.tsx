import { useInputMaskValue } from 'hooks/useInputMaskValue';

interface InputMaskProps {
  id?: string;
  name?: string;
  setValor: (valorADefinir?: any) => any;
  className?: string;
}

export function InputMask({ id, name, setValor, className }: InputMaskProps) {
  const { handleSetValor, outputMaskValor } = useInputMaskValue(setValor);

  return (
    <input
      type="text"
      id={id}
      name={name}
      onChange={handleSetValor}
      className={className}
      placeholder="Nome"
      value={outputMaskValor}
      maxLength={18}
    />
  );
}
