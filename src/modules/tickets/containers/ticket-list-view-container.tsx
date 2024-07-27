import { useMatch } from "react-router-dom";
import { FlexBox } from "lib/ui-ux";
import { useGetTicketsDataByKey } from "../apis";
import { TicketListViewLoader } from "lib/ui-ux/loader-components";
import { TicketListView } from "../components/ticket-details/ticket-list-view"
import { TicketsEndPoint } from "../apis/api-enums";

export const useGetQueryEndPoint = () => {
    const match = useMatch('/tickets/:ticketType/:ticketId');

    const getQueryEndPointByType = (): keyof typeof TicketsEndPoint => {
        switch (match?.params.ticketType || '') {
            case 'all-closed':
                return 'FETCH_ALL_CLOSED_TICKETS';
            case 'all-pending':
                return 'FETCH_ALL_PENDING_TICKETS';
            case 'all-resolved':
                return 'FETCH_ALL_RESOLVED_TICKETS';
            case 'my-closed':
                return 'FETCH_MY_CLOSED';
            case 'my-pending':
                return 'FETCH_MY_PENDING';
            case 'my-resolved':
                return 'FETCH_MY_RESOLVED'
            default: return 'FETCH_ALL_TICKETS';
        }
    }

    return getQueryEndPointByType()
}

export const TicketListViewContainer = () => {
    const queryEndPoint = useGetQueryEndPoint();
    const { data, isLoading, isRefetching } = useGetTicketsDataByKey(queryEndPoint, queryEndPoint);

    if (isLoading || isRefetching) {
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