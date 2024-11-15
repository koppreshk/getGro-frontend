import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { InstagramConfigurationEndPoint, InstagramConfigurationQueryKey } from "./api-enum";

export interface IInstagramConfigDetails {
    user_id: string;
  }

export const useFetchInstagramConfiguration = () => {
    const { getData } = useServiceClient();

    const fetchInstagramConfigurations = React.useCallback(() => getData(InstagramConfigurationEndPoint.FETCH_INSTAGRAM_CONFIGURATION).then((res) => res.json()), [getData]);

    return useQuery<IInstagramConfigDetails | null>({
        queryFn: fetchInstagramConfigurations,
        queryKey: InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION
    });
}