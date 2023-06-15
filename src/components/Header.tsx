import { useNavigate } from 'react-router-dom';

import { CaretLeft, Eye, EyeSlash } from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import { UserProps } from 'interfaces/AuthProps';

import { Menu } from './Menu';

interface HeaderProps {
  title?: string;
  showIcon?: boolean;
  primary?: boolean;
  user?: UserProps | null;
  visible?: boolean;
  setVisible?: () => void;
}

export function Header({
  title,
  showIcon = true,
  primary = false,
  user,
  visible,
  setVisible,
}: HeaderProps) {
  const navigate = useNavigate();

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
      {primary ? (
        <div className="flex h-52 w-full flex-row bg-primary dark:bg-primaryDark">
          <div className=" mt-4 flex w-full items-start justify-between ">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-4 ">
                <img
                  src={user?.user_metadata.avatar_url || defaultAvatar}
                  alt={user?.user_metadata.full_name}
                  className="ml-4 h-12 w-12 cursor-pointer rounded-lg object-cover"
                  onClick={() => navigate(`/profile/${user?.id}`)}
                />
                <p className="text-sm font-medium text-white">
                  {greetings()}, <br />
                  <b>{user?.user_metadata.name}</b>
                </p>
              </div>
              <div className="mr-4 flex items-center justify-between gap-4">
                {visible ? (
                  <Eye
                    size={30}
                    weight="light"
                    onClick={setVisible}
                    className="cursor-pointer text-secondary"
                  />
                ) : (
                  <EyeSlash
                    size={30}
                    weight="light"
                    onClick={setVisible}
                    className="cursor-pointer text-secondary"
                  />
                )}
                <Menu />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
          <div className="flex w-1/4 items-center justify-center">
            {showIcon && (
              <CaretLeft
                size={20}
                weight="light"
                className="cursor-pointer text-white"
                onClick={() => navigate(-1)}
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
