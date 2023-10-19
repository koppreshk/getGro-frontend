import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

export const UnassignedTicketsContainer = React.memo(() => {
    const { data, isLoading, error } = useGetUnassignedTickets({ itemsPerPage: 10, pageNumber: 1 });

    if (data || isLoading) {
        const casedData = data?.data ? data?.data.map(item => toCamelCasedKeysFromUnderScores(item)) : [];
        console.log(casedData);
        return (
            <UnassignedTickets isLoading={isLoading} data={casedData} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})