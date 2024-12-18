/// <reference types="vite-plugin-svgr/client" />

import { Typography } from '@mui/material';
import { Suspense, lazy, useMemo } from 'react';

import { FlexBox } from '..';

const ErrorIllustration = lazy(
  () => import('../../../../src/assets/svg/api-error.svg?react')
);
export const ErrorMessage = (props: { statusCode?: string }) => {
  const { statusCode } = props;

  const parsedStatusCode = Number(statusCode?.split(':')[1]);

  const parsedMessage = useMemo(() => {
    switch (parsedStatusCode) {
      case 400:
        return 'Bad request. Please check the input and try again.';
      case 401:
        return 'The content is only visible to authorized users.';
      case 403:
        return 'You do not have permission to access this content.';
      case 404:
        return 'The content you are trying to find does not exist.';
      case 408:
        return 'The request timed out. Please try again later.';
      case 429:
        return 'Too many requests. Please slow down and try again later.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 502:
        return 'Bad gateway. The server received an invalid response.';
      case 503:
        return 'Service unavailable. The server is temporarily unable to handle requests.';
      case 504:
        return 'Gateway timeout. The server took too long to respond.';
      default:
        return 'Unable to fetch this content. Please try again later.';
    }
  }, [parsedStatusCode]);

  return (
    <Suspense fallback={<span>Loading illustration...</span>}>
      <FlexBox
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ErrorIllustration width="60%" height="60%" />
        {parsedStatusCode ? (
          <FlexBox gap={'4px'}>
            <Typography sx={{ color: 'red' }}>{parsedStatusCode}: </Typography>
            <Typography sx={{ color: 'red' }}>{parsedMessage}</Typography>
          </FlexBox>
        ) : (
          <Typography sx={{ color: 'red' }}>{parsedMessage}</Typography>
        )}
      </FlexBox>
    </Suspense>
  );
};
