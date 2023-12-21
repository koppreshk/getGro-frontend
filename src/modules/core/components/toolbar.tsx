import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { AccountMenu } from "./parts/account-menu";
import GetGroLogoImg from './../../../assets/png/getgro.svg';
import { AgentStatus } from "./parts/agent-status";

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
                <FlexBox $justifyContent="flex-end" $gap="10px">
                    <AgentStatus />
                    <AccountMenu />
                </FlexBox>
            </TopBar>
        </TopBarWrapper>
    );
}