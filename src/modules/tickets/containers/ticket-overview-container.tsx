import { CircularProgress } from "@mui/material";
import { useGetTicketDetailsById } from "../apis";
import { FlexBox } from "lib/ui-ux";
import { TicketOverview } from "../components/ticket-details/ticket-details-section/ticket-overview/ticket-overview";

export const TicketOverviewContainer = () => {
    const { data, isLoading, error } = useGetTicketDetailsById();

    if (isLoading) {
        return (
            <FlexBox $alignItems="center" $justifyContent="center" $height="100%" $width="100%">
                <CircularProgress />
            </FlexBox>
        )
    }

    if (data) {
        return (
            <>
                <TicketOverview ticketDetails={data} />
            </>
        )
    }

    return <span>Error: {error as string}</span>
}