import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tooltip } from 'react-tooltip';

import { Camera } from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';

import { useAuth } from 'contexts/Auth';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

export function Dropzone({ onFileUploaded }: DropzoneProps) {
  const { user } = useAuth();
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const maxFileSize = 1 * 1024 * 1024; // 1MB

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    maxSize: maxFileSize,
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxFileSize;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        {...getRootProps({
          onClick: (event) => {
            user?.app_metadata.provider === 'google' && event.stopPropagation();
          },
        })}
        className={`flex cursor-pointer flex-col items-center justify-center ${
          user?.app_metadata.provider === 'google' &&
          'change-photo cursor-not-allowed'
        }`}
      >
        <Tooltip
          content="Não é possível alterar a foto de perfil de uma conta Google"
          anchorSelect=".change-photo"
          className="rounded-md bg-background-card p-2 text-title dark:bg-background-card-dark dark:text-title-dark"
          noArrow
        />
        <input {...getInputProps()} />

        {selectedFileUrl ? (
          <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary">
            <p>
              <img
                src={selectedFileUrl}
                alt={user?.user_metadata.name}
                className="h-36 w-36 rounded-lg object-cover"
              />
            </p>
            <div className="absolute z-10 ml-40 mt-36 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-primary">
              <Camera />
            </div>
          </div>
        ) : (
          <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary">
            <p>
              {user?.user_metadata.picture || user?.user_metadata.avatar_url ? (
                <img
                  src={
                    user?.user_metadata.picture ||
                    user?.user_metadata.avatar_url
                  }
                  alt={user?.user_metadata.name}
                  className="h-36 w-36 rounded-lg object-cover"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt={user?.user_metadata.name}
                  className="h-36 w-36 rounded-lg object-cover"
                />
              )}
            </p>
            <div className="absolute z-10 ml-36 mt-36 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-primary text-white">
              <Camera />
            </div>
          </div>
        )}

        {isFileTooLarge && (
          <p className="mt-4 text-center text-xs text-danger">
            A imagem deve ter no máximo 1MB de tamanho. Tente novamente!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
