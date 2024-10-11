import React from "react";
import { useServiceClient } from "lib"
import { useMutation } from "react-query";
import { KnowledgeBaseEndPoint, KnowledgeBaseQueryKeys } from "./api-enums";
import { IKnowledgeBase } from ".";

interface ISearchArticleArgs {
    title: string;
}

export const useSearchArticle = () => {
    const { postData } = useServiceClient();

    const searchArticle = React.useCallback((args: ISearchArticleArgs) => {
        return postData(`${KnowledgeBaseEndPoint.SEARCH_ARTICLE}`, {
            title: args.title,
        })
            .then((res) => res.json())
    }, [postData]);

    return useMutation<IKnowledgeBase[], unknown, ISearchArticleArgs>({
        mutationFn: searchArticle,
        mutationKey: [KnowledgeBaseQueryKeys.SEARCH_ARTICLE]
    });
}