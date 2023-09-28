import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { AccountMenu } from "./parts/account-menu";

const TopBarWrapper = styled.div`
    width: 100%;
    background-color: #ffff;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-bottom-width: thin;
`;

const TopBar = styled(FlexBox)`
    padding: 8px 16px;
`;


export const TopNavigationMenu = () => {
    return (
        <TopBarWrapper>
            <TopBar $justifyContent="space-between" $alignItems="stretch">
                <FlexBox>
                    <span>company logo</span>
                </FlexBox>
                <FlexBox $justifyContent="flex-end">
                    <AccountMenu/>
                </FlexBox>
            </TopBar>
        </TopBarWrapper>
    );
}