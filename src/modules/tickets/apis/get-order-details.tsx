import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export interface IOrderDetails {
    orders: {
        contact_email: string
    }[]
}

export const useGetOrderDetails = (args: { customerId?: string }) => {
    const { customerId = '7021764280539' } = args;
    const { getData } = useServiceClient();

    const getOrderDetailsData = React.useCallback(() => getData(`${TicketsEndPoint.GET_USER_ORDERS}?customer_id=${customerId}`).then((res) => res.json()).catch((err) => err), [customerId, getData]);
    return useQuery<{ data: IOrderDetails }>({
        queryKey: [TicketsQueryKey.GET_USER_ORDERS, customerId],
        queryFn: getOrderDetailsData
    });
}