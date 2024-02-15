/// <reference types="vite-plugin-svgr/client" />

import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FlexBox } from 'lib/ui-ux'
import { Typography } from '@mui/material'

const PageNotFoundIllustration = lazy(() => import('../../../../src/assets/svg/not-found-illustation.svg?react'));

export default function PageNotFound() {
    return (
        <Suspense fallback={<span>Loading illustration...</span>}>
            <FlexBox justifyContent='center' alignItems='center' height='100%' flexDirection="column" gap="20px">
                <PageNotFoundIllustration />
                <Typography variant='h6'>Page not found, click <Link to="/dashboard">here</Link> to route back to dashboard</Typography>
            </FlexBox>
        </Suspense>
    )
}