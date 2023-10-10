import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";

export const UnassignedTicketsContainer = React.memo(() => {
    const { data, isLoading } = useGetUnassignedTickets();

    return (
        <UnassignedTickets isLoading={isLoading} data={data} />
    )
})