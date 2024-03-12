import { useState } from 'react';

import { X } from '@phosphor-icons/react';

import { cn } from 'utils';

interface AnnouncementProps {
  title: string;
  description: string;
  variant: 'error' | 'success' | 'warning' | 'info' | 'default';
  announcementName: string;
  disabledOnClick?: boolean;
  onClick?: () => void;
}

export function Announcement({
  title,
  description,
  variant,
  disabledOnClick,
  announcementName,
  onClick,
}: AnnouncementProps) {
  const [visible, setVisible] = useState(true);

  function disableAlert() {
    setVisible(false);
    localStorage.setItem(
      `@uollet:announcement${announcementName}`,
      JSON.stringify(false),
    );
  }

  if (localStorage.getItem(`@uollet:announcement${announcementName}`)) {
    const announcement = JSON.parse(
      localStorage.getItem('@uollet:announcement')!,
    );

    if (!announcement) {
      return null;
    }
  }

  return (
    <>
      {visible && (
        <div
          className={cn(
            'flex items-center justify-between gap-4 px-4 py-2 text-white',
            variant === 'error' && 'bg-red-400 text-red-700',
            variant === 'success' && 'bg-green-400 text-green-700',
            variant === 'warning' && 'bg-yellow-400 text-yellow-700',
            variant === 'info' && 'bg-blue-400 text-blue-700',
            variant === 'default' && 'bg-gray-400 text-gray-700',
          )}
        >
          <p className="text-xs font-bold sm:text-sm">
            {title} <p className="inline-block">{description}</p>
          </p>

          {disabledOnClick ? null : (
            <button
              className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
              onClick={() => {
                if (onClick) {
                  onClick();
                } else {
                  disableAlert();
                }
              }}
            >
              <X
                className={cn(
                  'h-6 w-6 cursor-pointer fill-current',
                  variant === 'error' && 'text-red-700',
                  variant === 'success' && 'text-green-700',
                  variant === 'warning' && 'text-yellow-700',
                  variant === 'info' && 'text-blue-700',
                  variant === 'default' && 'text-gray-700',
                )}
              />
            </button>
          )}
        </div>
      )}
    </>
  );
}
