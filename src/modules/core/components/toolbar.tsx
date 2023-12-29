/// <reference types="vite-plugin-svgr/client" />

import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import GetGroLogoImg from './../../../assets/svg/inverted-getgro.svg?react';
import { AccountMenu, AgentStatus, Notifications, AgentStatistics } from "./parts";

const TopBarWrapper = styled.div`
    width: 100%;
    background-color: #ffff;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const TopBar = styled(FlexBox)`
    padding: 8px 6px 8px 16px;
`;

export const Toolbar = () => {
    return (
        <TopBarWrapper>
            <TopBar $justifyContent="space-between" $alignItems="stretch">
                <FlexBox $alignItems="center">
                    <GetGroLogoImg />
                </FlexBox>
                <FlexBox $justifyContent="flex-end" $gap="10px" $alignItems="center">
                    <AgentStatistics />
                    <AgentStatus />
                    <Notifications />
                    <AccountMenu />
                </FlexBox>
            </TopBar>
        </TopBarWrapper>
    );
}