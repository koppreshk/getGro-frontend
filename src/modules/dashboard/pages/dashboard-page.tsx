import React from "react"
import { FlexBox } from "lib/ui-ux"
import { Typography } from "@mui/material"
import { useTheme } from "styled-components";
import { DashboardLayout } from "../components";

export const DashboardPage = React.memo(() => {
    const theme = useTheme();

    return (
        <FlexBox $width="100%" $height="100%" $padding="15px" $gap="15px" $flexDirection="column">
            <Typography variant="h3" color={theme.pallete.primaryPurpleText} marginLeft={'16px'}>Dashboard</Typography>
            <DashboardLayout />
        </FlexBox>
    )
})