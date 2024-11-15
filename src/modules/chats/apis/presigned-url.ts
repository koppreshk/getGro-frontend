import { useCallback } from "react";
import { useMutation } from "react-query";
import { useServiceClient } from "lib"
import { ChatEndPoint, ChatQueryKeys } from ".";

interface PresignedURLArgs {
    content_type: string;
}

interface PresignedURLResponse {
    url: string;
    media_url: string;
}

export const usePresignedURL = () => {
    const { postData } = useServiceClient();

    const getPresignedURL = useCallback((args: PresignedURLArgs) => postData(ChatEndPoint.PRESIGNED_URL, args).then((res) => res.json()), [postData]);

    return useMutation<PresignedURLResponse, unknown, PresignedURLArgs>({
        mutationKey: [ChatQueryKeys.PRESIGNED_URL],
        mutationFn: getPresignedURL,
    });
}