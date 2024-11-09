import { useCallback } from "react";
import { useMutation } from "react-query";
import { ChatQueryKeys, ChatEndPoint } from "./api-enums";
import { useAuth } from "modules/login";

export const useUploadFileToS3 = () => {
    const { user } = useAuth();
    const subDomainValue = import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

    const uploadFile = useCallback((body: FormData) =>
        fetch(`${import.meta.env.VITE_REST_URL}${ChatEndPoint.PRESIGNED_URL}`, {
            body: body,
            method: 'post',
            headers: {
                'Authorization': user!.authToken,
                'sub-domain': subDomainValue
            }
        }).then((res) => res.json()), [subDomainValue, user]);

    return useMutation({
        mutationKey: [ChatQueryKeys.PRESIGNED_URL],
        mutationFn: uploadFile
    });
}