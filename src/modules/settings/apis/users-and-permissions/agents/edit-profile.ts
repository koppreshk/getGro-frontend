import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { AgentsQueryKey, AgentsEndPoint } from "./api-enums";

export interface IEditProfileArgs {
    default_ticket_view: string
    ticket_layout_view: string
    ticket_page_count: string
    full_name: string
    display_name: string
    phone_number: string;
    signature?: string;
}

export const useEditProfile = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editProfile = React.useCallback((args: Partial<IEditProfileArgs>) => postData(AgentsEndPoint.EDIT_PROFILE, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AgentsQueryKey.EDIT_PROFILE,
        mutationFn: editProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(AgentsQueryKey.FETCH_USER_CONFIG);
        }
    });
}