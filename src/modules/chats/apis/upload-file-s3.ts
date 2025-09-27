import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { ChatQueryKeys } from './apis';

export const useUploadFileToS3 = () => {
  const uploadFile = useCallback(
    (args: { presignedUrl: string; file: File }) => {
      return fetch(args.presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': args.file.type, // Make sure to set the content type of the file
        },
        body: args.file,
      });
    },
    []
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.PRESIGNED_URL_S3],
    mutationFn: uploadFile,
  });
};
