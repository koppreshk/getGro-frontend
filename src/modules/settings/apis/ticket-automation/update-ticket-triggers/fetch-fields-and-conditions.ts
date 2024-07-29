import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";

export interface FetchFieldsAndConditions {
    ticketFieldId: number
    fieldName: string
    operators: Operator[]
    dropdownValues: DropdownValue[]
}

export interface Operator {
    operatorId: number
    operatorName: string
}

export interface DropdownValue {
    channel_id: number
    name: string
}


export const useFetchFieldsAndConditions = () => {
    const { getData } = useServiceClient();

    const fetchFieldsAndConditions = React.useCallback(() => getData(UpdateTicketTriggersEndPoint.FIELDS_AND_CONDITIONS).then((res) => res.json()), [getData]);

    return useQuery<FetchFieldsAndConditions[]>({
        queryKey: UpdateTicketTriggersQueryKey.FIELDS_AND_CONDITIONS,
        queryFn: fetchFieldsAndConditions,
    })
}