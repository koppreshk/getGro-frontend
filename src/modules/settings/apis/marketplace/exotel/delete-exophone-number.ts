import { useServiceClient } from "lib"
import React from "react";
import { useMutation } from "react-query";
import { ExotelConfigurationEndPoint, ExotelConfigurationQueryKey } from "./api-enums";

export interface IDeleteExophoneNumber {
    id: number
}

export const useDeleteExophoneNumber = () => {
    const { postData } = useServiceClient();

    const deleteExophoneNumber = React.useCallback((args: IDeleteExophoneNumber) =>
        postData(ExotelConfigurationEndPoint.DELETE_EXOPHONE, args), [postData])

    return (
        useMutation({
            mutationFn: deleteExophoneNumber,
            mutationKey: ExotelConfigurationQueryKey.DELETE_EXOPHONE
        })
    )
}