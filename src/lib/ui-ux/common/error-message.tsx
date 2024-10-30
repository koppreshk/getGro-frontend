/// <reference types="vite-plugin-svgr/client" />

import { Suspense, lazy, useMemo } from 'react';
import { Typography } from '@mui/material';
import { FlexBox } from '..';

const ErrorIllustration = lazy(() => import('../../../../src/assets/svg/api-error.svg?react'));
export const ErrorMessage = (props: { statusCode?: string }) => {
    const { statusCode } = props;

    const parsedStatusCode = Number(statusCode?.split(':')[1]);

    const parsedMessage = useMemo(() => {
        switch (parsedStatusCode) {
            case 401:
                return 'The content is only visible to authorized user'
            case 404:
                return 'The content you are trying to find does not exist'
            default: return 'Unable to fetch this content'
        }
    }, [parsedStatusCode])

    return (
        <Suspense fallback={<span>Loading illustration...</span>}>
            <FlexBox width='100%' height='100%' flexDirection='column' alignItems='center' justifyContent='center'>
                <ErrorIllustration width="60%" height="60%" />
                {parsedStatusCode ?
                    <FlexBox gap={'4px'}>
                        <Typography sx={{ color: 'red' }}>{parsedStatusCode}: </Typography>
                        <Typography sx={{ color: 'red' }}>{parsedMessage}</Typography>
                    </FlexBox>
                    : <Typography sx={{ color: 'red' }}>{parsedMessage}</Typography>}
            </FlexBox>
        </Suspense>
    )
}