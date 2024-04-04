import { useCallback } from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useAuth } from "modules/login";

export const useUploadFile = () => {
    const { user } = useAuth();

    const uploadFile = useCallback((body: FormData) =>
        fetch(`${import.meta.env.VITE_REST_URL}${TicketsEndPoint.UPLOAD_FILE}`, {
            body: body,
            method: 'post',
            headers: {
                'Authorization': user!.authToken,
            }
        }).then((res) => res.json()), [user]);

    return useMutation({
        mutationKey: [TicketsQueryKey.UPLOAD_FILE],
        mutationFn: uploadFile
    });
}