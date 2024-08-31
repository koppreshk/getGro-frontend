import { FlexBox } from "lib/ui-ux"
import { DashboardCategoriesPanel } from "./parts/categories-panel"
import { Typography } from "@mui/material";
import { useAuth } from "modules/login";
import styled, { useTheme } from "styled-components";
import { Trans } from "react-i18next";

const StyledFlexbox = styled(FlexBox)`
    /* background-color: ${(props) => props.theme.pallete.white}; */
`;

export const DashboardLayout = () => {
    return (
        <FlexBox flexDirection="column" height="100%" width="100%" overflowY="auto">
            <UserDetails />
            <DashboardCategoriesPanel />
        </FlexBox>
    )
};

const UserDetails = () => {
    const { user } = useAuth();
    const { pallete } = useTheme();
    return (
        <StyledFlexbox flexDirection="column" gap="5px" padding="25px 25px 0px">
            <Typography variant="h2" textTransform={"capitalize"}><Trans i18nKey="modules.dashboard.hi"/> {user?.email.split('@')[0]}</Typography>
            <Typography variant="h6" sx={{ color: pallete.grayVariant2 }}><Trans i18nKey="modules.dashboard.welcomeBack"/></Typography>
        </StyledFlexbox>
    )
}
