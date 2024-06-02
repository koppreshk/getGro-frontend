/// <reference types="vite-plugin-svgr/client" />

import { FlexBox } from 'lib/ui-ux'
import ExotelIcon from '../../../../../../assets/svg/exotel-icon.svg?react'
import { Button, Typography } from '@mui/material'
import styled from 'styled-components'

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

export const ExotelHeader = () => {
    return (
        <StyledFlexbox justifyContent='space-between' alignItems='center' padding='4px 24px'>
            <FlexBox alignItems='center' gap="12px">
                <ExotelIcon width="80px" height="80px" />
                <FlexBox flexDirection='column'>
                    <Typography variant='h5'>Exotel</Typography>
                    <Typography variant='caption'>Track and manage phone calls as tickets.</Typography>
                </FlexBox>
            </FlexBox>

            <Button variant="contained" size="medium">Install</Button>

        </StyledFlexbox>
    )
}