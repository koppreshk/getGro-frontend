import { useServiceClient } from 'lib';
import {
  AllPermissionKeys,
  ChatPermissionKeys,
  ConfigurationPermissionKeys,
  DashboardPermissionKeys,
  KnowledgeBasePermissionKeys,
  ModuleKeys,
  TicketPermissionKeys,
} from 'lib/enums';
import {
  AgentsEndPoint,
  AgentsQueryKey,
} from 'modules/settings/apis/users-and-permissions/agents/api-enums';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setCoreData } from '../storage/core-slice';

export interface IConfig {
  role: string;
  modules: string[];
  permissions: AllPermissionKeys[];
  language: string;
  ticket_layout_view: 'card_view' | 'grid_view';
  ticket_page_count: number;
  default_ticket_view: string;
  signature: string;
  user_details: {
    full_name: string;
    display_name: string;
    email: string;
    phone_number: string;
    image_url?: string;
  };
  agent_portal: {
    portal_name: string;
    logo: string;
  };
}

export const useFetchUserConfig = (user: object | null) => {
  const dispatch = useDispatch();

  const { getData } = useServiceClient();

  const getConfig = React.useCallback(
    () =>
      getData(`${AgentsEndPoint.FETCH_USER_CONFIG}`).then((res) => res.json()),
    [getData]
  );

  return useQuery<IConfig, { message: string }>({
    queryFn: getConfig,
    queryKey: [AgentsQueryKey.FETCH_USER_CONFIG, user],
    cacheTime: 0,
    onSuccess(data) {
      if (
        data?.modules?.includes('all') &&
        data?.permissions?.includes('all')
      ) {
        const allTicketPermissions = Object.values(TicketPermissionKeys);
        const allChatPermissions = Object.values(ChatPermissionKeys);
        const allConfigPermissions = Object.values(ConfigurationPermissionKeys);
        const allDashboardPermissions = Object.values(DashboardPermissionKeys);
        const allKBPermissions = Object.values(KnowledgeBasePermissionKeys);

        const allPermissions = [
          ...allTicketPermissions,
          ...allChatPermissions,
          ...allConfigPermissions,
          ...allDashboardPermissions,
          ...allKBPermissions,
        ] as AllPermissionKeys[];

        dispatch(
          setCoreData({
            ...data,
            permissions: allPermissions,
            modules: Object.values(ModuleKeys),
          })
        );
        return;
      }
      dispatch(setCoreData(data));
    },
    enabled: user ? true : false,
  });
};
