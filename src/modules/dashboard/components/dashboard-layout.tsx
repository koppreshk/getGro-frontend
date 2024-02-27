import { Typography } from "@mui/material"
import { FlexBox, GridLayout } from "lib/ui-ux"
import { useAuth } from "modules/login"
import { useTheme } from "styled-components"
import { TopFourMetrics } from "./parts/top-four-metrics"
import { TotalDisposed } from "./parts/total-disposed"
import { TicketsBySource } from "./parts/tickets-by-source"
import { IncomingTickets } from "./parts/incoming-tickets"
import { Trends } from "./parts/trends"
import { ToDoList } from "./parts/to-do-list"

export const DashboardLayout = () => {
    return (
        <FlexBox flexDirection="column" gap="20px" height="100%" padding="0 10px 0px 0px" width="100%" overflowY="auto">
            <UserDetails />
            <TopFourMetrics />
            <GridLayout $gridGap="20px" $gridTemplateColumns={'3.13fr 1fr'}>
                <Trends />
                <ToDoList />
            </GridLayout>
            <GridLayout $gridGap="20px" $gridTemplateColumns={'1fr 1fr 1fr'}>
                <TotalDisposed />
                <TicketsBySource />
                <IncomingTickets />
            </GridLayout>
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