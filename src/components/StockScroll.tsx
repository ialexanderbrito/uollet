import { ReactNode, useEffect, useRef } from 'react';

import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { cn } from 'utils';

interface StockScrollProps {
  children: ReactNode;
  className?: string;
}

export function StockScroll({ children, className }: StockScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          const newScrollLeft = scrollContainerRef.current.scrollLeft + 308; // Ajuste conforme necessário

          if (
            newScrollLeft >=
            scrollContainerRef.current.scrollWidth -
              scrollContainerRef.current.clientWidth
          ) {
            // Se atingir o final, reinicie a rolagem
            scrollContainerRef.current.scrollLeft = 0;
          } else {
            // Continue rolando normalmente
            scrollContainerRef.current.scrollLeft = newScrollLeft;
          }
        }
      }, 4000);

      return () => clearInterval(scrollInterval);
    };

    const handleScroll = () => {
      // Se o usuário tentar rolar manualmente, pare a rolagem automática
      clearInterval(scrollInterval);
    };

    // Inicia a rolagem automática quando o componente monta
    startScrolling();

    // Adiciona um ouvinte de evento para parar a rolagem automática durante a rolagem manual
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    // Limpa o intervalo quando o componente desmonta
    return () => {
      clearInterval(scrollInterval);

      // Remove o ouvinte de evento ao desmontar o componente
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="relative">
          <button
            type="button"
            className={cn(
              'absolute left-0 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-l from-background-card to-transparent dark:from-background-card-dark dark:to-transparent',
              className,
            )}
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft -= 308;
              }
            }}
          >
            <CaretLeft
              size={24}
              className="text-title dark:text-title-dark"
              weight="light"
            />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex w-full min-w-full gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-start"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {children}
        </div>

        <div className="relative">
          <button
            type="button"
            className={cn(
              'absolute right-0 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-l from-background-card to-transparent dark:from-background-card-dark dark:to-transparent',
              className,
            )}
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft += 318;
              }
            }}
          >
            <CaretRight
              size={24}
              className="text-title dark:text-title-dark"
              weight="light"
            />
          </button>
        </div>
      </div>
    </>
  );
}
