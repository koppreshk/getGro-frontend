import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { InstagramConfigurationEndPoint, InstagramConfigurationQueryKey } from "./api-enum";

type CommentConfiguration = "all_posts" | "specific_keywords"; // Adjust as needed
export interface IInstagramConfigDetails {
    queue_id: number;
    auto_reply_message: string;
    send_auto_reply: boolean;
    comment_configuration: CommentConfiguration;
    specific_keywords: string[] | null; // Array of strings or null
    created_at: string; // ISO 8601 formatted date as a string
    updated_at: string; // ISO 8601 formatted date as a string
    admin: string;
    id: number;
  }

export const useFetchInstagramConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchInstagramConfigurations = React.useCallback(() => getData(InstagramConfigurationEndPoint.FETCH_INSTAGRAM_CONFIGURATION).then((res) => res.json()), [getData]);

    return useQuery<IInstagramConfigDetails | null>({
        queryFn: fetchInstagramConfigurations,
        queryKey: InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION
    });
}