import { Jelly } from '@uiball/loaders';

export function Loading() {
  return (
    <div className="fixed flex justify-center flex-col items-center h-full w-full top-0 left-0 right-0 bottom-0 bg-background z-1001 cursor-pointer dark:bg-backgroundDark">
      <Jelly color="#5636d3" />
    </div>
  );
}
