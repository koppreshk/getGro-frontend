import React from "react";
import { useServiceClient } from "lib"
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";

export interface ICreateTicketQueueArgs {
    channelId: string | number;
    name: string;
}

export const useCreateTagByChannelId = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const createTag = React.useCallback((args: ICreateTicketQueueArgs) =>
        postData(`${ConfigurationsEndPoint.CREATE_TICKET_TAGS}`, {
            channel_id: args.channelId,
            name: args.name
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsQueryKey.CREATE_TICKET_TAGS,
        mutationFn: createTag,
        onSuccess: () => {
            queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_TAGS_BY_CHANNEL);
        }
    });
}