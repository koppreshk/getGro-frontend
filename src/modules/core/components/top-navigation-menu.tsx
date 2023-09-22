import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { AccountMenu } from "./parts/account-menu";

const TopBarWrapper = styled.div`
    width: 100%;
    background-color: #ffff;
    height: 65px;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-bottom-width: thin;
`;

const TopBar = styled(FlexBox)`
    padding: 8px 16px;
`;

const LogoContainer = styled.div`
`;

const TopBarMenuContainer = styled(FlexBox)`
    
`

export const TopNavigationMenu = () => {
    return (
        <TopBarWrapper>
            <TopBar $justifyContent="space-between" $alignItems="stretch">
                <LogoContainer>
                    <span>company logo</span>
                </LogoContainer>
                <TopBarMenuContainer $justifyContent="flex-end">
                    <AccountMenu/>
                </TopBarMenuContainer>
            </TopBar>
        </TopBarWrapper>
    );
}