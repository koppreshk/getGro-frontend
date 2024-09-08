import { useServiceClient } from "lib"
import React from "react";
import { useMutation } from "react-query";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface IAddExophoneNumber {
    phone_number: string;
    sid: string;
    friendly_name: string;
    app_name: string;
    /**
     * Not required for normal call
     */
    users?: number[];
}

export const useAddExophoneNumber = () => {
    const { postData } = useServiceClient();

    const addExophoneNumber = React.useCallback((args: IAddExophoneNumber) =>
        postData(ExotelConfigurationEndPoint.ADD_EXOPHONE, args).then((res) => res.json()), [postData])

    return (
        useMutation({
            mutationFn: addExophoneNumber,
            mutationKey: ExotelConfigurationQueryKey.ADD_EXOPHONE
        })
    )
}