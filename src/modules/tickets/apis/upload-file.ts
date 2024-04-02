import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export const useUploadFile = () => {
    const { postData } = useServiceClient();

    const uploadFile = useCallback((args: { file: string, contentType: string }) =>
        postData(`${TicketsEndPoint.UPLOAD_FILE}`, {
            file: args.file,
            content_type: args.contentType
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.UPLOAD_FILE],
        mutationFn: uploadFile
    });
}