import { FlexBox } from "lib/ui-ux"
import { DashboardCategoriesPanel2 } from "./parts/categories-panel"
import { Typography } from "@mui/material";
import { useAuth } from "modules/login";
import styled, { useTheme } from "styled-components";

const StyledFlexbox = styled(FlexBox)`
    /* background-color: ${(props) => props.theme.pallete.white}; */
`;

export const DashboardLayout = () => {
    return (
        <FlexBox flexDirection="column" height="100%" width="100%" overflowY="auto">
            <UserDetails />
            <DashboardCategoriesPanel2 />
        </FlexBox>
    )
};

const UserDetails = () => {
    const { user } = useAuth();
    const { pallete } = useTheme();
    return (
        <StyledFlexbox flexDirection="column" gap="5px" padding="25px 25px 0px">
            <Typography variant="h2" textTransform={"capitalize"}>Hi {user?.email.split('@')[0]}</Typography>
            <Typography variant="h6" sx={{ color: pallete.grayVariant2 }}>Welcome back!</Typography>
        </StyledFlexbox>
    )
}
