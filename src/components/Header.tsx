import { useNavigate } from 'react-router-dom';

import {
  CaretLeft,
  Command,
  Eye,
  EyeClosed,
  SealCheck,
} from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import { UserProps } from 'interfaces/AuthProps';
import { useKBar } from 'kbar';

import { cn } from 'utils/cn';
import { verifyLoginLastSevenDays } from 'utils/verifyLoginLastSevenDays';

import { useDetectDevice } from 'hooks/useDetectDevice';

import { Menu } from './Menu';

interface HeaderProps {
  title?: string;
  showIcon?: boolean;
  variant?: 'primary' | 'secondary';
  user?: UserProps | null;
  visible?: boolean;
  setVisible?: () => void;
  className?: string;
  isInvestiment?: boolean;
  navigateLink?: string;
}

export function Header({
  title,
  showIcon = true,
  variant = 'primary',
  user,
  visible,
  setVisible,
  className,
  isInvestiment,
  navigateLink,
}: HeaderProps) {
  const navigate = useNavigate();
  const { query } = useKBar();
  const { isDesktop } = useDetectDevice();

  function greetings() {
    const hours = new Date().getHours();

    if (hours >= 0 && hours < 12) {
      return 'Bom dia';
    } else if (hours >= 12 && hours < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  return (
    <>
      {user ? (
        <div
          className={cn(
            'flex w-full flex-row bg-primary dark:bg-primary-dark',
            variant === 'primary' && 'h-52',
            variant === 'secondary' && 'h-24',
            isInvestiment &&
              'bg-investments-primary dark:bg-investments-primary',
            className,
          )}
        >
          <div className=" mt-4 flex w-full items-start justify-between ">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-4 ">
                <img
                  src={user?.user_metadata.avatar_url || defaultAvatar}
                  alt={user?.user_metadata.full_name}
                  className="ml-4 h-12 w-12 cursor-pointer rounded-lg object-cover"
                  onClick={() => navigate(`/profile`)}
                />
                <p className="text-sm font-medium text-white">
                  {greetings()}, <br />
                  <b className="flex items-center">
                    {user?.user_metadata.name}

                    {verifyLoginLastSevenDays(
                      user?.updated_at,
                      user.user_metadata.phone,
                    ) && (
                      <span className="ml-1 text-xs font-normal text-white">
                        <SealCheck size={16} weight="fill" />
                      </span>
                    )}
                  </b>
                </p>
              </div>
              <div className="mr-4 flex items-center justify-between gap-4">
                {visible ? (
                  <EyeClosed
                    size={30}
                    weight="light"
                    onClick={setVisible}
                    className="cursor-pointer text-white"
                  />
                ) : (
                  <Eye
                    size={30}
                    weight="light"
                    onClick={setVisible}
                    className="cursor-pointer text-white"
                  />
                )}

                {isDesktop && (
                  <Command
                    size={30}
                    weight="light"
                    className="cursor-pointer text-white"
                    onClick={query?.toggle}
                  />
                )}

                <Menu />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex h-24 w-full flex-row bg-primary dark:bg-primary-dark',
            isInvestiment &&
              'bg-investments-primary dark:bg-investments-primary',
          )}
        >
          <div className="flex w-1/4 items-center justify-center">
            {showIcon && (
              <CaretLeft
                size={20}
                weight="light"
                className="cursor-pointer text-white"
                onClick={() =>
                  navigateLink ? navigate(navigateLink) : navigate(-1)
                }
              />
            )}
          </div>
          <div className="flex w-2/4 items-center justify-center">
            <p className="text-lg font-normal text-white">{title}</p>
          </div>
        </div>
      )}
    </>
  );
}
