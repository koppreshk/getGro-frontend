import { FlexBox } from "lib/ui-ux";
import { useGetUnassignedTickets } from "../apis";
import { TicketListViewLoader } from "lib/ui-ux/loader-components";
import { TicketListView } from "../components/ticket-details/ticket-list-view"

export const TicketListViewContainer = () => {
    const { data, isLoading } = useGetUnassignedTickets();

    if (isLoading) {
        return (
            <FlexBox flexDirection="column" width="100%">
                <TicketListViewLoader />
            </FlexBox>
        )
    }

    if (data) {
        return (
            <TicketListView data={data.data} />
        )
    }

    return (
        <h6>error</h6>
    );

}