import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import useLazyQuery from "lib/hooks/react-query-utils";

export interface IQueueUsers {
    firstName: string;
    lastName: string;
    id: number;
}

export const useFetchUsersInQueue = () => {
    return useLazyQuery<IQueueUsers>({
        apiEndPoint: ConfigurationsEndPoint.FETCH_USERS_IN_QUEUE,
        queryKey: [ConfigurationsQueryKey.FETCH_USERS_IN_QUEUE],
        queryOptions: {
            cacheTime: 0
        }
    });
}
