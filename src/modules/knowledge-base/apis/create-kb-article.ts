import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "modules/login";
import { KnowledgeBaseEndPoint, KnowledgeBaseQueryKeys } from "./api-enums";

export const useCreateKBArticle = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const uploadFile = useCallback((body: FormData) =>
        fetch(`${import.meta.env.VITE_REST_URL}${KnowledgeBaseEndPoint.CREATE_KB_ARTCLE}`, {
            body: body,
            method: 'post',
            headers: {
                'Authorization': user!.authToken,
            }
        }).then((res) => res.json()), [user]);

    return useMutation({
        mutationKey: [KnowledgeBaseQueryKeys.CREATE_KB_ARTCLE],
        mutationFn: uploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries(KnowledgeBaseQueryKeys.FETCH_ALL_KB);
        },
    });
}