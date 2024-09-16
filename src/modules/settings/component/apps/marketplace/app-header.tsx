import styled from 'styled-components'
import { BackButton, FlexBox } from 'lib/ui-ux'
import { Button, Typography } from '@mui/material'
import { IAppConfigurationLayout } from './app-configuration-layout';
import { GetApp, Edit } from '@mui/icons-material';

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

interface IAppHeaderProps extends Pick<IAppConfigurationLayout, 'appTitle' | 'appDescription' | 'appIcon' | 'togglePopup' | 'isAppInstalled' | 'unInstallApp' | 'showManageBtn' | 'secondaryBtnActions'> {
    onManageBtnClick: () => void;
    manageBtnClicked: boolean;
    isAppList?: boolean;
}

export const AppHeader = (props: IAppHeaderProps) => {
    const { appDescription, appTitle, isAppInstalled = false, showManageBtn = false, manageBtnClicked, secondaryBtnActions, isAppList = false,
        appIcon, togglePopup, unInstallApp, onManageBtnClick } = props;

    return (
        <StyledFlexbox justifyContent='space-between' alignItems='center' padding='4px 24px' height='90px'>
            <FlexBox alignItems='center' gap="12px">
                {appIcon()}
                <FlexBox flexDirection='column'>
                    <Typography variant='h5'>{appTitle}</Typography>
                    <Typography variant='caption'>{appDescription}</Typography>
                </FlexBox>
            </FlexBox>
            {isAppList ? (
                isAppInstalled ?
                    <FlexBox gap="12px">
                        {manageBtnClicked
                            ? (
                                <>
                                    <BackButton variant="outlined" size="medium" onClick={onManageBtnClick}>Back</BackButton>
                                    <Button variant="contained" size="medium" onClick={togglePopup} endIcon={<GetApp />}>Add New Store</Button>
                                </>
                            )
                            : 
                            <Button variant="outlined" size="medium" onClick={onManageBtnClick}>Manage</Button>}
                    </FlexBox>
                    :
                    <Button variant="contained" size="medium" onClick={togglePopup} endIcon={<GetApp />}>Install</Button>
            ) : (
                isAppInstalled ?
                    <FlexBox gap="12px">
                        {manageBtnClicked
                            ? (
                                <>
                                    <BackButton variant="outlined" size="medium" onClick={onManageBtnClick}>Back</BackButton>
                                    <Button variant="contained" size="medium" onClick={secondaryBtnActions?.onSecondaryBtnClk}>{secondaryBtnActions?.secondaryBtnLabel}</Button>
                                </>
                            )
                            : (showManageBtn ? <Button variant="outlined" size="medium" onClick={onManageBtnClick}>Manage</Button> : null)}
                        {manageBtnClicked ? null
                            :
                            <>
                                {unInstallApp ? unInstallApp() : <></>}
                                <Button variant="contained" size="medium" onClick={togglePopup} startIcon={<Edit />}>Edit</Button>
                            </>
                        }
                    </FlexBox>
                    :
                    <Button variant="contained" size="medium" onClick={togglePopup} endIcon={<GetApp />}>Install</Button>
            )}
        </StyledFlexbox>
    )
}