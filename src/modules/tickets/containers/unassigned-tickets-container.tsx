import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import { useAppSelector } from "lib/hooks/store-utils";

export const UnassignedTicketsContainer = React.memo(() => {
    const { itemsPerPage, pageNumber } = useAppSelector((state) => state.tickets);
    const { data, isLoading, isFetching, error } = useGetUnassignedTickets({ itemsPerPage: itemsPerPage.toString() ?? '10', pageNumber: pageNumber.toString() ?? '1' });

    if (data || isLoading) {
        const casedData = data?.data ? data?.data.map(item => toCamelCasedKeysFromUnderScores(item)) : [];
        return (
            <UnassignedTickets isLoading={isLoading || isFetching} data={casedData} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})