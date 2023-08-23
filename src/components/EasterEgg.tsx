import { useState } from 'react';

export function EasterEgg() {
  const [isActive, setIsActive] = useState(false);

  function KonamiCode() {
    const codigoSecreto = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let temporizador: NodeJS.Timeout;
    let sequenciaDeCaracteres: string[] = [];

    window.addEventListener('keydown', function (evento) {
      clearTimeout(temporizador);
      const teclaPressionada = evento.key;

      sequenciaDeCaracteres.push(teclaPressionada);

      const fraseComCaracteres = sequenciaDeCaracteres.join('');

      if (codigoSecreto.join('') === fraseComCaracteres) {
        setIsActive(true);

        sequenciaDeCaracteres = [];

        setTimeout(() => {
          setIsActive(false);
        }, 5000);
      }
    });
  }

  return (
    <>
      {KonamiCode()}
      {isActive === true ? (
        <div className="fixed z-100 flex h-screen w-full flex-col items-center justify-center bg-white">
          <h1>...</h1>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
