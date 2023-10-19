import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import { useSearchParams } from "react-router-dom";

export const UnassignedTicketsContainer = React.memo(() => {
    const [searchParams] = useSearchParams();
    const { data, isLoading, isFetching, error } = useGetUnassignedTickets({ itemsPerPage: searchParams.get('itemsPerPage') ?? '10', pageNumber: searchParams.get('pageNumber') ?? '1' });

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