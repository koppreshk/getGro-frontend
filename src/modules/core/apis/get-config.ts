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
                "add_ticket",
                "reply_ticket",
                "edit_priority",
                "edit_assignee",
                "edit_status",
                "edit_tags",
                "split_ticket",
                "manage_notes",
                "merge_ticket",
                "manage_ticket_status",
                "manage_tags",
                "manage_email",
                "manage_ticket_escalation",
                "manage_auto_assignments",
                "manage_create_ticket_triggers",
                "manage_update_ticket_triggers",
                "manage_agents",
                "manage_queues",
                "manage_roles_permissions",
                "manage_agent_availability_statuses",
                "manage_audit_logs",
                "manage_marketplace"
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