import styled from 'styled-components'
import { FlexBox } from 'lib/ui-ux'
import { Button, Typography } from '@mui/material'

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

interface IAppHeaderProps {
    appTitle: string;
    appDescription: string;
    appIcon: () => JSX.Element;
    togglePopup: () => void;
    isAppInstalled?: boolean;
    unInstallApp: () => JSX.Element;
}

export const AppHeader = (props: IAppHeaderProps) => {
    const { appDescription, appTitle, appIcon, togglePopup, isAppInstalled = false, unInstallApp } = props;

    return (
        <StyledFlexbox justifyContent='space-between' alignItems='center' padding='4px 24px' height='90px'>
            <FlexBox alignItems='center' gap="12px">
                {appIcon()}
                <FlexBox flexDirection='column'>
                    <Typography variant='h5'>{appTitle}</Typography>
                    <Typography variant='caption'>{appDescription}</Typography>
                </FlexBox>
            </FlexBox>
            {isAppInstalled ?
                <FlexBox gap="10px">
                    {unInstallApp()}
                    <Button variant="contained" size="medium" onClick={togglePopup}>Edit</Button>
                </FlexBox> :
                <Button variant="contained" size="medium" onClick={togglePopup}>Install</Button>
            }
        </StyledFlexbox>
    )
}