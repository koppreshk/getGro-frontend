import { useMatch } from "react-router-dom";
import { FlexBox } from "lib/ui-ux";
import { useGetTicketsDataByKey } from "../apis";
import { TicketListViewLoader } from "lib/ui-ux/loader-components";
import { TicketListView } from "../components/ticket-details/ticket-list-view"
import { TicketsEndPoint } from "../apis/api-enums";

const getQueryEndPointByType = (ticketType: string): keyof typeof TicketsEndPoint => {
    switch (ticketType) {
        case 'all':
            return 'FETCH_ALL_TICKETS';
        case 'unassigned':
            return 'FETCH_ALL_UNASSIGNED';
        case 'all-pending':
            return 'FETCH_ALL_PENDING_TICKETS';
        case 'all-complete':
            return 'FETCH_ALL_COMPLETED_TICKETS';
        case 'created-by-me':
            return 'GET_CREATED_BY_ME_TICKETS';
        default: return 'FETCH_ALL_TICKETS';
    }
}
export const TicketListViewContainer = () => {
    const match = useMatch('/tickets/:ticketType/:ticketId');
    const queryEndPoint = getQueryEndPointByType(match?.params.ticketType || '');
    const { data, isLoading } = useGetTicketsDataByKey(queryEndPoint, queryEndPoint);

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