import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { KnowledgeBaseEndPoint, KnowledgeBaseQueryKeys } from "./api-enums";

export const useDeleteKbArticle = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteArticle = React.useCallback((args: { id: number }) =>
        postData(KnowledgeBaseEndPoint.DELETE_ARTICLE, {id: args.id}).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: KnowledgeBaseQueryKeys.DELETE_ARTICLE,
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries(KnowledgeBaseQueryKeys.FETCH_ALL_KB);
        },
    });
}