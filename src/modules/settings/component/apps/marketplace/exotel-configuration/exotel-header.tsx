/// <reference types="vite-plugin-svgr/client" />

import { useCallback, useState } from 'react';
import styled from 'styled-components'
import { FlexBox } from 'lib/ui-ux'
import { Button, Typography } from '@mui/material'
import { AddExotelDialog } from './add-exotel-dialog';
import ExotelIcon from '../../../../../../assets/svg/exotel-icon.svg?react'

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

export const ExotelHeader = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = useCallback(() => {
        setOpenPopup((prevValue) => !prevValue)
    }, []);
    
    return (
        <StyledFlexbox justifyContent='space-between' alignItems='center' padding='4px 24px'>
            <FlexBox alignItems='center' gap="12px">
                <ExotelIcon width="80px" height="80px" />
                <FlexBox flexDirection='column'>
                    <Typography variant='h5'>Exotel</Typography>
                    <Typography variant='caption'>Track and manage phone calls as tickets.</Typography>
                </FlexBox>
            </FlexBox>

            <Button variant="contained" size="medium" onClick={togglePopup}>Install</Button>
            <AddExotelDialog togglePopup={togglePopup} openPopup={openPopup}/>
        </StyledFlexbox>
    )
}