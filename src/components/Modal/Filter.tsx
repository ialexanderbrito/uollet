import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

// import { category } from 'utils/category';

// import { useModal } from './useModal';

interface ModalFilterProps {
  selectedYear: number;
  handleChangeYear: (step: number) => void;
}

export function ModalFilter({
  selectedYear,
  handleChangeYear,
}: ModalFilterProps) {
  // const { selectedCategory, setSelectedCategory } = useModal();

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center gap-2">
        {/* <div className="grid grid-cols-3 gap-2">
          {category.map((item) => (
            <button
              type="button"
              className={`flex h-10 w-32 items-center justify-center rounded-lg bg-secondary text-sm text-white dark:bg-secondaryDark ${
                selectedCategory === item.name ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => {
                setSelectedCategory(item.name);

                if (item.name === selectedCategory) {
                  setSelectedCategory('');
                }
              }}
            >
              {item.name}
            </button>
          ))}
        </div> */}

        <span className="mt-2 text-text dark:text-textDark">
          {selectedYear === new Date().getFullYear()
            ? 'Ano atual'
            : 'Ano selecionado'}
        </span>
        <div className="flex w-52 items-center justify-between font-bold text-text dark:text-textDark">
          <ArrowLeft
            className="cursor-pointer text-secondary dark:text-secondaryDark"
            size={28}
            onClick={() => handleChangeYear?.(-1)}
          />
          {selectedYear}
          <ArrowRight
            className="cursor-pointer text-secondary dark:text-secondaryDark"
            size={28}
            onClick={() => handleChangeYear?.(+1)}
          />
        </div>
      </div>
    </>
  );
}
