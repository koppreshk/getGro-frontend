import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import GetGroLogoImg from './../../../assets/png/getgro.svg';
import { AccountMenu, AgentStatus, Notifications } from "./parts";

const TopBarWrapper = styled.div`
    width: 100%;
    background-color: #ffff;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const TopBar = styled(FlexBox)`
    padding: 8px 16px;
`;

const GetGroLogo = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 15%;
`;

export const Toolbar = () => {
    return (
        <TopBarWrapper>
            <TopBar $justifyContent="space-between" $alignItems="stretch">
                <FlexBox $alignItems="center">
                    <GetGroLogo src={GetGroLogoImg} />
                </FlexBox>
                <FlexBox $justifyContent="flex-end" $gap="10px" $alignItems="center">
                    <AgentStatus />
                    <Notifications />
                    <AccountMenu />
                </FlexBox>
            </TopBar>
        </TopBarWrapper>
    );
}