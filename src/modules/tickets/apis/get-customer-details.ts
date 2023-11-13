import useLazyQuery from "lib/hooks/react-query-utils";

enum GetCustomerDetailsEndPoint {
    GET_CUSTOMER_DETAILS = 'fetch_user_details'
}

enum GetCustomerDetailsQueryKey {
    GET_CUSTOMER_DETAILS = 'GET_ALL_TICKETS'
}

export interface ICustomerDetails {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export const useGetCustomerDetails = () => {
    return useLazyQuery<ICustomerDetails[]>({
        apiEndPoint: GetCustomerDetailsEndPoint.GET_CUSTOMER_DETAILS, queryKey: GetCustomerDetailsQueryKey.GET_CUSTOMER_DETAILS
    })
}