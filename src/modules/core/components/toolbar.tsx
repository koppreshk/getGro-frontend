/// <reference types="vite-plugin-svgr/client" />

import { FlexBox } from 'lib/ui-ux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import GetGroLogoImg from './../../../assets/svg/favicon.svg?react';
import { AccountMenu, AgentStatus } from './parts';

const TopBarWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.pallete.toolbarBgColor};
  border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const TopBar = styled(FlexBox)`
  padding: 2px 6px 2px 16px;
`;

export const Toolbar = () => {
  const navigate = useNavigate();

  return (
    <TopBarWrapper>
      <TopBar justifyContent="space-between" alignItems="stretch">
        <FlexBox
          alignItems="center"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <GetGroLogoImg />
        </FlexBox>
        <FlexBox justifyContent="flex-end" gap="12px" alignItems="center">
          {/* <AgentStatistics /> */}
          <AgentStatus />
          {/* <Notifications /> */}
          <AccountMenu />
        </FlexBox>
      </TopBar>
    </TopBarWrapper>
  );
};
