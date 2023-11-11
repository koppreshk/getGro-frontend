import { useServiceClient } from 'lib';
import { useCallback, useMemo, useState } from 'react';
import {
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from 'react-query';

type UseQueryParams = Parameters<typeof useQuery>;

export default function useLazyQuery<TData>(
    args: {
        queryKey: UseQueryParams[0],
        queryOptions?: Omit<UseQueryOptions<TData, unknown, unknown, QueryKey>, 'queryKey' | 'queryFn'>,
        apiEndPoint: string
    }): [(args?: Record<string, string>) => void, UseQueryResult<unknown, unknown>] {
    const [enabled, setEnabled] = useState(false);
    const [apiParams, setAPIParmas] = useState<undefined | Record<string, string>>(undefined);
    const { queryKey, queryOptions, apiEndPoint } = args;
    const { getData } = useServiceClient();

    const finalParams = useMemo(() => apiParams !== undefined ? new URLSearchParams(apiParams).toString() : '', [apiParams]);
    const getOrderDetailsData = useCallback(() => getData(`${apiEndPoint}?${finalParams}`).then((res) => res.json()).catch((err) => err), [apiEndPoint, finalParams, getData]);

    const queryresult = useQuery<TData, unknown, unknown, QueryKey>(queryKey, getOrderDetailsData, {
        ...(queryOptions || {}),
        enabled,
    });

    const trigger = useCallback((_apiParams?: Record<string, string>) => {
        if (!enabled) {
            setEnabled(true);
            _apiParams !== undefined && setAPIParmas(_apiParams)
        }
    }, [enabled]);

    return [trigger, queryresult];
}