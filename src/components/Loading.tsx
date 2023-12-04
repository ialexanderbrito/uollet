import { Jelly } from '@uiball/loaders';

interface LoadingProps {
  color?: string;
}

export function Loading({ color = '#5636d3' }: LoadingProps) {
  return (
    <div className="z-1001 fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Jelly color={color} />
    </div>
  );
}
