import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { FacebookConfigurationEndPoint, FacebookConfigurationQueryKey } from "./api-enum";

export interface IFacebookAssociatedPages {
    page_name: string;
    page_id: string;
}

export const useFetchAssociatedPages = () => {
    const { getData } = useServiceClient();

    const fetchFacebookConfigurations = React.useCallback(() => getData(FacebookConfigurationEndPoint.FETCH_ASSOICATED_PAGES).then((res) => res.json()), [getData]);

    return useQuery<IFacebookAssociatedPages[]>({
        queryFn: fetchFacebookConfigurations,
        queryKey: FacebookConfigurationQueryKey.FETCH_ASSOICATED_PAGES
    });
}