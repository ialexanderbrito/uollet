import { Jelly } from '@uiball/loaders';

export function Loading() {
  return (
    <div className="z-1001 fixed top-0 left-0 right-0 bottom-0 flex h-full w-full cursor-pointer flex-col items-center justify-center bg-background dark:bg-backgroundDark">
      <Jelly color="#5636d3" />
    </div>
  );
}
