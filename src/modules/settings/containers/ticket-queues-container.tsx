import { FlexBox } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "../apis";
import { CircularProgress } from "@mui/material";
import { TicketQueue } from "../component";

export const TicketQueuesContainer = () => {
    const { data, isLoading, error } = useFetchAllTicketQueues();

    if (isLoading) {
        return (
            <FlexBox alignItems="center" justifyContent="center" height="100%" width="100%">
                <CircularProgress />
            </FlexBox>
        )
    }

    if (data) {
        return (
            <TicketQueue data={data} />
        )
    }

    return <span>Error: {error as string}</span>
}