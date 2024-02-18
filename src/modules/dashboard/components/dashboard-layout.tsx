import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { useAuth } from "modules/login"
import { useTheme } from "styled-components"
import { TopFourMetrics } from "./parts/top-four-metrics"

export const DashboardLayout = () => {
    return (
        <>
            <UserDetails />
            <TopFourMetrics />
        </>
    )
}

const UserDetails = () => {
    const { user } = useAuth();
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="5px">
            <Typography variant="h2">Hi {user?.email.split('@')[0]}</Typography>
            <Typography variant="h6" sx={{ color: pallete.grayVariant2 }}>Welcome back!</Typography>
        </FlexBox>
    )
}