/// <reference types="vite-plugin-svgr/client" />

import { FlexBox } from 'lib/ui-ux'
import PageNotFoundIllustration from '../../../../src/assets/svg/not-found-illustation.svg?react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <FlexBox justifyContent='center' alignItems='center' height='100%' flexDirection="column" gap="20px">
            <PageNotFoundIllustration />
            <Typography variant='h6'>Page not found, click <Link to="/dashboard">here</Link> to route back to dashboard</Typography>
        </FlexBox>
    )
}