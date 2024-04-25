import { ToCamelCasedKeysFromUnderscores } from "lib/utils";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import useLazyQuery from "lib/hooks/react-query-utils";

export interface AttachmentResponse {
    file_content: string;
    file_name: string;
    file_type: string;
}

export type CasedAttachmentResposne = ToCamelCasedKeysFromUnderscores<AttachmentResponse>

export const useFetchAttachments = (addionalKey: string) => {
    return useLazyQuery<AttachmentResponse>({
        apiEndPoint: TicketsEndPoint.FETCH_ATTACHMENT,
        queryKey: [TicketsQueryKey.FETCH_ATTACHMENT, addionalKey],
        queryOptions: {
            cacheTime: 0
        }
    });
}