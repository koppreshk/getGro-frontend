import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";

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

export const useGetCustomerDetails = (args: { email: string, phone: string }) => {
    const { email, phone } = args;
    const { getData } = useServiceClient();

    const getCustomerDetailsData = React.useCallback(() => getData(`${GetCustomerDetailsEndPoint.GET_CUSTOMER_DETAILS}?phone=${phone}&email=${email}`).then(res => res.json()), [email, getData, phone]);
    return useQuery(
        GetCustomerDetailsQueryKey.GET_CUSTOMER_DETAILS, getCustomerDetailsData, {enabled: false}
    )
}