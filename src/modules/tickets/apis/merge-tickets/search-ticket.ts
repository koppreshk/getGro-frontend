import useLazyQuery from "lib/hooks/react-query-utils";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";

export interface ISearchTickets {
    data: [],
    total_pages: number,
    current_page: number
}

export const useSearchTickets = () => {
    return useLazyQuery<ISearchTickets[]>({
        apiEndPoint: TicketsEndPoint.GET_CUSTOMER_DETAILS,
        queryKey: TicketsQueryKey.GET_CUSTOMER_DETAILS
    })
}