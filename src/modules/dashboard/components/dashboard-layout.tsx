import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { useAuth } from "modules/login"
import { useTheme } from "styled-components"
import { TopFourMetrics } from "./parts/top-four-metrics"
import { ChartContainer, TotalDisposed } from "./parts/total-disposed"
import { TicketsBySource } from "./parts/tickets-by-source"

export const DashboardLayout = () => {
    return (
        <FlexBox flexDirection="column" gap="15px" height="100%" width="100%">
            <UserDetails />
            <TopFourMetrics />
            <FlexBox gap="10px">
                <TotalDisposed />
                <TicketsBySource />
                <ChartContainer width="33%">
                    3
                </ChartContainer>
            </FlexBox>
        </FlexBox>
    )
}

const UserDetails = () => {
    const { user } = useAuth();
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="5px">
            <Typography variant="h2" textTransform={"capitalize"}>Hi {user?.email.split('@')[0]}</Typography>
            <Typography variant="h6" sx={{ color: pallete.grayVariant2 }}>Welcome back!</Typography>
        </FlexBox>
    )
}