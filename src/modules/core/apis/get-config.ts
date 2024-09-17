import { CoreQueryKey, } from "./api-enums";
import { useQuery } from "react-query";
import { AllPermissionKeys } from "lib/enums";
import { useDispatch } from "react-redux";
import { setCoreData } from '../storage/core-slice';

export interface IConfig {
    role: string,
    modules: string[],
    permissions: AllPermissionKeys[],
    language: string,
    user_details: {
        user_name: string,
        email: string,
        phone: string

    }
}

const getConfig = () => {
    return new Promise<IConfig>((resolve) => {
        const res = {
            role: 'admin',
            modules: ['CONFIGURATIONS', 'DASHBOARDS'],
            permissions: [
                "ADD_TICKET",
                "REPLY_TICKET",
                "EDIT_PRIORITY",
                "EDIT_ASSIGNEE",
                "EDIT_STATUS",
                "EDIT_TAGS",
                "SPLIT_TICKET",
                "MANAGE_NOTES",
                "MERGE_TICKET",
                "MANAGE_TICKET_STATUS",
                "MANAGE_TAGS",
                "MANAGE_EMAIL",
                "MANAGE_TICKET_ESCALATION",
                "MANAGE_AUTO_ASSIGNMENTS",
                "MANAGE_CREATE_TICKET_TRIGGERS",
                "MANAGE_UPDATE_TICKET_TRIGGERS",
                "MANAGE_AGENTS",
                "MANAGE_QUEUES",
                "MANAGE_ROLES_PERMISSIONS",
                "MANAGE_AGENT_AVAILABILITY_STATUSES",
                "MANAGE_AUDIT_LOGS",
                "MANAGE_MARKETPLACE"
            ] as AllPermissionKeys[],
            language: 'en',
            user_details: {
                user_name: 'koppresh.putpak',
                email: 'koppresh@getgro.io',
                phone: '1234567890'
            }
        }
        setTimeout(() => {
            resolve(res);
        }, 200);
    })
}

export const useGetConfig = () => {
    const dispatch = useDispatch();

    // const { getData } = useServiceClient();

    // const getConfig = React.useCallback(() => getData(`${CoreEndPoint.GET_CONFIG}`)
    //     .then((res) => res.json()), [getData]);


    return useQuery<IConfig, { message: string }>({
        queryFn: getConfig,
        queryKey: [CoreQueryKey.GET_CONFIG],
        cacheTime: 0,
        onSuccess(data) {
            dispatch(setCoreData(data))
        },
    })
}